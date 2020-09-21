import * as Phaser from "phaser";
import PopupWindow from "./PopupWindow";
import PopupWindowType from "./PopupWindowType";
import {SceneBase} from "../../scenes/SceneBase";

export default class PopupManager {
    protected static popupCount: number = 0;
    protected static openedPopups: {[key: string]: string} = {}; // PopupID->handle
    protected static openedHandles: {[key: string]: string} = {}; // handle->PopupID
    protected static isPausedGame: boolean = false; // если при открытии нужно заморозить игру

    public static createWindow (scene: SceneBase, popup: PopupWindowType) {
        // ЕСЛИ ПЕРЕДАННЫЙ ПОПАП ДОЛЖЕН БЫТЬ ОТКРЫТ ТОЛЬКО ОДИН РАЗ И УЖЕ ОТКРЫТ - ВЫХОДИМ
        if (popup.ONCE_AT_TIME === true && this.openedPopups[popup.POPUP_ID]) {
            return;
        }

        if (popup.SET_PAUSE === true) {
            this.isPausedGame = true;
        }

        var x = (scene.gameWidth / 2) - (popup.WIDTH / 2);
        var y = scene.gameHeight / 2 - popup.HEIGHT / 2;

        var windowID = 'window' + this.popupCount++;

        var win = scene.add.zone(x, y, popup.WIDTH, popup.HEIGHT)
            .setInteractive({useHandCursor: true})
            .setOrigin(0);
        var demo = new PopupWindow(scene, popup, windowID, win);

        // TODO: разобраться почему DRAG'N'DROP не работает
        scene.input.setDraggable(win);

        win.on('drag', (pointer, dragX, dragY) => {
            win.x = dragX;
            win.y = dragY;

            console.log('drag');
            demo.refresh()
        });

        scene.scene.add(windowID, demo, true);

        // чтобы потом суметь закрыть открытый попап, и проверить, может уже открывали
        this.openedPopups[popup.POPUP_ID] = windowID;
        this.openedHandles[windowID] = popup.POPUP_ID;

        if (this.isPausedGame) {
            scene.scene.pause();
        }
    }

    public static closeWindow(scene: SceneBase, windowId: string) {
        let popupId = this.openedHandles[windowId];

        // reduce, чтобы собрать новый список, без переданного windowId
        this.openedHandles = Object.entries(this.openedHandles).reduce((newObj, [key, val]) => {
            if (key === windowId) {
                return newObj;
            }
            return {
                ...newObj,
                [key]: val,
            }
        }, {});
        // reduce, чтобы собрать новый список, без убранного ранее popupId
        this.openedPopups = Object.entries(this.openedPopups).reduce((newObj, [key, val]) => {
            if (key === popupId) {
                return newObj;
            }
            return {
                ...newObj,
                [key]: val,
            }
        }, {});

        // если не осталось блокирующих попапов - снимаем паузу
        if (Object.entries(this.openedPopups).length === 0) {
            scene.scene.resume();
        }
    }
}