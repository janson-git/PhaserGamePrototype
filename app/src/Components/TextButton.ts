import * as Phaser from "phaser";
import TextStyle = Phaser.GameObjects.TextStyle;

export default class TextButton extends Phaser.GameObjects.Text
{
    public x;
    public y;
    public text: string;

    private defaultTextColor: string;
    private hoverTextColor: string;
    private activeTextColor: string;

    constructor(scene: Phaser.Scene, x: number, y: number, text: string, style?: TextStyle)
    {
        super(scene, x, y, text, style);

        this.defaultTextColor = '#fff';
        this.hoverTextColor = '#0ff';
        this.activeTextColor = '#ff0';

        this.setFontSize(10);
        this.setShadow(0, 0, 'black', 5);

        this.setStyle({fill: this.defaultTextColor});

        this.setInteractive({useHandCursor: true})
            .on('pointerover', () => this.buttonHoverState())
            .on('pointerout', () => this.buttonRestState())
            .on('pointerdown', () => this.buttonActiveState())
            .on('pointerup', () => this.buttonHoverState());
    }

    public buttonHoverState() {
        this.setStyle({fill: this.hoverTextColor});
    }

    public buttonRestState() {
        this.setStyle({fill: this.defaultTextColor});
    }

    public buttonActiveState() {
        this.setStyle({fill: this.activeTextColor});
    }
}