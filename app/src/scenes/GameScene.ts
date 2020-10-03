import * as Phaser from "phaser";
import {Player} from "../Components/Player";
import MathUtils from "../lib/MathUtils";
import BSPMazeGenerator from "../lib/BSPMazeGenerator";
import GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;
import BlendModes = Phaser.BlendModes;
import WaterMazeTilesProcessor from "../lib/WaterMaze/WaterMazeTilesProcessor";
import {BoatTrail} from "../Components/BoatTrail";
import Tilemap = Phaser.Tilemaps.Tilemap;
import Tileset = Phaser.Tilemaps.Tileset;
import InGameSettingsButton from "../Components/InGameSettingsButton";
import PopupManager from "../Components/Popup/PopupManager";
import SettingsPopup from "../Components/Popup/Popups/SettingsPopup";
import {SceneBase} from "./SceneBase";
import ParseToMultiLayerTilemap from "../lib/Tilemap/ParseToMultiLayerTilemap";
import Texture = Phaser.Textures.Texture;

export class GameScene extends SceneBase {

    private USE_RANDOM_MAPS_IN_GAME: boolean = true;
    private MINIMAP_SCALE: number = 1/24;

    private player: GameObjectWithBody;
    private playerBoatTrail: GameObjectWithBody;
    private collisionLayer: StaticTilemapLayer;
    private tiledLayer: StaticTilemapLayer;
    private miniLayer: StaticTilemapLayer;
    private miniMapLocator: Phaser.GameObjects.Graphics;
    private stars: Phaser.Physics.Arcade.Group;
    private collectedStars;
    private scoreText;
    private nitroText;

    private popupCount: number = 0;

    constructor() {
        super({
            active: false,
            visible: false,
            key: 'Game',
        });
    }

    public preload() {
        this.load.setBaseURL();
        this.load.atlas(
            'red_boat',
            'assets/atlas/boatsSpriteListTransparent.png',
            'assets/atlas/redBoatSpriteListConfig.json'
        );
        this.load.atlas(
            'boat_trail',
            'assets/atlas/boatsSpriteListTransparent.png',
            'assets/atlas/boatTrailSpriteListConfig.json'
        );

        this.load.spritesheet(
            'fullscreenSprite',
            'assets/fullscreenSprite.png',
            { frameWidth: 32, frameHeight: 32 }
        );

        this.load.image('star', 'assets/star24.png');
        this.load.image('settingsIcon', 'assets/settingsIcon-24.png');
        this.load.image('turnLeftArrow', 'assets/turnLeftArrow.png');
        this.load.image('turnRightArrow', 'assets/turnRightArrow.png');

        this.load.image('tilesExtruded', 'assets/tilemaps/WaterMazeTilesExtruded.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/WaterMazeMap.json');
    }

    public create() {
        let map: Phaser.Tilemaps.Tilemap;
        let miniMap: Phaser.Tilemaps.Tilemap;
        let tiles: Phaser.Tilemaps.Tileset;

        if (this.USE_RANDOM_MAPS_IN_GAME === true) {
            // ГЕНЕРИМ КАРТУ НА КАЖДУЮ ИГРУ ЗАНОВО
            let mapGenerator = new BSPMazeGenerator();
            let levelData = mapGenerator.generateMap(120, 120, 2);
            // генератор возвращает 0 - где проход и 1 - где блок
            // Расставим тайлы из спрайта WaterMazeTiles
            let tiledLevelData = WaterMazeTilesProcessor.placeTiles(levelData, 120);

            // переформатируем levelData в 2D массив для слоя коллизий
            let chunk = 120;
            let collideLayerData: number[][] = [];
            for (let i = 0, j = levelData.length; i < j; i += chunk) {
                collideLayerData.push(levelData.slice(i, i + chunk));
            }
            // переформатируем tiledLevelData в 2D массив для слоя тайлов (отображение)
            let tiledLayerData: number[][] = [];
            for (let i = 0, j = tiledLevelData.length; i < j; i += chunk) {
                tiledLayerData.push(tiledLevelData.slice(i, i + chunk));
            }

            // Создаём карту в своём собственном парсере, который умеет принимать
            // несколько слоёв в конфиг
            map = ParseToMultiLayerTilemap.getTilemap(
                this,
                'map',
                24,
                24,
                120,
                120,
                [collideLayerData, tiledLayerData],
                false
            );

            tiles = map.addTilesetImage('waterAndGrass', 'tilesExtruded', 26, 26, 1, 1, 1);

            this.collisionLayer = map.createStaticLayer(0, tiles, 0, 0);
            this.tiledLayer = map.createStaticLayer(1, tiles, 0, 0);

            // Для просчёта коллизий используем слой коллизий
            map.setCollision([1], true, false, this.collisionLayer);

            miniMap = this.make.tilemap({data: tiledLayerData, tileWidth: 24, tileHeight: 24});
        } else {
            // ИСПОЛЬЗУЕМ КАРТУ ИЗ КОНФИГА
            map = this.make.tilemap({ key: 'map' });
            miniMap = this.make.tilemap({ key: 'map' });

            // The first parameter is the name of the tileset in Tiled and the second parameter is the key
            // of the tileset image used when loading the file in preload.
            tiles = map.addTilesetImage('waterAndGrass', 'tilesExtruded');

            // You can load a layer from the map using the layer name from Tiled, or by using the layer
            // index (0 in this case).
            this.collisionLayer = map.createStaticLayer(0, tiles, 0, 0);
            this.tiledLayer = map.createStaticLayer(1, tiles, 0, 0);

            // проверка коллизий будет навешена на ID тайлов от start до stop
            map.setCollision([1], true, false, this.collisionLayer);
        }

        // случайным образом генерим координаты и проверяем:
        // если tail в этом месте не препятствие, то можно туда ставить звезду
        this.stars = this.physics.add.group();
        for (let i = 0; i < 10; i++) {
            let tileX, tileY, placed = false;
            do {
                tileX = MathUtils.getRandomIntegerBetween(0, map.width - 1);
                tileY = MathUtils.getRandomIntegerBetween(0, map.height - 1);
                let tile = map.getTileAt(tileX, tileY, true, this.collisionLayer);

                if (tile.canCollide !== true) {
                    // ставим на поле звёздочку
                    placed = true;
                    let coords = map.tileToWorldXY(tileX, tileY);
                    this.stars.create(coords.x, coords.y, 'star');
                }
            } while (placed !== true);
        }

        console.log('STARS PLACED!');

        // случайным образом генерим координаты и проверяем:
        // если tail в этом месте не препятствие, то можно туда ставить игрока
        let player, playerTileX, playerTileY, playerPlaced;
        do {
            playerTileX = MathUtils.getRandomIntegerBetween(0, map.width - 1);
            playerTileY = MathUtils.getRandomIntegerBetween(0, map.height - 1);
            let tile = map.getTileAt(playerTileX, playerTileY, true, this.collisionLayer);

            // И клетки-соседи надо проверить: рядом должно быть тоже пусто
            if (tile.canCollide !== true
                && map.getTileAt(playerTileX - 1, playerTileY - 1).canCollide !== true
                && map.getTileAt(playerTileX, playerTileY - 1).canCollide !== true
                && map.getTileAt(playerTileX + 1, playerTileY - 1).canCollide !== true
                && map.getTileAt(playerTileX - 1, playerTileY).canCollide !== true
                && map.getTileAt(playerTileX + 1, playerTileY).canCollide !== true
                && map.getTileAt(playerTileX - 1, playerTileY + 1).canCollide !== true
                && map.getTileAt(playerTileX, playerTileY + 1).canCollide !== true
                && map.getTileAt(playerTileX + 1, playerTileY + 1).canCollide !== true
            ) {
                // ставим на поле игрока
                playerPlaced = true;
                let coords = map.tileToWorldXY(playerTileX, playerTileY);
                player = new Player(this, coords.x, coords.y);
            }
        } while (playerPlaced !== true);

        this.player = player;
        this.playerBoatTrail = new BoatTrail(this, player);
        console.log('PLAYER PLACED!');

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player, true);

        //  The score
        this.collectedStars = 0;
        let textStyle = {fontSize: '28px', fill: '#000', fontFamily: 'Arial, sans-serif'};
        this.scoreText = this.add.text(16, 16, `Собрано звёзд: ${this.collectedStars} из 10`, textStyle)
            .setScrollFactor(0);

        this.nitroText = this.add.text(this.gameWidth - 200, 16, `НИТРО: ${player.getNitroCount()}`, textStyle)
            .setScrollFactor(0).setFontSize(20);

        // Create minimap
        this.createMiniMap(miniMap, tiles);

        let gameScale = this.sys.game.scale;

        // fullscreen toggle button
        let fullScreenButton = this.add.image(gameScale.width - 24, 16, 'fullscreenSprite', 0)
            .setOrigin(1, 0)
            .setScrollFactor(0)
            .setInteractive()
            .on('pointerup', function () {
                if (this.scale.isFullscreen) {
                    fullScreenButton.setFrame(0);
                    this.scale.stopFullscreen();
                } else {
                    fullScreenButton.setFrame(1);
                    this.scale.startFullscreen();
                }
            }, this);

        // Create settings icon
        let settingsButton = new InGameSettingsButton(this, gameScale.width - 40, 75, 30, 30);
        settingsButton.setScrollFactor(0);

        settingsButton.on('pointerdown', () => {
            // TODO: add popup window menu with items:
            // TODO: 1. exit to main menu
            PopupManager.createWindow(this, new SettingsPopup());
        });

        this.game.events.on('GO_TO_MAIN_MENU', () => {
            this.scene.start('Hello');
        });

        // touch devices has 2 pointers but desktop has only one
        if (this.input.manager.pointersTotal > 1) {
            // REFACTOR! Also move player cursor controls here
            // Create touch controls
            this.createTouchControlZones();
        }
    }

    public update(time, delta) {
        this.player.update(time, delta);
        this.collidePlayerWithWallCallback(time);
        this.playerBoatTrail.update(time, delta);

        // update minimap, draw objects by scaled coordinates
        let miniPlayerX = this.player.body.position.x * this.MINIMAP_SCALE;
        let miniPlayerY = this.player.body.position.y * this.MINIMAP_SCALE;

        this.miniMapLocator.clear();
        this.miniMapLocator.fillStyle(0xFF0000);
        this.miniMapLocator.fillRect(miniPlayerX, miniPlayerY, 2, 2);

        let player = this.player as Player;
        this.nitroText.setText(`НИТРО: ${player.getNitroCount()}`);
    }

    public collectStar (player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        this.collectedStars += 1;
        this.scoreText.setText(`Собрано звёзд: ${this.collectedStars} из 10`);

        if (this.stars.countActive(true) === 0) {
            this.scoreText.setText(
                `Собрано звёзд: ${this.collectedStars} из 10`
            );
            console.log('ALL STARS COLLECTED!!!');
            //  A new batch of stars to collect
            // this.stars.children.iterate(function (child) {
            //
            //     child.enableBody(true, child.x, 0, true, true);
            //
            // });

            // var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            //
            // var bomb = bombs.create(x, 16, 'bomb');
            // bomb.setBounce(1);
            // bomb.setCollideWorldBounds(true);
            // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            // bomb.allowGravity = false;

        }
    }

    // Limits for player collisions handle
    protected static minimalSpeedOnCollide: number = 25;
    protected static playerNegativeEffectInterval: number = 0.2; // in seconds
    protected static lastCollisionEffectTime: number = 0;
    /**
     * Collide player with walls handler
     * @param time
     */
    public collidePlayerWithWallCallback(time: number) {
        time = time / 1000; // convert to seconds
        let diff = time - GameScene.lastCollisionEffectTime;

        this.physics.collide(this.player, this.collisionLayer, (player, tile) => {
            if (diff > GameScene.playerNegativeEffectInterval) {
                let playerInstance = player as Player;
                let speed = playerInstance.getSpeed();
                playerInstance.setSpeed(speed > GameScene.minimalSpeedOnCollide ? speed / 2 : 0);

                GameScene.lastCollisionEffectTime = time;
            }
        });
    }

    public createMiniMap(miniMap: Tilemap, tiles: Tileset) {
        let miniMapContainer = this.add.group();
        // background
        let miniMapBg = this.add.rectangle(70, this.gameWidth - 70, 130, 130, 0x666666, 0.6);
        miniMapBg.setScrollFactor(0);

        // SCALED tilemap on background, Scale = (1 / tileWidth)
        this.miniLayer = miniMap.createStaticLayer(0, tiles, 10, this.gameHeight - 130);
        this.miniLayer.setScale(this.MINIMAP_SCALE);
        this.miniLayer.setScrollFactor(0);
        this.miniLayer.setBlendMode(BlendModes.SCREEN);

        // graphics to draw player and other objects!
        this.miniMapLocator = this.add.graphics();
        this.miniMapLocator.setScrollFactor(0);
        this.miniMapLocator.setPosition(10, this.gameHeight - 130, 130, 130);

        miniMapContainer.addMultiple([miniMapBg, this.miniLayer, this.miniMapLocator]);
    }

    private createTouchControlZones()
    {
        let zoneOffsetX = 50;
        let zoneOffsetY = 30;

        let zonePadding = 20;
        let zoneW = 60 + (2 * zonePadding);
        let zoneH = 50 + (2 * zonePadding);

        let leftZonePosX = zoneOffsetX - zonePadding;
        let leftZonePosY = this.gameHeight - zoneOffsetY - zoneH;
        let rightZonePosX = this.gameWidth - zoneOffsetX - zoneW;
        let rightZonePosY = this.gameHeight - zoneOffsetY - zoneH;

        let upZonePosX = zoneOffsetX - zonePadding;
        let upZonePosY = this.gameHeight - 3 * (zoneOffsetY + zoneH);

        let downZonePosX = zoneOffsetX - zonePadding;
        let downZonePosY = this.gameHeight - 2 * (zoneOffsetY + zoneH);

        let arrowW = 50;
        let arrowH = 50;


        // setOrigin(0) - значит позицию выставляем по левому верхнему углу
        let leftArrowX = zoneOffsetX;
        let leftArrowY = this.gameHeight - arrowH - zoneOffsetY - zonePadding;
        let rightArrowX = this.gameWidth - arrowW - zoneOffsetX - zonePadding;
        let rightArrowY = this.gameHeight - arrowH - zoneOffsetY - zonePadding;


        let turnLeftArrow = this.add.image(leftArrowX, leftArrowY, 'turnLeftArrow')
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setScale(0.5);
        let turnRightArrow = this.add.image(rightArrowX, rightArrowY, 'turnRightArrow')
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setScale(0.5);

        // touch zones for turn left and right
        let zoneLeft = this.add.zone(leftZonePosX, leftZonePosY, zoneW, zoneH)
            .setOrigin(0, 0)
            .setDepth(10)
            .setScrollFactor(0);
        let zoneLeftDebug = this.add.graphics({x: 0, y: 0})
            .setPosition(leftZonePosX, leftZonePosY)
            .fillStyle(0x000000, 0.5)
            .fillRect(0, 0, zoneW, zoneH)
            .setScrollFactor(0);

        let zoneRight = this.add.zone(rightZonePosX, rightZonePosY, zoneW, zoneH)
            .setOrigin(0, 0)
            .setDepth(10)
            .setScrollFactor(0);
        let zoneRightDebug = this.add.graphics({x: 0, y: 0})
            .setPosition(rightZonePosX, rightZonePosY)
            .fillStyle(0x000000, 0.5)
            .fillRect(0, 0, zoneW, zoneH)
            .setScrollFactor(0);

        let zoneUp = this.add.zone(upZonePosX, upZonePosY , zoneW, zoneH)
            .setOrigin(0, 0)
            .setDepth(10)
            .setScrollFactor(0);
        let zoneUpDebug = this.add.graphics({x: 0, y: 0})
            .setPosition(upZonePosX, upZonePosY)
            .fillStyle(0x000000, 0.5)
            .fillRect(0, 0, zoneW, zoneH)
            .setScrollFactor(0);

        let textX = upZonePosX + zonePadding;
        this.add.text(textX, upZonePosY + zonePadding, 'Speed')
            .setScrollFactor(0)
            .setColor('0x000000')
            .setFontSize(16);
        this.add.text(textX, upZonePosY + zonePadding + 20, 'Up')
            .setScrollFactor(0)
            .setColor('0x000000')
            .setFontSize(16);

        let zoneDown = this.add.zone(downZonePosX,downZonePosY, zoneW, zoneH)
            .setOrigin(0, 0)
            .setDepth(10)
            .setScrollFactor(0);
        let zoneDownDebug = this.add.graphics({x: 0, y: 0})
            .setPosition(downZonePosX,downZonePosY)
            .fillStyle(0x000000, 0.5)
            .fillRect(0, 0, zoneW, zoneH)
            .setScrollFactor(0);
        this.add.text(textX, downZonePosY + zonePadding, 'Speed')
            .setScrollFactor(0)
            .setColor('0x000000')
            .setFontSize(16);
        this.add.text(textX, downZonePosY + zonePadding + 20, 'Down')
            .setScrollFactor(0)
            .setColor('0x000000')
            .setFontSize(16);


        let nitroPadding = 10;
        let zoneNitroX = this.nitroText.x;
        let zoneNitroY = this.nitroText.y;
        let zoneNitroW = this.nitroText.width + (2 * nitroPadding);
        let zoneNitroH = this.nitroText.height + (2 * nitroPadding);

        let zoneNitro = this.add.zone(zoneNitroX - nitroPadding, zoneNitroY - nitroPadding, zoneNitroW, zoneNitroH)
            .setOrigin(0, 0)
            .setDepth(10)
            .setScrollFactor(0);
        let zoneNitroDebug = this.add.graphics({x: 0, y: 0})
            .setPosition(zoneNitroX - nitroPadding, zoneNitroY - nitroPadding)
            .fillStyle(0x000000, 0.5)
            .fillRect(0, 0, zoneNitroW, zoneNitroH)
            .setScrollFactor(0);


        zoneLeft.setInteractive();
        zoneLeft.on('pointerdown', this.holdLeft, this);
        zoneLeft.on('pointerup', this.releaseLeft, this);
        zoneLeft.on('pointerout', this.releaseLeft, this);

        zoneRight.setInteractive();
        zoneRight.on('pointerdown', this.holdRight, this);
        zoneRight.on('pointerup', this.releaseRight, this);
        zoneRight.on('pointerout', this.releaseRight, this);

        zoneUp.setInteractive();
        zoneUp.on('pointerdown', this.holdUp, this);
        zoneUp.on('pointerup', this.releaseUp, this);
        zoneUp.on('pointerout', this.releaseUp, this);

        zoneDown.setInteractive();
        zoneDown.on('pointerdown', this.holdDown, this);
        zoneDown.on('pointerup', this.releaseDown, this);
        zoneDown.on('pointerout', this.releaseDown, this);

        zoneNitro.setInteractive();
        zoneNitro.on('pointerdown', this.holdNitro, this);
        zoneNitro.on('pointerup', this.releaseNitro, this);
        zoneNitro.on('pointerout', this.releaseNitro, this);
    }

    private holdLeft() {
        (this.player as Player).holdLeft();
    }

    private holdRight() {
        (this.player as Player).holdRight();
    }

    private holdUp() {
        (this.player as Player).holdUp();
    }

    private holdDown() {
        (this.player as Player).holdDown();
    }

    private holdNitro() {
        (this.player as Player).holdNitro();
    }

    private releaseLeft() {
        (this.player as Player).releaseLeft();
    }

    private releaseRight() {
        (this.player as Player).releaseRight();
    }

    private releaseUp() {
        (this.player as Player).releaseUp();
    }

    private releaseDown() {
        (this.player as Player).releaseDown();
    }

    private releaseNitro() {
        (this.player as Player).releaseNitro();
    }
}
