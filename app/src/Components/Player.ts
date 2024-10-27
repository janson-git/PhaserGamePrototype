import * as Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
    protected playerSpriteRotateSize = 11.25; // 11.25 градусов на спрайт
    protected direction: number = 0;
    protected speed: number = 0;
    protected hitpoints: number = 2;

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

    constructor(scene: Phaser.Scene, x: integer, y: integer, textureName: string = 'red_boat') {
        super(scene, x, y, textureName);

        // add self to scene. And now it will be visible
        this.scene.add.existing(this);
        // and add to phisics, to get collide calculations
        this.scene.physics.add.existing(this);
    }

    protected getPlayerSpriteByDirection(player, directionInDeg) : {name: string, flipX: boolean} {
        let halfStep = this.playerSpriteRotateSize / 2;
        let index = Math.round(directionInDeg / this.playerSpriteRotateSize);

        // sprite indexes starts from 0 (on 0 degrees) to 16 (on 180 degrees).
        // After 180 will be indexed from 16 to 0 and mirrored

        // check rotate through 360 degrees
        if ( (directionInDeg > (360 - halfStep)) || directionInDeg < halfStep) {
            index = 0;
        }

        let num = index;
        if (index > 16) {
            num = 32 - index;
            return {name: 'red_boat_' + num, flipX: true};
        }
        return {name: 'red_boat_' + num, flipX: false};
    };

    public holdLeft() {
        this.controlsHold.left = true;
    }
    public holdRight() {
        this.controlsHold.right = true;
    }
    public holdUp() {
        this.controlsHold.up = true;
    }
    public holdDown() {
        this.controlsHold.down = true;
    }
    public releaseLeft() {
        this.controlsHold.left = false;
    }
    public releaseRight() {
        this.controlsHold.right = false;
    }
    public releaseUp() {
        this.controlsHold.up = false;
    }
    public releaseDown() {
        this.controlsHold.down = false;
    }

    public holdNitro() {
        this.controlsHold.nitro = true;
    }

    public releaseNitro() {
        this.controlsHold.nitro = false;
    }

    private alreadyZero = false;

    public update(time, delta) {
        if (this.hitpoints < 1) {
            this.setVisible(false);
            this.speed = 0;
            this.isNitroActive = false;
            if (!this.alreadyZero) {
                this.updateVelocities()
                this.alreadyZero = true;
            }
            return;
        }
        let tDiff = delta / 1000;
        let cursors = this.scene.input.keyboard.createCursorKeys();

        if (this.speed < 0) {
            // rear move rotate logic
            if (cursors.left.isDown || this.controlsHold.left) {
                this.direction += (this.ROTATE_SPEED * tDiff);
                if (this.direction > 360) {
                    this.direction = this.direction - 360;
                }
            } else if (cursors.right.isDown || this.controlsHold.right) {
                this.direction -= (this.ROTATE_SPEED * tDiff);
                if (this.direction < 0) {
                    this.direction = 360 - (this.direction);
                }
            }
        } else {
            // front move rotate logic
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
        this.setFrameData(config.name);

        this.flipX = config.flipX || false;
    }

    protected setFrameData(frameName: string|integer): void
    {
        let frame = this.setFrame(frameName);
        this.setBodySize(frame.width, frame.height);
    }

    protected updateVelocities() {
        let directionInRad = this.direction * Math.PI / 180;
        this.setVelocityX(this.speed * Math.sin(directionInRad));
        this.setVelocityY(-1 * this.speed * Math.cos(directionInRad));
    }

    public getDirection(): number
    {
        return this.direction;
    }

    public setDirection(direction: number): void
    {
        this.direction = direction;
    }

    public getSpeed(): number
    {
        return this.speed;
    }

    public setSpeed(speed: number): void
    {
        this.speed = speed;
    }

    public getNitroCount(): number
    {
        return this.nitroCount;
    }

    public addNitro(count: number = 1): void
    {
        this.nitroCount += count;
    }

    public hpDown(count: number = 1): void
    {
        this.hitpoints -= count;
    }

    public getHP(): number
    {
        return this.hitpoints;
    }
}
