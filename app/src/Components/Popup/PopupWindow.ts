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
        let bMargin = 5; // border margin
        let bWidth = 2; // border width

        // фон и рамка окна
        this.add.rectangle(0, 0, this.WIDTH, this.HEIGHT,0xcccccc)
            .setOrigin(0);
        this.add.rectangle(bMargin, bMargin, this.WIDTH - (2 * bMargin), this.HEIGHT - (2 * bMargin),0x000000)
            .setOrigin(0);
        this.add.rectangle(bMargin + bWidth, bMargin + bWidth, this.WIDTH - (2 * (bMargin + bWidth)), this.HEIGHT - (2 * (bMargin + bWidth)),0xcccccc)
            .setOrigin(0);

        // кнопка закрытия окна
        this.add.rectangle(this.WIDTH - 18, 4, 14, 14, 0xcccccc)
            .setOrigin(0)
            .setInteractive({useHandCursor: true})
            .on('pointerup', () => {
                this.scene.stop(this.handle);
                PopupManager.closeWindow(this.parentScene, this.handle);
            });

        this.add.line(this.WIDTH - 16, 4, 0, 0, 12, 12, 0x000000)
            .setOrigin(0);
        this.add.line(this.WIDTH - 16, 4, 0, 12, 12, 0, 0x000000)
            .setOrigin(0);


        // содержимое окна
        this.popup.drawPopupContent(this);

        this.cameras.main.setViewport(this.parent.x, this.parent.y, this.WIDTH, this.HEIGHT);

        // если из попапа выбросили событие с требованием закрыть попап
        this.events.on('CLOSE_POPUP', () => {
            this.scene.stop(this.handle);
            PopupManager.closeWindow(this.parentScene, this.handle);
        });

    }

    update () {

    }

    refresh () {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);
        this.scene.bringToTop();
    }
}
