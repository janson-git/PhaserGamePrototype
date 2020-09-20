
export default class PopupWindowType {
    public WIDTH: number = 250;
    public HEIGHT: number = 60;
    public ONCE_AT_TIME: boolean = true;
    public POPUP_ID: string = 'PopupID';

    public drawPopupContent(scene: Phaser.Scene) {
        // Отрисовать содержимое попапа в его сцене
        scene.add.text(20, 20, 'Ой! Базовый PopupWindowType!')
            .setColor('black');
    }
}