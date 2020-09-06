import * as Phaser from "phaser";
import {Player} from "../Player";
import GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;
import MathUtils from "../lib/MathUtils";
import BSPMazeGenerator from "../lib/BSPMazeGenerator";

export class GameScene extends Phaser.Scene {

    private USE_RANDOM_MAPS_IN_GAME: boolean = true;

    private player: GameObjectWithBody;
    private layer: StaticTilemapLayer;
    private stars;
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

        this.load.image('star', 'assets/star24.png');

        // this.load.image('tilesExtruded', 'assets/tilemaps/WaterMazeTilesExtruded.png');
        // this.load.tilemapTiledJSON('map', 'assets/tilemaps/WaterMazeMap.json');
        this.load.image('tilesExtruded16', 'assets/tilemaps/WaterGrassTiles16Extruded.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/WaterGrassMap16.json');
    }

    public create() {
        let map: Phaser.Tilemaps.Tilemap;

        if (this.USE_RANDOM_MAPS_IN_GAME === true) {
            // ГЕНЕРИМ КАРТУ НА КАЖДУЮ ИГРУ ЗАНОВО
            // TODO: надо передавать в генератор какие-то значения, на основе которых мы строим карту
            let mapGenerator = new BSPMazeGenerator();
            let levelData = mapGenerator.generateMap(120, 120, 5);
            // FIXME: пока что, по-умолчанию генератор возвращат 0 где блок и 1 где проход
            // Перепишем блоки и проходы на наши значения: 1 и 2
            for (let i = 0; i < levelData.length; i++) {
                // я хочу, чтобы 2 - это был проход, а 1 - это был блок.
                // заменяем в данных генератора 1 => 2, 0 => 1
                levelData[i] = (levelData[i] === 0) ? 1 : 2;
            }

            // переформатируем levelData в 2D массив
            let level: number[][] = [], chunk = 120;
            for (let i = 0, j = levelData.length; i < j; i += chunk) {
                level.push(levelData.slice(i, i + chunk));
            }

            map = this.make.tilemap({data: level, tileWidth: 16, tileHeight: 16});
            let tiles = map.addTilesetImage('waterAndGrass16', 'tilesExtruded16', 16, 16, 1, 2, 1);
            this.layer = map.createStaticLayer(0, tiles, 0, 0);
        } else {
            // ИСПОЛЬЗУЕМ КАРТУ ИЗ КОНФИГА
            map = this.make.tilemap({ key: 'map' });

            // The first parameter is the name of the tileset in Tiled and the second parameter is the key
            // of the tileset image used when loading the file in preload.
            // let tiles = map.addTilesetImage('waterAndGrass', 'tilesExtruded');
            let tiles = map.addTilesetImage('waterAndGrass16', 'tilesExtruded16');

            // You can load a layer from the map using the layer name from Tiled, or by using the layer
            // index (0 in this case).
            this.layer = map.createStaticLayer(0, tiles, 0, 0);
        }


        // проверка коллизий будет навешена на ID тайлов от start до stop
        map.setCollisionBetween(1, 1, true, false, this.layer);

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
        let playerTileX, playerTileY, playerPlaced;
        do {
            playerTileX = MathUtils.getRandomIntegerBetween(0, map.width - 1);
            playerTileY = MathUtils.getRandomIntegerBetween(0, map.height - 1);
            let tile = map.getTileAt(playerTileX, playerTileY);

            if (tile.canCollide !== true) {
                // ставим на поле игрока
                playerPlaced = true;
                let coords = map.tileToWorldXY(playerTileX, playerTileY);
                this.player = new Player(this, coords.x, coords.y);
            }
        } while (playerPlaced !== true);

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
    }

    public update(time, delta) {
        const cursorKeys = this.input.keyboard.createCursorKeys();

        this.player.update(time, delta);

        this.physics.collide(this.player, this.layer);
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
}
