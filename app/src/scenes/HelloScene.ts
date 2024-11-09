import * as Phaser from "phaser";
import GameMenuButton from "../Components/GameMenuButton";
import {SceneBase} from "./SceneBase";

declare const VERSION;

export class HelloScene extends SceneBase {

    constructor() {
        console.log("HelloScene");
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
        let centerX = this.gameWidth / 2;
        let centerY = this.gameHeight / 2;

        let header = this.add.text(centerX, 20, 'SELECT MODE');
        header.setFontStyle('bold')
            .setFontSize(16)
            .setX(centerX - Math.round(header.width / 2));

        // КНОПОЧКИ
        // 1. Игра: найди и собери
        let goSearchBoxGame = new GameMenuButton(this, 150, 100, 100, 100, "Search \ntreasures");
        goSearchBoxGame.on('pointerdown', () => {
            this.scene.start('Game');
        });
        this.add.existing(goSearchBoxGame);

        // 2. Генератор лабиринтов
        let goMazeGenerator = new GameMenuButton(this, 150, 300, 100, 100, "Maze \ngenerator");
        goMazeGenerator.on('pointerdown', () => {
            this.scene.start('Generator');
        });
        this.add.existing(goMazeGenerator);

        let textStyle = {fontSize: '11px', fill: '#fff', fontFamily: 'Arial, sans-serif'};
        let versionText = this.add.text(
                centerX,
                this.gameHeight - 20,
                'Version: ' + VERSION,
                textStyle
            )
            .setScrollFactor(0);
        versionText.setX(centerX - Math.round(versionText.width / 2))
    }

    public update(time, delta) {
    }
}
