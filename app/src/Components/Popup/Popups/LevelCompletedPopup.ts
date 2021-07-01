import PopupWindowType from "../PopupWindowType";

export default class LevelCompletedPopup extends PopupWindowType {
    public WIDTH: number = 350;
    public HEIGHT: number = 250;
    public ONCE_AT_TIME: boolean = true;
    public POPUP_ID: string = 'LevelCompletedPopup';

    public drawPopupContent(scene: Phaser.Scene) {
        // Отрисовать содержимое попапа в его сцене
        let headerStyle = {fontSize: '18px', fill: '#000', fontFamily: 'Arial, sans-serif'};
        let textStyle = {fontSize: '12px', fill: '#000', fontFamily: 'Arial, sans-serif'};
        scene.add.text(20, 35, 'Уровень пройден!')
            .setStyle(headerStyle);

        scene.add.text(20, 180, 'Начать следующий уровень')
            .setColor('red')
            .setBackgroundColor('white')
            .setPadding(20, 10, 20, 10)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                scene.events.emit('CLOSE_POPUP');
                scene.game.events.emit('GO_TO_NEXT_LEVEL');
            });

    }
}