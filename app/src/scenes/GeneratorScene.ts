import * as Phaser from "phaser";
import Tree from "../Components/Tree";
import Room from "../Components/Room";
import Corridor from "../Components/Corridor";
import TextButton from "../Components/TextButton";
import CellularAutomate from "../lib/CellularAutomate";
import Graphics = Phaser.GameObjects.Graphics;
import KeyGenerator from "../lib/KeyGenerator";
import BSPMazeGenerator from "../lib/BSPMazeGenerator";
import MathUtils from "../lib/MathUtils";

export class GeneratorScene extends Phaser.Scene {
    private readonly MAP_WIDTH: number;
    private readonly MAP_HEIGHT: number;

    private zones: Tree[];
    private rooms: Room[];
    private corridors: Corridor[];
    private debugMarks: Phaser.GameObjects.Text[];

    private generateButton: TextButton;
    private showMarksButton: TextButton;
    private getScreenshotButton: TextButton;
    private nextIterationButton: TextButton;
    private isDebugMarksVisible: boolean;

    private mapGenerator: BSPMazeGenerator;

    private cellularAutomate: CellularAutomate;
    private graphicsForMap: Graphics;

    constructor() {
        const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
            active: false,
            visible: false,
            key: 'Generator'
        };

        super(sceneConfig);

        this.MAP_WIDTH = 120;
        this.MAP_HEIGHT = 120;

        this.zones = [];
        this.rooms = [];
        this.corridors = [];
        this.debugMarks = [];
    }

    public preload() {
    }

    public create() {
        this.mapGenerator = new BSPMazeGenerator();
        this.mapGenerator.generateMap(this.MAP_WIDTH, this.MAP_HEIGHT);

        this.zones = this.mapGenerator.getZones();
        this.rooms = this.mapGenerator.getRooms();
        this.corridors = this.mapGenerator.getCorridors();

        // отрисуем зоны, комнаты из коридоры
        this.drawMap();

        // КНОПОЧКИ
        // кнопочка перегенерации карты
        this.generateButton = new TextButton(this, 5, 5, 'Generate');
        this.generateButton.setFontSize(12).setDepth(10);
        this.generateButton.on('pointerdown', () => this.restartScene());
        this.add.existing(this.generateButton);
        // кнопочка скрыть/показать метки комнат и корридоров
        this.showMarksButton = new TextButton(this, 70, 5, 'Show marks');
        this.showMarksButton.setFontSize(12).setDepth(10);
        this.showMarksButton.on('pointerdown', () => this.toggleMarks());
        this.add.existing(this.showMarksButton);
        // кнопочка скачать скриншот
        this.getScreenshotButton = new TextButton(this, 150, 5, 'Screenshot');
        this.getScreenshotButton.setFontSize(12).setDepth(10);
        this.getScreenshotButton.on('pointerdown', () => {
            this.game.renderer.snapshot(function (image:HTMLImageElement) {
                // console.log(image);
                GeneratorScene.exportCanvasAsPNG('snapshot', image.src);
            });
        });
        this.add.existing(this.getScreenshotButton);

        // кнопочка запуска клеточного автомата
        this.nextIterationButton = new TextButton(this, 250, 5, 'Iterate Map Filter');
        this.nextIterationButton.setFontSize(12).setDepth(10);
        this.nextIterationButton.on('pointerdown', () => {
            this.nextCellularAutomateIteration();
        });
        this.add.existing(this.nextIterationButton);

        // кнопочка запуска клеточного автомата
        let getDumpButton = new TextButton(this, 400, 5, 'Get dump')
            .setFontSize(12)
            .on('pointerdown', () => {
                this.getMapDump();
            });
        this.add.existing(getDumpButton);
    }

    public restartScene() {
        this.zones = [];
        this.rooms = [];
        this.corridors = [];
        KeyGenerator.resetAll();
        this.cellularAutomate = null;
        this.mapGenerator = null;

        this.scene.restart();
    }

    public toggleMarks() {
        this.isDebugMarksVisible = !this.isDebugMarksVisible;
        this.debugMarks.forEach((mark:Phaser.GameObjects.Text) => {
            mark.setVisible(this.isDebugMarksVisible);
        });
    }

    public update(time, delta) {
    }

    public static exportCanvasAsPNG(fileName, dataUrl) {
        var MIME_TYPE = "image/png";
        var imgURL = dataUrl;
        var dlLink = document.createElement('a');
        dlLink.download = fileName;
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }

    private drawMap() {
        // и теперь для всех комнат и коридоров для дебага можно отрисовать их метки
        // поверх уже нарисованной карты
        // ЗОНЫ
        // this.zones.forEach((tree: Tree) => {
        //     // отрисуем зону
        //     this.add.rectangle(
        //         tree.x + (tree.width/2), tree.y + (tree.height/2),
        //         tree.width - 2, tree.height - 2,
        //         0x0000FF,
        //         .2
        //     );
        //     this.add.text(
        //         tree.x, tree.y,
        //         `${tree.id}`
        //     ).setColor('yellow').setFontSize(10);
        // });
        // КОМНАТЫ
        this.rooms.forEach((room: Room) => {
            // при отрисовке на поле, позиционирование происходит по центру спрайта/фигуры
            this.add.rectangle(
                room.x + (room.width / 2), room.y + (room.height / 2),
                room.width, room.height,
                0xFFFFFF
            );

            let mark = this.add.text(
                room.x, room.y,
                `${room.id}`
            ).setColor('green').setFontSize(10).setVisible(this.isDebugMarksVisible).setDepth(10);
            this.debugMarks.push(mark);
        });
        // КОРИДОРЫ
        this.corridors.forEach((corridor: Corridor) => {
            this.add.rectangle(
                corridor.x + (corridor.width / 2), corridor.y + (corridor.height / 2),
                corridor.width, corridor.height,
                0xFFFFFF
            );

            let mark = this.add.text(
                corridor.x + corridor.width / 2, corridor.y + corridor.height / 2,
                `${corridor.id}`
            ).setColor('black').setBackgroundColor('yellow').setFontSize(10).setVisible(this.isDebugMarksVisible).setDepth(10);
            this.debugMarks.push(mark);
        });
    }

    /**
     * Запускаем итерации клеточного автомата по нашей карте
     */
    private nextCellularAutomateIteration() {
        if (this.graphicsForMap instanceof Graphics) {
            this.graphicsForMap.clear();
            this.mapGenerator.runFilterIteration();
            this.mapGenerator.renderMap(this.graphicsForMap);
        } else {
            this.graphicsForMap = this.add.graphics();
            this.mapGenerator.renderMap(this.graphicsForMap);
        }
    }

    private getMapDump() {
        let map = this.mapGenerator.getMap();
        console.log('MAP DUMP: ', map.slice(0, 10));

        let textarea: HTMLTextAreaElement = document.getElementById('textarea') as HTMLTextAreaElement;
        if (!textarea) {
            textarea = document.createElement('textarea');
            textarea.setAttribute('id', 'textarea');
        }
        textarea.cols = 150;
        textarea.rows = 10;
        textarea.value = map.toString();

        document.body.append(textarea);
    }
}
