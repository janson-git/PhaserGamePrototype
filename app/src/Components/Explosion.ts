import * as Phaser from "phaser";
import {Player} from "./Player";
import {GameScene} from "../scenes/GameScene";

type ExplosionConfig = {
    name: string,
    x: number,
    y: number,
    flipX: boolean,
    rotation?: number
}

export class Explosion extends Phaser.Physics.Arcade.Sprite {

    private player;

    constructor(scene: Phaser.Scene, player: Player) {
        let x = player.x;
        let y = player.y;
        super(scene, x, y, 'explosion');

        this.player = player;

        // Создадим анимации водного следа
        this.createAnimations();

        // добавляем в сцену чтобы спрайт был видим
        this.scene.add.existing(this);
        // добавляем в физику, чтобы учавствовать в обсчитывании столкновений
        // this.scene.physics.add.existing(this);
    }

    public update(time, delta) {
        if (this.player.getHP() > 0) {
            this.setVisible(false);
            return;
        }

        this.setVisible(true);

        let tDiff = delta / 1000;

        this.x = this.player.x;
        this.y = this.player.y;

        this.flipX = false;
        this.rotation = 0;
        this.setDepth(this.player.depth);

        let scene = (this.scene as GameScene)
        if (scene.getCurrentState() === scene.STATE_PLAY) {
            this.anims.play('explode_boat', true);
        }
    }


    private createAnimations(): void {
        let frameRate = 6;
        this.scene.anims.create({key: 'explode_boat',
            frames: [
                {key: 'explosion', frame: 'explosion_0'},
                {key: 'explosion', frame: 'explosion_1'},
                {key: 'explosion', frame: 'explosion_2'},
                {key: 'explosion', frame: 'explosion_3'},
                {key: 'explosion', frame: 'explosion_4'},
                {key: 'explosion', frame: 'explosion_5'},
                {key: 'explosion', frame: 'explosion_6'},
            ],
            frameRate: frameRate,
            hideOnComplete: true,
        });
    }
}
