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

        // sprite list starts from direction of 225 degrees. Lets correct index to 0 or 360 degrees = index 0
        let index = Math.round(directionInDeg / this.playerSpriteRotateSize) + 6;

        // check rotate through 360 degrees
        if ( (directionInDeg > (360 - halfStep)) || directionInDeg < halfStep) {
            index = 6;
        }
        if (index > 15) {
            index = index - 16;
        }

        return {name: 'red_car_' + index, flipX: false};
    };

    protected setFrameData(frameName: string|integer): void
    {
        let frame = this.setFrame(frameName);
        this.setBodySize(frame.width, frame.height);
        this.setScale(0.7);
    }
}
