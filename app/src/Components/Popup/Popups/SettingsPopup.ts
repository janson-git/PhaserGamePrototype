import PopupWindowType from "../PopupWindowType";

export default class SettingsPopup extends PopupWindowType {
    public WIDTH: number = 250;
    public HEIGHT: number = 350;
    public ONCE_AT_TIME: boolean = true;
    public POPUP_ID: string = 'SettingsPopup';

    public drawPopupContent(scene: Phaser.Scene) {
        // Отрисовать содержимое попапа в его сцене
        let headerStyle = {fontSize: '18px', fill: '#000', fontFamily: 'Arial, sans-serif'};
        let textStyle = {fontSize: '12px', fill: '#000', fontFamily: 'Arial, sans-serif'};
        scene.add.text(20, 35, 'Управление')
            .setStyle(headerStyle);

        scene.add.text(20, 60, 'Вверх - ускорение').setStyle(textStyle);
        scene.add.text(20, 77, 'Вниз - движение назад').setStyle(textStyle);
        scene.add.text(20, 94, 'Право/Лево - поворот').setStyle(textStyle);
        scene.add.text(20, 110, 'Пробел - торможение').setStyle(textStyle);
        scene.add.text(20, 127, 'Shift - НИТРО!').setStyle(textStyle);
    }
}