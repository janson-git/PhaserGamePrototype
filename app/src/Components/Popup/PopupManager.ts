import * as Phaser from "phaser";
import PopupWindow from "./PopupWindow";
import PopupWindowType from "./PopupWindowType";

export default class PopupManager {
    protected static popupCount: number = 0;
    protected static openedPopups: {[key: string]: string} = {}; // PopupID->handle
    protected static openedHandles: {[key: string]: string} = {}; // handle->PopupID

    public static createWindow (scene: Phaser.Scene, popup: PopupWindowType) {
        // ЕСЛИ ПЕРЕДАННЫЙ ПОПАП ДОЛЖЕН БЫТЬ ОТКРЫТ ТОЛЬКО ОДИН РАЗ И УЖЕ ОТКРЫТ - ВЫХОДИМ
        if (popup.ONCE_AT_TIME === true && this.openedPopups[popup.POPUP_ID]) {
            return;
        }

        var x = (scene.sys.game.scale.width / 2) - (popup.WIDTH / 2);
        var y = scene.sys.game.scale.height / 2 - popup.HEIGHT / 2;

        var windowID = 'window' + this.popupCount++;

        var win = scene.add.zone(x, y, popup.WIDTH, popup.HEIGHT)
            .setInteractive({useHandCursor: true})
            .setOrigin(0);
        var demo = new PopupWindow(popup, windowID, win);

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
    }

    public static closeWindow(windowId: string) {
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
    }
}