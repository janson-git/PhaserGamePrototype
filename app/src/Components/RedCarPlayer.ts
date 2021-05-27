import * as Phaser from "phaser";
import {Player} from "./Player";

export class RedCarPlayer extends Player {
    protected playerSpriteRotateSize = 22.5; // градусов дуги на спрайт
    protected direction: number = 0;
    protected speed: number = 0;

    protected controlsHold = {
        left: false,
        right: false,
        up: false,
        down: false,
        nitro: false
    };

    protected nitroCount: number = 3;
    protected isNitroActive: boolean = false;
    protected nitroActivatedTime: number = 0;

    protected SPEED_LIMIT: number = 150;
    protected SPEED_LIMIT_ON_NITRO: number = 300;
    protected NITRO_DURATION_IN_SEC: number = 3;
    protected BACKWARD_SPEED_LIMIT: number = -20;
    protected ACCELERATION: number = 60; // m/sec^2
    protected DECELERATION: number = 80; // m/sec^2
    protected ROTATE_SPEED: number = 90; // Degrees per second

    constructor(scene: Phaser.Scene, x: integer, y: integer, textureName: string = 'red_car') {
        super(scene, x, y, textureName);
    }

    protected getPlayerSpriteByDirection(player, directionInDeg) : {name: string, flipX: boolean} {
        let halfStep = this.playerSpriteRotateSize / 2;
        let index = 0;

        if ( (directionInDeg > (360 - halfStep)) || directionInDeg < halfStep) {
            index = 6;
        } else if (directionInDeg > (22.5 - halfStep) && directionInDeg < (22.5 + halfStep)) {
            index = 7;
        } else if (directionInDeg > (45 - halfStep) && directionInDeg < (45 + halfStep)) {
            index = 8;
        } else if (directionInDeg > (67.5 - halfStep) && directionInDeg < (67.5 + halfStep)) {
            index = 9;
        } else if (directionInDeg > (90 - halfStep) && directionInDeg < (90 + halfStep)) {
            index = 10;
        } else if (directionInDeg > (112.5 - halfStep) && directionInDeg < (112.5 + halfStep)) {
            index = 11;
        } else if (directionInDeg > (135 - halfStep) && directionInDeg < (135 + halfStep)) {
            index = 12;
        } else if (directionInDeg > (157.5 - halfStep) && directionInDeg < (157.5 + halfStep)) {
            index = 13;
        } else if (directionInDeg > (180 - halfStep) && directionInDeg < (180 + halfStep)) {
            index = 14;
        } else if (directionInDeg > (202.5 - halfStep) && directionInDeg < (202.5 + halfStep)) {
            index = 15;
        } else if (directionInDeg > (225 - halfStep) && directionInDeg < (225 + halfStep)) {
            // TODO: this sprite "jump up" relative other! MAGIC!
            index = 0;
        } else if (directionInDeg > (247.5 - halfStep) && directionInDeg < (247.5 + halfStep)) {
            index = 1;
        } else if (directionInDeg > (270 - halfStep) && directionInDeg < (270 + halfStep)) {
            index = 2;
        } else if (directionInDeg > (292.5 - halfStep) && directionInDeg < (292.5 + halfStep)) {
            index = 3;
        } else if (directionInDeg > (315 - halfStep) && directionInDeg < (315 + halfStep)) {
            index = 4;
        } else if (directionInDeg > (337.5 - halfStep) && directionInDeg < (337.5 + halfStep)) {
            index = 5;
        }

        return {name: 'red_car_' + index, flipX: false};
    };

    public update(time, delta) {
        let tDiff = delta / 1000;
        let cursors = this.scene.input.keyboard.createCursorKeys();

        if (cursors.left.isDown || this.controlsHold.left) {
            this.direction -= (this.ROTATE_SPEED * tDiff);
            if (this.direction < 0) {
                this.direction = 360 - (this.direction);
            }
        } else if (cursors.right.isDown || this.controlsHold.right) {
            this.direction += (this.ROTATE_SPEED * tDiff);
            if (this.direction > 360) {
                this.direction = this.direction - 360;
            }
        }
        if (cursors.up.isDown || this.controlsHold.up) {
            this.speed += (this.ACCELERATION * tDiff);
            if (this.speed > this.SPEED_LIMIT) {
                this.speed = this.SPEED_LIMIT;
            }
        } else if (cursors.down.isDown) {
            this.speed -= (this.DECELERATION * tDiff);
            if (this.speed < this.BACKWARD_SPEED_LIMIT) {
                this.speed = this.BACKWARD_SPEED_LIMIT;
            }
        }

        if (cursors.space.isDown|| this.controlsHold.down) {
            if (this.speed > 0) {
                this.speed -= (this.DECELERATION * tDiff);
                if (this.speed < 0) {
                    this.speed = 0;
                }
            } else if (this.speed < 0) {
                this.speed += (this.DECELERATION * tDiff);
                if (this.speed > 0) {
                    this.speed = 0;
                }
            }
        }

        if ((cursors.shift.isDown || this.controlsHold.nitro) && !this.isNitroActive && this.nitroCount > 0) {
            //////////////// NITRO ACTIVATED!
            this.isNitroActive = true;
            this.nitroActivatedTime = time;
            this.nitroCount--;
            console.log('is nitro active: ', this.isNitroActive);
            console.log('nitros left: ', this.nitroCount);
        }

        // IF NITRO IS ACTIVE - MAX SPEEEEEED!!!
        if (this.isNitroActive) {
            let nitroTime = (time - this.nitroActivatedTime) / 1000;
            if (nitroTime < this.NITRO_DURATION_IN_SEC) {
                this.speed = this.SPEED_LIMIT_ON_NITRO;
            } else {
                this.isNitroActive = false;
                this.nitroActivatedTime = 0;
                this.speed = this.SPEED_LIMIT;
            }
        }

        // OK, digits are sets. Now calc velocities of player with digits
        this.updateVelocities();

        // look select sprite by direction
        let config = this.getPlayerSpriteByDirection(this, this.direction);
        let frame = this.setFrame(config.name);
        this.setBodySize(frame.width, frame.height);

        this.flipX = config.flipX || false;
    }
}
