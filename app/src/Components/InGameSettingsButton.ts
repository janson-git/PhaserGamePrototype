import * as Phaser from "phaser";

export default class InGameSettingsButton extends Phaser.GameObjects.Container
{
    public x;
    public y;
    public buttonBg: Phaser.GameObjects.Rectangle;

    private readonly defaultBgColor: number;
    private readonly hoverBgColor: number;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number)
    {
        super(scene, x, y);

        this.defaultBgColor = 0xFFFF99;
        this.hoverBgColor = 0x99FFFF;

        this.buttonBg = scene.add.rectangle(0, 0, width, height, this.defaultBgColor)
            .setStrokeStyle(1, 0x000);
        let buttonIcon = scene.add.image(0, 0, 'settingsIcon');

        this.add([this.buttonBg, buttonIcon])
            .setSize(width, height)
            .setInteractive({useHandCursor: true});

        this.on('pointerover', () => this.buttonHoverState())
            .on('pointerout', () => this.buttonRestState());

        scene.add.existing(this);
    }

    public buttonHoverState() {
        this.buttonBg.setFillStyle(this.hoverBgColor);
    }

    public buttonRestState() {
        this.buttonBg.setFillStyle(this.defaultBgColor);
    }
}