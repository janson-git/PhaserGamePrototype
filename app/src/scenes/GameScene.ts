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

export class GameScene extends SceneBase {

    private USE_RANDOM_MAPS_IN_GAME: boolean = true;
    private MINIMAP_SCALE: number = 1/24;

    private player: GameObjectWithBody;
    private playerBoatTrail: GameObjectWithBody;
    private layer: StaticTilemapLayer;
    private miniLayer: StaticTilemapLayer;
    private miniMapLocator: Phaser.GameObjects.Graphics;
    private stars: Phaser.Physics.Arcade.Group;
    private collectedStars;
    private scoreText;

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

        this.load.image('star', 'assets/star24.png');
        this.load.image('settingsIcon', 'assets/settingsIcon-24.png');

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
            // генератор возвращает 0 - где блок и 1 - где проход
            // Расставим тайлы из спрайта WaterMazeTiles
            levelData = WaterMazeTilesProcessor.placeTiles(levelData, 120);

            // переформатируем levelData в 2D массив
            let level: number[][] = [], chunk = 120;
            for (let i = 0, j = levelData.length; i < j; i += chunk) {
                level.push(levelData.slice(i, i + chunk));
            }

            map = this.make.tilemap({data: level, tileWidth: 24, tileHeight: 24});
            tiles = map.addTilesetImage('waterAndGrass', 'tilesExtruded', 26, 26, 1, 1, 1);
            this.layer = map.createStaticLayer(0, tiles, 0, 0);

            // а теперь для расставленных тайлов установим обработку коллизий
            let collisionBlocks = WaterMazeTilesProcessor.getCollisionTilesIndexes();
            map.setCollision(collisionBlocks, true, false, this.layer);

            miniMap = this.make.tilemap({data: level, tileWidth: 24, tileHeight: 24});
        } else {
            // ИСПОЛЬЗУЕМ КАРТУ ИЗ КОНФИГА
            map = this.make.tilemap({ key: 'map' });
            miniMap = this.make.tilemap({ key: 'map' });

            // The first parameter is the name of the tileset in Tiled and the second parameter is the key
            // of the tileset image used when loading the file in preload.
            tiles = map.addTilesetImage('waterAndGrass', 'tilesExtruded');

            // You can load a layer from the map using the layer name from Tiled, or by using the layer
            // index (0 in this case).
            this.layer = map.createStaticLayer(0, tiles, 0, 0);

            // проверка коллизий будет навешена на ID тайлов от start до stop
            map.setCollisionBetween(1, 1, true, false, this.layer);
        }

        // случайным образом генерим координаты и проверяем:
        // если tail в этом месте не препятствие, то можно туда ставить звезду
        this.stars = this.physics.add.group();
        for (let i = 0; i < 10; i++) {
            let tileX, tileY, placed = false;
            do {
                tileX = MathUtils.getRandomIntegerBetween(0, map.width - 1);
                tileY = MathUtils.getRandomIntegerBetween(0, map.height - 1);
                let tile = map.getTileAt(tileX, tileY);

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
            let tile = map.getTileAt(playerTileX, playerTileY);

            if (tile.canCollide !== true) {
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
        this.scoreText = this.add.text(16, 16, `Собрано звёзд: ${this.collectedStars} из 10`, { fontSize: '32px', fill: '#000' })
            .setScrollFactor(0);

        // Create minimap
        this.createMiniMap(miniMap, tiles);

        // Create settings icon
        let gameScale = this.sys.game.scale;
        let settingsButton = new InGameSettingsButton(this, gameScale.width - 40, 40, 30, 30);
        settingsButton.setScrollFactor(0);

        settingsButton.on('pointerdown', () => {
            // TODO: add popup window menu with items:
            // TODO: 1. exit to main menu
            PopupManager.createWindow(this, new SettingsPopup());
        });
    }

    public update(time, delta) {
        this.player.update(time, delta);
        this.physics.collide(this.player, this.layer);
        this.playerBoatTrail.update(time, delta);

        // update minimap, draw objects by scaled coordinates
        let miniPlayerX = this.player.body.position.x * this.MINIMAP_SCALE;
        let miniPlayerY = this.player.body.position.y * this.MINIMAP_SCALE;

        this.miniMapLocator.clear();
        this.miniMapLocator.fillStyle(0xFF0000);
        this.miniMapLocator.fillRect(miniPlayerX, miniPlayerY, 2, 2);
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
}
