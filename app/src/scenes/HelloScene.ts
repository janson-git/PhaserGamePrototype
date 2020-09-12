import * as Phaser from "phaser";
import GameMenuButton from "../Components/GameMenuButton";

export class HelloScene extends Phaser.Scene {

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
    }

    public update(time, delta) {
    }
}
