import * as Phaser from "phaser";
import {Player} from "./Player";
import {BoatTrail} from "./BoatTrail";

type TrailConfig = {
    name: string,
    x: number,
    y: number
}

export class CarTrail extends BoatTrail {

    constructor(scene: Phaser.Scene, player: Player) {
        super(scene, player, 'car_trail');

        // Создадим анимации водного следа
        // this.createTrailAnimations();

        // добавляем в сцену чтобы спрайт был видим
        // this.scene.add.existing(this);
        // добавляем в физику, чтобы учавствовать в обсчитывании столкновений
        // а ещё, чтобы заработал метод setBodySize
        // this.scene.physics.add.existing(this);
    }

    protected getCarTrailConfig(): TrailConfig {
        let halfStep = this.player.playerSpriteRotateSize / 2;
        let directionInDeg = this.player.direction;

        let x = this.player.x;
        let y = this.player.y;
        let xDiff = 0;
        let yDiff = 0;

        // sprite list starts from direction of 225 degrees. Lets correct index to 0 or 360 degrees = index 0
        let index = Math.round(directionInDeg / this.player.playerSpriteRotateSize) + 6;

        // check rotate through 360 degrees
        if ( (directionInDeg > (360 - halfStep)) || directionInDeg < halfStep) {
            index = 6;
        }
        if (index > 15) {
            index = index - 16;
        }

        // return {name: 'car_trail_' + index, x: x, y: y};

        if ( index === 6) {
            // TOP
            xDiff = 0;
            yDiff = 13;
        } else if (index === 7) {
            xDiff = -6;
            yDiff = 11;
        } else if (index === 8) {
            xDiff = -14;
            yDiff = 9;
        } else if (index === 9) {
            xDiff = -18;
            yDiff = 5;
        } else if (index === 10) {
            // RIGHT
            xDiff = -20;
            yDiff = 0;
        } else if (index === 11) {
            xDiff = -18;
            yDiff = -4;
        } else if (index === 12) {
            xDiff = -14;
            yDiff = -8;
        } else if (index === 13) {
            xDiff = -8;
            yDiff = -12;
        } else if (index === 14) {
            // DOWN
            xDiff = 0;
            yDiff = -19;
        } else if (index === 15) {
            xDiff = 8;
            yDiff = -12;
        } else if (index === 0) {
            xDiff = 14;
            yDiff = -8;
        } else if (index === 1) {
            xDiff = 18;
            yDiff = -4;
        } else if (index === 2) {
            // LEFT
            xDiff = 20;
            yDiff = 0;
        } else if (index === 3) {
            xDiff = 18;
            yDiff = 5;
        } else if (index === 4) {
            xDiff = 14;
            yDiff = 9;
        } else if (index === 5) {
            xDiff = 6;
            yDiff = 11;
        }

        return {
            name: 'car_trail_' + index,
            x: x + xDiff,
            y: y + yDiff,
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
        let config = this.getCarTrailConfig();
        console.log(config);
        // обновляем отображаемый фрейм спрайта
        // this.setFrame(config.frame);
        this.x = config.x;
        this.y = config.y;

        this.setDepth(this.player.depth + 1);

        this.anims.play(config.name, true);
        this.setFrameData(config.name);
    }

    protected createTrailAnimations(): void {
        let frameRate = 6;
        this.scene.anims.create({key: 'car_trail_0',
            frames: [
                {key: 'car_trail', frame: 'car_trail_0'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_1',
            frames: [
                {key: 'car_trail', frame: 'car_trail_1'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_2',
            frames: [
                {key: 'car_trail', frame: 'car_trail_2'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_3',
            frames: [
                {key: 'car_trail', frame: 'car_trail_3'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_4',
            frames: [
                {key: 'car_trail', frame: 'car_trail_4'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_5',
            frames: [
                {key: 'car_trail', frame: 'car_trail_5'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_6',
            frames: [
                {key: 'car_trail', frame: 'car_trail_6'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_7',
            frames: [
                {key: 'car_trail', frame: 'car_trail_7'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_8',
            frames: [
                {key: 'car_trail', frame: 'car_trail_8'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_9',
            frames: [
                {key: 'car_trail', frame: 'car_trail_9'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_10',
            frames: [
                {key: 'car_trail', frame: 'car_trail_10'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_11',
            frames: [
                {key: 'car_trail', frame: 'car_trail_11'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_12',
            frames: [
                {key: 'car_trail', frame: 'car_trail_12'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_13',
            frames: [
                {key: 'car_trail', frame: 'car_trail_13'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_14',
            frames: [
                {key: 'car_trail', frame: 'car_trail_14'},
            ],
            frameRate: frameRate
        });
        this.scene.anims.create({key: 'car_trail_15',
            frames: [
                {key: 'car_trail', frame: 'car_trail_15'},
            ],
            frameRate: frameRate
        });
    }

    protected setFrameData(frameName: string|integer): void
    {
        // let frame = this.setFrame(frameName);
        // this.setBodySize(frame.width, frame.height);
        this.setScale(0.7);
    }
}
