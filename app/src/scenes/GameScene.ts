import * as Phaser from "phaser";
import {Player} from "../Player";
import GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;

export class GameScene extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
    private player: GameObjectWithBody;

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
    }

    public create() {
        this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as any;
        this.physics.add.existing(this.square);

        let player = new Player(this, 100, 100);
        this.player = this.physics.add.existing(player);

        // this.add.rectangle(100,100, 2, 2, 0xFF0000);

        this.physics.add.sprite(150, 150, 'red_boat', 'red_boat_1');
    }

    public update() {
        const cursorKeys = this.input.keyboard.createCursorKeys();

        if (cursorKeys.up.isDown) {
            this.square.body.setVelocityY(-5);
        } else if (cursorKeys.down.isDown) {
            this.square.body.setVelocityY(5);
        } else {
            this.square.body.setVelocityY(0);
        }

        if (cursorKeys.right.isDown) {
            this.square.body.setVelocityX(5);
        } else if (cursorKeys.left.isDown) {
            this.square.body.setVelocityX(-5);
        } else {
            this.square.body.setVelocityX(0);
        }

        this.player.update();
    }
}
