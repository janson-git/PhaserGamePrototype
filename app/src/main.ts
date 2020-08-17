import * as Phaser from 'phaser';
import {GameScene} from "./scenes/GameScene";

// the game itself
let game;

window.onload = function() {
    const gameConfig: Phaser.Types.Core.GameConfig = {
        title: 'Sample',
        type: Phaser.AUTO,
        scale: {
            width: 800,
            height: 600,
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: true,
            },
        },
        scene: [GameScene],
        parent: 'game',
        backgroundColor: '#aaaaff',
    };

    game = new Phaser.Game(gameConfig);
};
