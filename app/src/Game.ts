import {HelloScene} from "./scenes/HelloScene";
import {GameScene} from "./scenes/GameScene";
import {GeneratorScene} from "./scenes/GeneratorScene";
import Center = Phaser.Scale.Center;
import {Boot} from "./scenes/Boot";
import {Preloader} from "./scenes/Preloader";
import {Config} from "./Config";

export class MyGame extends Phaser.Game {
    // --------------------------------------------------------------------
    constructor() {
        console.log("MyGame");
        // default renderer
        let renderer: number = Phaser.AUTO;

        // init game
        super(
            {
                type: renderer,

                parent: "game",

                width: Config.GAME_WIDTH,
                height: Config.GAME_HEIGHT,
                scale: {
                    autoCenter: Center.CENTER_HORIZONTALLY
                },
                title: "Boat Game Prototype",
                backgroundColor: '#000000',
                physics: {
                    default: 'arcade',
                    arcade: {
                        debug: false,
                    },
                },
                render: {
                    antialias: false,
                    antialiasGL: false,
                }
            }
        );

        // states
        this.scene.add("Boot", Boot);
        this.scene.add("Preloader", Preloader);
        this.scene.add("Hello", HelloScene);
        this.scene.add("Game", GameScene);
        this.scene.add("Generator", GeneratorScene);

        // start
        this.scene.start("Boot");
    }
}
