import * as Phaser from "phaser";
import TextButton from "../Components/TextButton";
import GameMenuButton from "../Components/GameMenuButton";

export class HelloScene extends Phaser.Scene {
    private button: any;
    // private menuGeneratorLink: Phaser.GameObjects.Text;

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

        let header = this.add.text(centerX, 20, 'Выбери что будешь делать');
        header.setFontStyle('bold')
            .setFontSize(16)
            .setX(centerX - Math.round(header.width / 2));

        // КНОПОЧКИ
        // 1. Игра: найди и собери
        let goSearchBoxGame = new GameMenuButton(this, 150, 100, 100, 100, 'Искать клады');
        goSearchBoxGame.on('pointerdown', () => {
            this.scene.start('Game');
        });
        this.add.existing(goSearchBoxGame);

        // 2. Генератор лабиринтов
        let goMazeGenerator = new GameMenuButton(this, 150, 300, 100, 100, "Генератор \nлабиринтов");
        goMazeGenerator.on('pointerdown', () => {
            this.scene.start('Generator');
        });
        this.add.existing(goMazeGenerator);

        // this.menuGeneratorLink = this.add.text(10, 10, 'Map generator')
        //     .setColor('black')
        //     .setInteractive({useHandCursor: true})
        //     .on('pointerover', () => this.hoverText())
        //     .on('pointerout', () => this.outText())
        //     .on('pointerdown', () => this.clickText());


        // Нарисуем кнопку, при клике - вызываем сцену игры
        // this.button = this.add.circle(centerX, centerY, 25, 0x00FF00)
        //     .setInteractive({useHandCursor: true})
        //     .on('pointerover', () => this.hoverButton())
        //     .on('pointerout', () => this.outButton())
        //     .on('pointerdown', () => this.clickButton());
        //
        // this.add.polygon(centerX + 2, centerY + 15, [
        //     0,-15, 0,15, 20,0,
        // ], 0x000000);
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

    // private hoverText() {
    //     this.menuGeneratorLink.setShadow(0, 0, 'black', 5);
    // }
    //
    // private outText() {
    //     this.menuGeneratorLink.setShadow(0, 0, 'white', 0);
    // }

    private clickText() {
        this.scene.start('Generator');
    }

    public update(time, delta) {
    }
}
