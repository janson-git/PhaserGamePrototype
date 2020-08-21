import * as Phaser from "phaser";

export class HelloScene extends Phaser.Scene {
    private button: any;

    constructor() {
        const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
            active: false,
            visible: false,
            key: 'Hello',
        };

        super(sceneConfig);
    }

    public preload() {

    }

    public create() {
        let centerX = this.game.scale.width / 2;
        let centerY = this.game.scale.height / 2;

        // Нарисуем кнопку, при клике - вызываем сцену игры
        this.button = this.add.circle(centerX, centerY, 25, 0x00FF00)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.hoverButton())
            .on('pointerout', () => this.outButton())
            .on('pointerdown', () => this.clickButton());

        this.add.polygon(centerX + 2, centerY + 15, [
            0,-15, 0,15, 20,0,
        ], 0x000000);
    }

    private hoverButton() {
        this.button.setFillStyle(0xFFFF00);
    }

    private outButton() {
        this.button.setFillStyle(0x00FF00);
    }

    private clickButton() {
        this.scene.start('Game');
    }

    public update(time, delta) {
    }
}
