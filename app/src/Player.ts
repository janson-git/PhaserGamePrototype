import * as Phaser from "phaser";
import {GameScene} from "./scenes/GameScene";
import Body = Phaser.Physics.Arcade.Body;

export class Player extends Phaser.Physics.Arcade.Sprite {
    protected playerSpriteRotateSize = 11.25; // 11.25 градусов на спрайт
    protected direction: number = 0;
    protected speed: number = 0;

    protected SPEED_LIMIT: number = 150;
    protected BACKWARD_SPEED_LIMIT: number = -50;
    protected ACCELERATION: number = 30; // m/sec^2
    protected DECELERATION: number = 50; // m/sec^2

    private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

    constructor(scene: GameScene, x: integer, y: integer) {
        super(scene, x, y, 'red_boat');

        this.sprite = this.scene.physics.add.sprite(x, y, 'red_boat', 'red_boat_0');
    }

    private getPlayerSpriteByDirection(player, directionInDeg) : {name: string, flipX: boolean} {
        let halfStep = this.playerSpriteRotateSize / 2;
        // 5.625 - половина от шага поворота. Спрайт смотрит в определённый угол и плюс-минус половина шага.
        let index = 0;

        if ( (directionInDeg > (360 - halfStep)) || directionInDeg < halfStep) {
            index = 0;
        } else if ( (directionInDeg > (11.25 - halfStep)) && (directionInDeg < (11.25 + halfStep)) ) {
            index = 1;
        } else if (directionInDeg > (22.5 - halfStep) && directionInDeg < (22.5 + halfStep)) {
            index = 2;
        } else if (directionInDeg > (33.75 - halfStep) && directionInDeg < (33.75 + halfStep)) {
            index = 3;
        } else if (directionInDeg > (45 - halfStep) && directionInDeg < (45 + halfStep)) {
            index = 4;
        } else if (directionInDeg > (56.25 - halfStep) && directionInDeg < (56.25 + halfStep)) {
            index = 5;
        } else if (directionInDeg > (67.5 - halfStep) && directionInDeg < (67.5 + halfStep)) {
            index = 6;
        } else if (directionInDeg > (78.75 - halfStep) && directionInDeg < (78.75 + halfStep)) {
            index = 7;
        } else if (directionInDeg > (90 - halfStep) && directionInDeg < (90 + halfStep)) {
            index = 8;
        } else if (directionInDeg > (101.25 - halfStep) && directionInDeg < (101.25 + halfStep)) {
            index = 9;
        } else if (directionInDeg > (112.5 - halfStep) && directionInDeg < (112.5 + halfStep)) {
            index = 10;
        } else if (directionInDeg > (123.75 - halfStep) && directionInDeg < (123.75 + halfStep)) {
            index = 11;
        } else if (directionInDeg > (135 - halfStep) && directionInDeg < (135 + halfStep)) {
            index = 12;
        } else if (directionInDeg > (146.25 - halfStep) && directionInDeg < (146.25 + halfStep)) {
            index = 13;
        } else if (directionInDeg > (157.5 - halfStep) && directionInDeg < (157.5 + halfStep)) {
            index = 14;
        } else if (directionInDeg > (168.75 - halfStep) && directionInDeg < (168.75 + halfStep)) {
            index = 15;
        } else if (directionInDeg > (180 - halfStep) && directionInDeg < (180 + halfStep)) {
            index = 16;
        } else if (directionInDeg > (191.25 - halfStep) && directionInDeg < (191.25 + halfStep)) {
            index = 17;
        } else if (directionInDeg > (202.5 - halfStep) && directionInDeg < (202.5 + halfStep)) {
            index = 18;
        } else if (directionInDeg > (213.75 - halfStep) && directionInDeg < (213.75 + halfStep)) {
            index = 19;
        } else if (directionInDeg > (225 - halfStep) && directionInDeg < (225 + halfStep)) {
            index = 20;
        } else if (directionInDeg > (236.25 - halfStep) && directionInDeg < (236.25 + halfStep)) {
            index = 21;
        } else if (directionInDeg > (247.5 - halfStep) && directionInDeg < (247.5 + halfStep)) {
            index = 22;
        } else if (directionInDeg > (258.75 - halfStep) && directionInDeg < (258.75 + halfStep)) {
            index = 23;
        } else if (directionInDeg > (270 - halfStep) && directionInDeg < (270 + halfStep)) {
            index = 24;
        } else if (directionInDeg > (281.25 - halfStep) && directionInDeg < (281.25 + halfStep)) {
            index = 25;
        } else if (directionInDeg > (292.5 - halfStep) && directionInDeg < (292.5 + halfStep)) {
            index = 26;
        } else if (directionInDeg > (303.75 - halfStep) && directionInDeg < (303.75 + halfStep)) {
            index = 27;
        } else if (directionInDeg > (315 - halfStep) && directionInDeg < (315 + halfStep)) {
            index = 28;
        } else if (directionInDeg > (326.25 - halfStep) && directionInDeg < (326.25 + halfStep)) {
            index = 29;
        } else if (directionInDeg > (337.5 - halfStep) && directionInDeg < (337.5 + halfStep)) {
            index = 30;
        } else if (directionInDeg > (348.75 - halfStep) && directionInDeg < (348.75 + halfStep)) {
            index = 31;
        }

        let num = index;
        if (index > 16) {
            num = 31 - index;
            return {name: 'red_boat_' + num, flipX: true};
        }
        return {name: 'red_boat_' + num, flipX: false};
    };

    public update(time, delta) {
        let tDiff = delta / 1000;
        let cursors = this.scene.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            this.direction -= 4;
            if (this.direction < 0) {
                this.direction = 360;
            }
            this.updateVelocities();
        } else if (cursors.right.isDown) {
            this.direction += 4;
            if (this.direction > 360) {
                this.direction = 0;
            }
            this.updateVelocities();
        }
        if (cursors.up.isDown) {
            this.speed += (this.ACCELERATION * tDiff);
            if (this.speed > this.SPEED_LIMIT) {
                this.speed = this.SPEED_LIMIT;
            }

            this.updateVelocities();
        } else if (cursors.down.isDown) {
            this.speed -= (this.DECELERATION * tDiff);
            if (this.speed < this.BACKWARD_SPEED_LIMIT) {
                this.speed = this.BACKWARD_SPEED_LIMIT;
            }

            this.updateVelocities();
        }

        if (cursors.space.isDown) {
            if (this.speed > 0) {
                this.speed -= (this.DECELERATION * tDiff);
                if (this.speed < 0) {
                    this.speed = 0;
                }
            }

            this.updateVelocities();
        }

        // взять нужный спрайт, подставить в отображение
        let config = this.getPlayerSpriteByDirection(this, this.direction);
        this.sprite.destroy();

        this.sprite = this.scene.physics.add.sprite(
            Math.floor(this.body.position.x),
            Math.floor(this.body.position.y),
            'red_boat',
            config.name
        );

        if (config.flipX) {
            this.sprite.flipX = true;
        }
        this.sprite.setOriginFromFrame();
    }

    private updateVelocities() {
        let directionInRad = this.direction * Math.PI / 180;
        this.setVelocityX(this.speed * Math.sin(directionInRad));
        this.setVelocityY(-1 * this.speed * Math.cos(directionInRad));
    }
}
