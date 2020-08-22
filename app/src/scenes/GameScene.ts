import * as Phaser from "phaser";
import {Player} from "../Player";
import GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;

export class GameScene extends Phaser.Scene {
    private player: GameObjectWithBody;
    private layer: StaticTilemapLayer;

    constructor() {
        const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
            active: false,
            visible: false,
            key: 'Game',
        };

        super(sceneConfig);
    }

    public preload() {
        this.load.setBaseURL();
        this.load.atlas(
            'red_boat',
            'assets/atlas/boatsSpriteListTransparent.png',
            'assets/atlas/redBoatSpriteListConfig.json'
        );

        this.load.image('tiles', 'assets/tilemaps/WaterMazeTiles.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/WaterMazeMap.json');
    }

    public create() {
        let map = this.make.tilemap({ key: 'map' });

        // The first parameter is the name of the tileset in Tiled and the second parameter is the key
        // of the tileset image used when loading the file in preload.
        let tiles = map.addTilesetImage('waterAndGrass', 'tiles');

        // You can load a layer from the map using the layer name from Tiled, or by using the layer
        // index (0 in this case).
        this.layer = map.createStaticLayer(0, tiles, 0, 0);

        // TODO: научится бы корректно нужные спрайты для тайлов указывать.
        // TODO: и соответственно - их проверять
        map.setCollisionBetween(85, 999, true, false, this.layer);

        // let shapeGraphics = this.add.graphics();
        // this.drawCollisionShapes(shapeGraphics);

        this.player = new Player(this, 100, 100);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true);
    }

    public update(time, delta) {
        const cursorKeys = this.input.keyboard.createCursorKeys();

        this.player.update(time, delta);

        this.physics.collide(this.player, this.layer);
    }


    private drawCollisionShapes (graphics)
    {
        graphics.clear();

        // Loop over each tile and visualize its collision shape (if it has one)
        this.layer.forEachTile(function (tile)
        {
            var tileWorldX = tile.getLeft();
            var tileWorldY = tile.getTop();
            var collisionGroup = tile.getCollisionGroup();

            // console.log(collisionGroup);

            if (!collisionGroup || collisionGroup.objects.length === 0) { return; }

            // The group will have an array of objects - these are the individual collision shapes
            var objects = collisionGroup.objects;

            for (var i = 0; i < objects.length; i++)
            {
                var object = objects[i];
                var objectX = tileWorldX + object.x;
                var objectY = tileWorldY + object.y;

                // When objects are parsed by Phaser, they will be guaranteed to have one of the
                // following properties if they are a rectangle/ellipse/polygon/polyline.
                if (object.rectangle)
                {
                    graphics.strokeRect(objectX, objectY, object.width, object.height);
                }
                else if (object.ellipse)
                {
                    // Ellipses in Tiled have a top-left origin, while ellipses in Phaser have a center
                    // origin
                    graphics.strokeEllipse(
                        objectX + object.width / 2, objectY + object.height / 2,
                        object.width, object.height
                    );
                }
                else if (object.polygon || object.polyline)
                {
                    var originalPoints = object.polygon ? object.polygon : object.polyline;
                    var points = [];
                    for (var j = 0; j < originalPoints.length; j++)
                    {
                        var point = originalPoints[j];
                        points.push({
                            x: objectX + point.x,
                            y: objectY + point.y
                        });
                    }
                    graphics.strokePoints(points);
                }
            }
        });
    }
}
