import * as Phaser from 'phaser';
import {GameScene} from "./scenes/GameScene";
import {HelloScene} from "./scenes/HelloScene";
import Center = Phaser.Scale.Center;
import {GeneratorScene} from "./scenes/GeneratorScene";

// the game itself
let game;

window.onload = function() {
    const gameConfig: Phaser.Types.Core.GameConfig = {
        title: 'Sample',
        type: Phaser.AUTO,
        scale: {
            width: 800,
            height: 600,
            autoCenter: Center.CENTER_BOTH
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
            },
        },
        scene: [HelloScene, GameScene, GeneratorScene],
        parent: 'game',
        backgroundColor: '#000000',
        render: {
            antialias: false,
            antialiasGL: false,
        }
    };

    game = new Phaser.Game(gameConfig);
};
