import * as Phaser from 'phaser';
import {MyGame} from "./Game";
import {ObjectUtils} from "./lib/utils/ObjectUtils";
import {Config} from "./Config";

namespace App {
    // game
    export let game: Phaser.Game = null;
}

// -------------------------------------------------------------------------
async function launch(): Promise<void> {
    // load main game config
    let configJson: any = null;
    try {
        configJson = await ObjectUtils.loadJson("assets/config.json");
        ObjectUtils.loadValuesIntoObject(configJson, Config);
    } catch (e) {
        throw e;
    }
    App.game = new MyGame;
}

window.onload = launch;
