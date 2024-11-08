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
        scene.add.text(20, 35, 'CONTROLS:')
            .setStyle(headerStyle);

        scene.add.text(20, 60, 'ARROW UP - Forward').setStyle(textStyle);
        scene.add.text(20, 77, 'ARROW DOWN - Backward').setStyle(textStyle);
        scene.add.text(20, 94, 'ARROW LEFT/RIGHT - Rotate').setStyle(textStyle);
        scene.add.text(20, 110, 'SPACE - Break').setStyle(textStyle);
        scene.add.text(20, 127, 'Shift - Use NITRO!').setStyle(textStyle);

        scene.add.text(20, 280, 'Go to Main Menu')
            .setColor('red')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                let r = confirm('Are you sure to exit in main menu?');
                if (r) {
                    scene.events.emit('CLOSE_POPUP');
                    scene.game.events.emit('GO_TO_MAIN_MENU');
                }
            });

    }
}