import * as Phaser from 'phaser';
import {GameScene} from "./scenes/GameScene";
import {HelloScene} from "./scenes/HelloScene";
import Center = Phaser.Scale.Center;

// the game itself
let game;

window.onload = function() {
    const gameConfig: Phaser.Types.Core.GameConfig = {
        title: 'Sample',
        type: Phaser.AUTO,
        scale: {
            width: 500,
            height: 400,
            autoCenter: Center.CENTER_BOTH
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: true,
            },
        },
        scene: [HelloScene, GameScene],
        parent: 'game',
        backgroundColor: '#aaaaff',
    };

    game = new Phaser.Game(gameConfig);
};
