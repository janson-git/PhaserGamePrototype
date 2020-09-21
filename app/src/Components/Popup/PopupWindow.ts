import * as Phaser from "phaser";
import PopupManager from "./PopupManager";
import PopupWindowType from "./PopupWindowType";
import {SceneBase} from "../../scenes/SceneBase";

export default class PopupWindow extends SceneBase {
    protected WIDTH: number;
    protected HEIGHT: number;

    private parentScene: SceneBase;
    private popup: PopupWindowType;
    private parent;
    private handle;

    constructor (parentScene: SceneBase, popup: PopupWindowType, handle, parent) {
        const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
            active: false,
            visible: false,
            key: handle,
        };
        super(sceneConfig);

        this.parentScene = parentScene;
        this.popup = popup;
        this.handle = handle;
        this.parent = parent;
        this.WIDTH = popup.WIDTH;
        this.HEIGHT = popup.HEIGHT;
    }

    create () {
        // фон и рамка окна
        this.add.rectangle(0, 0, this.WIDTH, this.HEIGHT,0xcccccc)
            .setOrigin(0);
        this.add.rectangle(5, 5, this.WIDTH - 10, this.HEIGHT - 10,0x000000)
            .setOrigin(0);
        this.add.rectangle(8, 8, this.WIDTH - 16, this.HEIGHT - 16,0xcccccc)
            .setOrigin(0);

        // кнопка закрытия окна
        this.add.rectangle(this.WIDTH - 30, 10, 20, 20, 0xFF0000)
            .setOrigin(0)
            .setInteractive({useHandCursor: true})
            .on('pointerup', () => {
                this.scene.stop(this.handle);
                PopupManager.closeWindow(this.parentScene, this.handle);
            });

        // содержимое окна
        this.popup.drawPopupContent(this);

        this.cameras.main.setViewport(this.parent.x, this.parent.y, this.WIDTH, this.HEIGHT);
    }

    update () {

    }

    refresh () {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);
        this.scene.bringToTop();
    }
}
