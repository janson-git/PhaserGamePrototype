import * as Phaser from "phaser";

export default class SelectGameButton extends Phaser.GameObjects.Container
{
    public x;
    public y;
    public buttonText: Phaser.GameObjects.Text;
    public buttonBg: Phaser.GameObjects.Rectangle;

    private readonly defaultBgColor: number;
    private readonly hoverBgColor: number;

    private defaultTextColor: string;
    private hoverTextColor: string;
    private activeTextColor: string;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, text: string)
    {
        super(scene, x, y);

        this.defaultBgColor = 0xFFFF99;
        this.hoverBgColor = 0x99FFFF;

        this.defaultTextColor = '#fff';
        this.hoverTextColor = '#0ff';
        this.activeTextColor = '#ff0';


        this.buttonBg = scene.add.rectangle(0, 0, width, height, this.defaultBgColor)
            .setStrokeStyle(5, 0x9FF);
        this.buttonText = scene.add.text(0, 0, text)
            .setColor('#000000')
            .setFontSize(12)
            .setFontStyle('bold');
        // А теперь отцентруем текст на кнопке, с учётом его получившейся ширины
        let textCenter = this.buttonText.getCenter();
        this.buttonText.setX(Math.round(-textCenter.x));
        this.buttonText.setY(Math.round(-textCenter.y));

        this.add([this.buttonBg, this.buttonText])
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