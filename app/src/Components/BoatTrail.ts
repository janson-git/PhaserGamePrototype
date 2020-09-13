import * as Phaser from "phaser";
import {Player} from "./Player";

type BoatTrailConfig = {
    name: string,
    x: number,
    y: number,
    flipX: boolean,
    rotation?: number
}

export class BoatTrail extends Phaser.Physics.Arcade.Sprite {

    private player;

    constructor(scene: Phaser.Scene, player: Player) {
        let x = player.x;
        let y = player.y;
        super(scene, x, y, 'boat_trail');

        this.player = player;

        // Создадим анимации водного следа
        this.createTrailAnimations();

        // добавляем в сцену чтобы спрайт был видим
        this.scene.add.existing(this);
        // добавляем в физику, чтобы учавствовать в обсчитывании столкновений
        // this.scene.physics.add.existing(this);
    }

    private getTailConfig(): BoatTrailConfig {
        let halfStep = this.player.playerSpriteRotateSize / 2;
        let directionInDeg = this.player.direction;
        let index = 0;

        let x = this.player.x;
        let y = this.player.y;
        let xDiff = 0;
        let yDiff = 0;
        let flipX = false;
        let rotation: number = 0;

        let oneGradInRad = Math.PI / 180;

        if ( (directionInDeg > (360 - halfStep)) || directionInDeg < halfStep) {
            ////////////// TOP /////////////
            index = 0;
            xDiff = 0;
            yDiff = 13;
        } else if ( (directionInDeg > (11.25 - halfStep)) && (directionInDeg < (11.25 + halfStep)) ) {
            index = 1;
            xDiff = -4;
            yDiff = 12;
            rotation = -4 * (oneGradInRad);
        } else if (directionInDeg > (22.5 - halfStep) && directionInDeg < (22.5 + halfStep)) {
            index = 1;
            xDiff = -5;
            yDiff = 11;
        } else if (directionInDeg > (33.75 - halfStep) && directionInDeg < (33.75 + halfStep)) {
            index = 1;
            xDiff = -6;
            yDiff = 10;
            rotation = 4 * (oneGradInRad);
        } else if (directionInDeg > (45 - halfStep) && directionInDeg < (45 + halfStep)) {
            index = 2;
            xDiff = -8;
            yDiff = 7;
        } else if (directionInDeg > (56.25 - halfStep) && directionInDeg < (56.25 + halfStep)) {
            index = 2;
            xDiff = -10;
            yDiff = 4;
            rotation = 10 * (oneGradInRad);
        } else if (directionInDeg > (67.5 - halfStep) && directionInDeg < (67.5 + halfStep)) {
            index = 3;
            xDiff = -11;
            yDiff = 4;
        } else if (directionInDeg > (78.75 - halfStep) && directionInDeg < (78.75 + halfStep)) {
            index = 4;
            xDiff = -16;
            yDiff = 0;
        } else if (directionInDeg > (90 - halfStep) && directionInDeg < (90 + halfStep)) {
            ////////////// RIGHT ///////////
            index = 4;
            xDiff = -16;
            yDiff = 0;
        } else if (directionInDeg > (101.25 - halfStep) && directionInDeg < (101.25 + halfStep)) {
            index = 5;
            xDiff = -15;
            yDiff = -4;
            rotation = -25 * (oneGradInRad);
        } else if (directionInDeg > (112.5 - halfStep) && directionInDeg < (112.5 + halfStep)) {
            index = 5;
            xDiff = -12;
            yDiff = -6;
            rotation = -15 * (oneGradInRad);
        } else if (directionInDeg > (123.75 - halfStep) && directionInDeg < (123.75 + halfStep)) {
            index = 6;
            xDiff = -10;
            yDiff = -8;
        } else if (directionInDeg > (135 - halfStep) && directionInDeg < (135 + halfStep)) {
            index = 6;
            xDiff = -10;
            yDiff = -8;
        } else if (directionInDeg > (146.25 - halfStep) && directionInDeg < (146.25 + halfStep)) {
            index = 6;
            xDiff = -8;
            yDiff = -8;
        } else if (directionInDeg > (157.5 - halfStep) && directionInDeg < (157.5 + halfStep)) {
            index = 7;
            xDiff = -5;
            yDiff = -11;
        } else if (directionInDeg > (168.75 - halfStep) && directionInDeg < (168.75 + halfStep)) {
            index = 7;
            xDiff = -4;
            yDiff = -12;
            rotation = 4 * (oneGradInRad);
        } else if (directionInDeg > (180 - halfStep) && directionInDeg < (180 + halfStep)) {
            ///////////// DOWN /////////////
            index = 8;
            xDiff = -1;
            yDiff = -15;
        } else if (directionInDeg > (191.25 - halfStep) && directionInDeg < (191.25 + halfStep)) {
            index = 7;
            xDiff = 4;
            yDiff = -12;
            flipX = true;
            rotation = -4 * (oneGradInRad);
        } else if (directionInDeg > (202.5 - halfStep) && directionInDeg < (202.5 + halfStep)) {
            index = 7;
            xDiff = 5;
            yDiff = -11;
            flipX = true;
        } else if (directionInDeg > (213.75 - halfStep) && directionInDeg < (213.75 + halfStep)) {
            index = 7;
            xDiff = 6;
            yDiff = -11;
            flipX = true;
        } else if (directionInDeg > (225 - halfStep) && directionInDeg < (225 + halfStep)) {
            index = 6;
            xDiff = 11;
            yDiff = -8;
            flipX = true;
        } else if (directionInDeg > (236.25 - halfStep) && directionInDeg < (236.25 + halfStep)) {
            index = 6;
            xDiff = 11;
            yDiff = -8;
            flipX = true;
        } else if (directionInDeg > (247.5 - halfStep) && directionInDeg < (247.5 + halfStep)) {
            index = 5;
            xDiff = 12;
            yDiff = -6;
            flipX = true;
            rotation = 15 * (oneGradInRad);
        } else if (directionInDeg > (258.75 - halfStep) && directionInDeg < (258.75 + halfStep)) {
            index = 4;
            xDiff = 15;
            yDiff = -2;
            flipX = true;
        } else if (directionInDeg > (270 - halfStep) && directionInDeg < (270 + halfStep)) {
            ////////////// LEFT /////////////
            index = 4;
            xDiff = 16;
            yDiff = 0;
            flipX = true;
        } else if (directionInDeg > (281.25 - halfStep) && directionInDeg < (281.25 + halfStep)) {
            index = 4;
            xDiff = 15;
            yDiff = 2;
            flipX = true;
        } else if (directionInDeg > (292.5 - halfStep) && directionInDeg < (292.5 + halfStep)) {
            index = 3;
            xDiff = 11;
            yDiff = 4;
            flipX = true;
        } else if (directionInDeg > (303.75 - halfStep) && directionInDeg < (303.75 + halfStep)) {
            index = 3;
            xDiff = 11;
            yDiff = 4;
            flipX = true;
        } else if (directionInDeg > (315 - halfStep) && directionInDeg < (315 + halfStep)) {
            index = 2;
            xDiff = 8;
            yDiff = 7;
            flipX = true;
        } else if (directionInDeg > (326.25 - halfStep) && directionInDeg < (326.25 + halfStep)) {
            index = 2;
            xDiff = 7;
            yDiff = 8;
            flipX = true;
        } else if (directionInDeg > (337.5 - halfStep) && directionInDeg < (337.5 + halfStep)) {
            index = 1;
            xDiff = 4;
            yDiff = 10;
            flipX = true;
        } else if (directionInDeg > (348.75 - halfStep) && directionInDeg < (348.75 + halfStep)) {
            index = 1;
            xDiff = 3;
            yDiff = 12;
            flipX = true;
        }

        return {
            name: 'trail_' + index,
            x: x + xDiff,
            y: y + yDiff,
            flipX: flipX,
            rotation: rotation
        };
    }

    public update(time, delta) {
        if (this.player.speed <= 0) {
            this.setVisible(false);
            return;
        }
        if (this.visible === false) {
            this.setVisible(true);
        }

        let tDiff = delta / 1000;

        // взять нужный спрайт, подставить в отображение
        let config = this.getTailConfig();
        // обновляем отображаемый фрейм спрайта
        // this.setFrame(config.frame);
        this.x = config.x;
        this.y = config.y;

        // this.setFrame('boat_trail_5');
        // this.setBodySize(frame.width, frame.height);

        this.flipX = config.flipX || false;
        this.rotation = config.rotation;
        this.setDepth(this.player.depth + 1);

        this.anims.play(config.name, true);

        //
        // // взять нужный спрайт, подставить в отображение
        // let config = this.getPlayerSpriteByDirection(this, this.direction);
        // // обновляем отображаемый фрейм спрайта
        // let frame = this.setFrame(config.name);
        // this.setBodySize(frame.width, frame.height);
        //
        // this.flipX = config.flipX || false;
    }

    // private updateVelocities() {
    //     let directionInRad = this.direction * Math.PI / 180;
    //     this.setVelocityX(this.speed * Math.sin(directionInRad));
    //     this.setVelocityY(-1 * this.speed * Math.cos(directionInRad));
    // }

    private createTrailAnimations(): void {
        let frameRate = 6;
        this.scene.anims.create({key: 'trail_0',
            frames: [
                {key: 'boat_trail', frame: 'boat_trail_0'},
                {key: 'boat_trail', frame: 'boat_trail_1'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'trail_1',
            frames: [
                {key: 'boat_trail', frame: 'boat_trail_2'},
                {key: 'boat_trail', frame: 'boat_trail_3'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'trail_2',
            frames: [
                {key: 'boat_trail', frame: 'boat_trail_4'},
                {key: 'boat_trail', frame: 'boat_trail_5'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'trail_3',
            frames: [
                {key: 'boat_trail', frame: 'boat_trail_6'},
                {key: 'boat_trail', frame: 'boat_trail_7'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'trail_4',
            frames: [
                {key: 'boat_trail', frame: 'boat_trail_8'},
                {key: 'boat_trail', frame: 'boat_trail_9'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'trail_5',
            frames: [
                {key: 'boat_trail', frame: 'boat_trail_10'},
                {key: 'boat_trail', frame: 'boat_trail_11'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'trail_6',
            frames: [
                {key: 'boat_trail', frame: 'boat_trail_12'},
                {key: 'boat_trail', frame: 'boat_trail_13'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'trail_7',
            frames: [
                {key: 'boat_trail', frame: 'boat_trail_14'},
                {key: 'boat_trail', frame: 'boat_trail_15'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'trail_8',
            frames: [
                {key: 'boat_trail', frame: 'boat_trail_16'},
                {key: 'boat_trail', frame: 'boat_trail_17'},
            ],
            frameRate: frameRate
        });
    }
}
