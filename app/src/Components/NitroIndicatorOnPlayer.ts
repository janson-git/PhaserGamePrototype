import * as Phaser from "phaser";
import {Player} from "./Player";
import Sprite = Phaser.GameObjects.Sprite;
import Arc = Phaser.GameObjects.Arc;

export class NitroIndicatorOnPlayer extends Phaser.GameObjects.Container {

    private player;
    private indicator: Phaser.GameObjects.Graphics;

    private RADIUS: number = 25;

    constructor(scene: Phaser.Scene, player: Player) {
        super(scene, player.x, player.y);

        this.player = player;
        this.indicator = scene.add.graphics();

        this.setDepth(this.player.depth + 1);
        this.scene.add.existing(this);
    }

    public update(time, delta) {
        this.indicator.clear();

        if (!this.player.isNitroActive) {
            this.setVisible(false);
            return;
        }
        if (this.visible === false) {
            this.setVisible(true);
        }

        let nitroDuration = this.player.NITRO_DURATION_IN_SEC * 1000;
        let nitroTimeLeft = nitroDuration - (time - this.player.nitroActivatedTime);

        // calc arc angle to draw
        let percentTimeLeft = (nitroTimeLeft / nitroDuration);
        let indicatorArcEndInDeg = 360 * percentTimeLeft;

        if (nitroTimeLeft > 0) {
            this.indicator.lineStyle(3, 0xff3300, 0.8);
            this.indicator.setPosition(this.player.x, this.player.y);
            this.indicator.beginPath()
                .arc(
                    0,
                    0,
                    this.RADIUS,
                    Phaser.Math.DegToRad(0),
                    Phaser.Math.DegToRad(indicatorArcEndInDeg),
                    false
                );
            this.indicator.strokePath();
        }
    }

}
