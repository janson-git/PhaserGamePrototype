import PopupWindowType from "../PopupWindowType";

export default class SettingsPopup extends PopupWindowType {
    public WIDTH: number = 250;
    public HEIGHT: number = 350;
    public ONCE_AT_TIME: boolean = true;
    public POPUP_ID: string = 'SettingsPopup';

    public drawPopupContent(scene: Phaser.Scene) {
        // Отрисовать содержимое попапа в его сцене
        scene.add.text(20, 20, 'Настройки будут тут')
            .setColor('black');
    }
}