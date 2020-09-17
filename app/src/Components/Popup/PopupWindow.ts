import * as Phaser from "phaser";

export default class PopupWindow extends Phaser.Scene {
    protected WIDTH: number;
    protected HEIGHT: number;

    private parent;
    private left;
    private right;
    private leftTarget;
    private rightTarget;
    private leftBase;
    private rightBase;
    private mid;

    constructor (handle, parent) {
        const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
            active: false,
            visible: false,
            key: handle,
        };
        super(sceneConfig);

        this.parent = parent;
        this.WIDTH = 400;
        this.HEIGHT = 300;
        //
        // this.left;
        // this.right;
        //
        // this.leftTarget;
        // this.rightTarget;
        //
        // this.leftBase;
        // this.rightBase;

        this.mid = new Phaser.Math.Vector2();
    }

    create () {
        var bg = this.add.rectangle(0, 0, this.WIDTH, this.HEIGHT,0xcccccc);//.setOrigin(0);

        this.cameras.main.setViewport(this.parent.x, this.parent.y, this.WIDTH, this.HEIGHT);

        this.left = this.add.circle(46, 92, 10, 0x000000);
        this.right = this.add.circle(140, 92, 10, 0x000000);

        this.leftTarget = new Phaser.Geom.Line(this.left.x, this.left.y, 0, 0);
        this.rightTarget = new Phaser.Geom.Line(this.right.x, this.right.y, 0, 0);

        this.leftBase = new Phaser.Geom.Ellipse(this.left.x, this.left.y, 24, 40);
        this.rightBase = new Phaser.Geom.Ellipse(this.right.x, this.right.y, 24, 40);
    }

    update () {
        this.leftTarget.x2 = this.input.activePointer.x - this.parent.x;
        this.leftTarget.y2 = this.input.activePointer.y - this.parent.y;

        //  Within the left eye?
        if (this.leftBase.contains(this.leftTarget.x2, this.leftTarget.y2)) {
            this.mid.x = this.leftTarget.x2;
            this.mid.y = this.leftTarget.y2;
        } else {
            Phaser.Geom.Ellipse.CircumferencePoint(this.leftBase, Phaser.Geom.Line.Angle(this.leftTarget), this.mid);
        }

        this.left.x = this.mid.x;
        this.left.y = this.mid.y;

        this.rightTarget.x2 = this.input.activePointer.x - this.parent.x;
        this.rightTarget.y2 = this.input.activePointer.y - this.parent.y;

        //  Within the right eye?
        if (this.rightBase.contains(this.rightTarget.x2, this.rightTarget.y2)) {
            this.mid.x = this.rightTarget.x2;
            this.mid.y = this.rightTarget.y2;
        } else {
            Phaser.Geom.Ellipse.CircumferencePoint(this.rightBase, Phaser.Geom.Line.Angle(this.rightTarget), this.mid);
        }

        this.right.x = this.mid.x;
        this.right.y = this.mid.y;
    }

    refresh () {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);
        this.scene.bringToTop();
    }
}
