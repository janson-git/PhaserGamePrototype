import * as Phaser from "phaser";
import {Player} from "../Components/Player";
import MathUtils from "../lib/MathUtils";
import BSPMazeGenerator from "../lib/BSPMazeGenerator";
import GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;
import BlendModes = Phaser.BlendModes;
import WaterMazeTilesProcessor from "../lib/WaterMaze/WaterMazeTilesProcessor";
import {BoatTrail} from "../Components/BoatTrail";

export class GameScene extends Phaser.Scene {

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

        this.load.image('tilesExtruded', 'assets/tilemaps/WaterMazeTilesExtruded.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/WaterMazeMap.json');
        // this.load.image('tilesExtruded16', 'assets/tilemaps/WaterGrassTiles16Extruded.png');
        // this.load.tilemapTiledJSON('map', 'assets/tilemaps/WaterGrassMap16.json');
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
            // tiles = map.addTilesetImage('waterAndGrass16', 'tilesExtruded16', 16, 16, 1, 2, 1);
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
            // let tiles = map.addTilesetImage('waterAndGrass', 'tilesExtruded');
            tiles = map.addTilesetImage('waterAndGrass16', 'tilesExtruded16');

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
        this.scoreText = this.add.text(16, 16, `Собрано звёзд: ${this.collectedStars} из 10`, { fontSize: '32px', fill: '#000' });
        this.scoreText.setScrollFactor(0);

        // Create minimap
        let miniMapContainer = this.add.group();
        let gameScale = this.sys.game.scale;
        // background
        let miniMapBg = this.add.rectangle(70, gameScale.height - 70, 130, 130, 0x666666, 0.6);
        miniMapBg.setScrollFactor(0);

        // SCALED tilemap on background, Scale = (1 / tileWidth)
        this.miniLayer = miniMap.createStaticLayer(0, tiles, 10, gameScale.height - 130);
        this.miniLayer.setScale(this.MINIMAP_SCALE);
        this.miniLayer.setScrollFactor(0);
        this.miniLayer.setBlendMode(BlendModes.SCREEN);

        // graphics to draw player and other objects!
        this.miniMapLocator = this.add.graphics();
        this.miniMapLocator.setScrollFactor(0);
        this.miniMapLocator.setPosition(10, gameScale.height - 130, 130, 130);

        miniMapContainer.addMultiple([miniMapBg, this.miniLayer, this.miniMapLocator]);
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


    private renderTexture: Phaser.GameObjects.RenderTexture;
    private unitDots: Phaser.GameObjects.Graphics;

    public createMiniMap(level) {
        let miniMapContainer = this.add.group();

        let gameScale = this.sys.game.scale;

        let miniMap = this.add.rectangle(60, gameScale.height - 60, 100, 100, 0x666666, 0.8);
        miniMap.setScrollFactor(0);
        // let resolution = 2 / 100;
        // let renderWH = 120 * 16; // ширина карты в целом 120 тайлов * 16 пкс на тайл
        //
        // let gameScale = this.sys.game.scale;
        // this.renderTexture = this.add.renderTexture(renderWH, renderWH);
        // this.renderTexture.scale = resolution;
        // var cropRect = new Phaser.Geom.Rectangle(0, 0, 200, 200);
        // this.renderTexture.setCrop(cropRect);
        // var miniMapY = this.cameras.main.height - (gameScale.height * resolution);
        // var miniMapUI = this.add.image(0, 0, 'mini_map');
        // this.renderTexture.displayWidth = this.renderTexture.scale * gameScale.width;
        // this.renderTexture.displayHeight = this.renderTexture.scale * gameScale.height;
        // var cropRect = new Phaser.Geom.Rectangle(0, 0, this.renderTexture.displayWidth, this.renderTexture.displayHeight);
        // this.renderTexture.setCrop(cropRect);
        // var miniWidth = .075 * this.renderTexture.displayWidth + 100;
        // var miniHeight = miniMapY - (.06 * this.renderTexture.displayHeight);
        // let miniMap = this.add.sprite(miniWidth, miniHeight, this.renderTexture.texture);
        // var padding = .241 * this.renderTexture.displayHeight;
        // miniMapUI.width = (this.renderTexture.displayWidth + padding);
        // miniMapUI.height = (this.renderTexture.displayHeight + padding);
        // miniMapUI.y = this.cameras.main.height - miniMapUI.height;
        // miniMapUI.setScrollFactor(0);
        // miniMap.setScrollFactor(0);
        //
        // let viewRect = this.add.graphics();
        // viewRect.lineStyle(1, 0xFFFFFF);
        // viewRect.fillRect(miniMap.x, miniMap.y, this.cameras.main.width * resolution, this.cameras.main.height * resolution);
        //
        // this.unitDots = this.add.graphics({x: miniMap.x, y: miniMap.y});
        // // this.unitDots.setScrollFactor(0);
        // var bg = this.add.graphics();
        // // bg.fillStyle(0x000000, 1);
        // // bg.fillRect(0, miniMapUI.y + (miniMapUI.height * .1), miniMapUI.width * .95, miniMapUI.height * .9);
        // // bg.setScrollFactor(0);
        // var children = [bg, miniMap, this.unitDots, viewRect, miniMapUI];
        miniMapContainer.addMultiple([miniMap]);
    }

    private updateUnitDots() {
        this.unitDots.clear();
        this.stars.getChildren().forEach((object) => {
            var unitMiniX = object.body.position.x * this.renderTexture.scale;
            var unitMiniY = object.body.position.y * this.renderTexture.scale;

            var color = 0x1331a1;
            this.unitDots.fillStyle(color, 1);
            this.unitDots.fillEllipse(unitMiniX, unitMiniY, 2, 2);
        });
    }
}
