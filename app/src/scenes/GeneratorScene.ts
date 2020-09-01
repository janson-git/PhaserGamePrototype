import * as Phaser from "phaser";
import Tree from "../Components/Tree";
import Room from "../Components/Room";
import Corridor from "../Components/Corridor";
import TextButton from "../Components/TextButton";
import CellularAutomate from "../lib/CellularAutomate";
import Graphics = Phaser.GameObjects.Graphics;

class KeyGenerator {
    private static key: number = 1;
    private static prefixedKeys: object = {};

    public static getNextKey(prefix?: string): string
    {
        let keyToReturn: string;
        if (prefix === undefined) {
            keyToReturn = '' + KeyGenerator.key;
            KeyGenerator.key++;
            return keyToReturn;
        }

        if (!KeyGenerator.prefixedKeys.hasOwnProperty(prefix)) {
            KeyGenerator.prefixedKeys[prefix] = 1;
        }
        keyToReturn = prefix + KeyGenerator.prefixedKeys[prefix];
        KeyGenerator.prefixedKeys[prefix]++;

        return keyToReturn;
    }

    public static resetAll(): void
    {
        KeyGenerator.key = 1;
        KeyGenerator.prefixedKeys = {};
    }
}

export class GeneratorScene extends Phaser.Scene {
    private readonly MAP_WIDTH: number;
    private readonly MAP_HEIGHT: number;

    private readonly MAX: number;
    private readonly MIN_ROOM_SIZE: number;
    private readonly MIN_ROOM_MARGIN: number;
    private readonly CORRIDOR_WIDTH: number;
    private readonly SPLIT_FROM: number;
    private readonly SPLIT_TO: number;

    private zones: Tree[];
    private rooms: Room[];
    private corridors: Corridor[];
    private debugMarks: Phaser.GameObjects.Text[];

    private generateButton: TextButton;
    private showMarksButton: TextButton;
    private getScreenshotButton: TextButton;
    private nextIterationButton: TextButton;
    private isDebugMarksVisible: boolean;

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

        this.MAX = 50; // максимальный размер зоны - если больше, то можно делить
        // минимальный размер комнаты удобно делать больше 50%. Тогда при соединении
        // всегда рисуем коридор посередине и попадаем куда надо :)
        this.MIN_ROOM_SIZE = 70; // в процентах от размера зоны
        this.MIN_ROOM_MARGIN = 5; // комната не должна быть к краю зоны ближе чем это значение
        this.CORRIDOR_WIDTH = 4;
        this.SPLIT_FROM = 20; // ограничение по разделению на зоны, не ближе чем 30% от одной стены
        this.SPLIT_TO = 80; // ограничение по разделению на зоны, не ближе чем 70% от другой стены

        this.zones = [];
        this.rooms = [];
        this.corridors = [];
        this.debugMarks = [];
    }

    public preload() {
    }

    public create() {
        this.generateNewMap();

        // КНОПОЧКИ
        // кнопочка перегенерации карты
        this.generateButton = new TextButton(this, 5, 5, 'Generate');
        this.generateButton.setFontSize(12);
        this.generateButton.on('pointerdown', () => this.restartScene());
        this.add.existing(this.generateButton);
        // кнопочка скрыть/показать метки комнат и корридоров
        this.showMarksButton = new TextButton(this, 70, 5, 'Show marks');
        this.showMarksButton.setFontSize(12);
        this.showMarksButton.on('pointerdown', () => this.toggleMarks());
        this.add.existing(this.showMarksButton);
        // кнопочка скачать скриншот
        this.getScreenshotButton = new TextButton(this, 150, 5, 'Screenshot');
        this.getScreenshotButton.setFontSize(12);
        this.getScreenshotButton.on('pointerdown', () => {
            this.game.renderer.snapshot(function (image:HTMLImageElement) {
                // console.log(image);
                GeneratorScene.exportCanvasAsPNG('snapshot', image.src);
            });
        });
        this.add.existing(this.getScreenshotButton);

        // кнопочка запуска клеточного автомата
        this.nextIterationButton = new TextButton(this, 250, 5, 'Iterate Map Filter');
        this.nextIterationButton.setFontSize(12);
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
        this.rooms = [];
        this.corridors = [];
        KeyGenerator.resetAll();
        this.cellularAutomate = null;

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

    private generateNewMap() {
        let startTree = new Tree(this.MAP_WIDTH,this.MAP_HEIGHT);
        startTree.x = 0;
        startTree.y = 0;
        startTree.id = 'T' + KeyGenerator.getNextKey();
        this.zones.push(startTree);

        // сгенерируем дерево
        let tree = this.generate(startTree);
        this.createRooms(tree);

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
        if (!(this.cellularAutomate instanceof CellularAutomate)) {
            // init
            this.cellularAutomate = new CellularAutomate(
                this.MAP_WIDTH,
                this.MAP_HEIGHT,
                this.rooms,
                this.corridors
            );
            this.cellularAutomate.initializeMap();
            this.graphicsForMap = this.add.graphics();
            this.cellularAutomate.renderMap(this.graphicsForMap);
        } else {
            this.cellularAutomate.run();
            this.graphicsForMap.clear();
            this.cellularAutomate.renderMap(this.graphicsForMap);
        }
    }

    private getMapDump() {
        let map = this.cellularAutomate.getMap();
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

    private getRandomIntegerBetween(from: number, to: number): number {
        return Math.floor((Math.random() * (to - from + 1)) + from);
    }

    private getSplitSizes(size) : Array<number> {
        let splitMin = size / 100 * this.SPLIT_FROM;
        let splitMax = size / 100 * this.SPLIT_TO;
        let point = this.getRandomIntegerBetween(splitMin, splitMax);
        return [point, size - point];
    }

    private generate(tree: Tree) {
        let splitType;
        // если не делится, просто возвращаемся сразу
        if (tree.width < this.MAX && tree.height < this.MAX) {
            return tree;
        }
        if (tree.width > this.MAX && tree.height > this.MAX) {
            // get random split type
            let array = ['vertical', 'horizontal'];
            splitType = array[Math.floor(Math.random() * array.length)];
        } else {
            splitType = tree.width > this.MAX ? 'vertical' : 'horizontal';
        }

        let leftSize, rightSize;
        let leftTree, rightTree;
        if (splitType === 'vertical') {
            if (tree.width > this.MAX) {
                [leftSize, rightSize] = this.getSplitSizes(tree.width);
                leftTree = new Tree(leftSize, tree.height);
                rightTree = new Tree(rightSize, tree.height);

                leftTree.x = tree.x;
                leftTree.y = tree.y;
                rightTree.x = tree.x + leftSize;
                rightTree.y = tree.y;
            }
        } else {
            if (tree.height > this.MAX) {
                [leftSize, rightSize] = this.getSplitSizes(tree.height);
                leftTree = new Tree(tree.width, leftSize);
                rightTree = new Tree(tree.width, rightSize);

                leftTree.x = tree.x;
                leftTree.y = tree.y;
                rightTree.x = tree.x;
                rightTree.y = tree.y + leftSize;
            }
        }

        if (leftTree instanceof Tree) {
            leftTree.id = 'T' + KeyGenerator.getNextKey();
            this.zones.push(leftTree);
            tree.left = this.generate(leftTree);
        }
        if (rightTree instanceof Tree) {
            rightTree.id = 'T' + KeyGenerator.getNextKey();
            this.zones.push(rightTree);
            tree.right = this.generate(rightTree);
        }
        return tree;
    }

    // Создаём комнаты в зонах
    private createRooms(tree: Tree) {
        if (!(tree.left instanceof Tree && tree.right instanceof Tree)) {
            // отрисуем "комнату" в зоне. Комнаты должны быть меньше от 10 до 30% чем ячейка
            // минимальный размер комнаты - 60% от зоны
            let minWidth = tree.width / 100 * this.MIN_ROOM_SIZE;
            let minHeight = tree.height / 100 * this.MIN_ROOM_SIZE;

            let roomOffsetX = this.getRandomIntegerBetween(this.MIN_ROOM_MARGIN, tree.width - minWidth);
            let roomOffsetY = this.getRandomIntegerBetween(this.MIN_ROOM_MARGIN, tree.height - minHeight);

            let roomWidth = this.getRandomIntegerBetween(minWidth, tree.width - roomOffsetX - this.MIN_ROOM_MARGIN);
            let roomHeight = this.getRandomIntegerBetween(minHeight, tree.height - roomOffsetY - this.MIN_ROOM_MARGIN);

            // создаём комнату с реальными x и y на холсте
            let roomX = tree.x + roomOffsetX;
            let roomY = tree.y + roomOffsetY;
            tree.room = new Room(roomX, roomY, roomWidth, roomHeight);
            tree.room.tree = tree;
            tree.room.id = KeyGenerator.getNextKey('R');

            this.rooms.push(tree.room);
        }

        if (tree.left instanceof Tree && tree.right instanceof Tree) {
            this.createRooms(tree.left);
            this.createRooms(tree.right);

            let corridor = this.getCorridor(tree.left, tree.right);
            if (corridor instanceof Corridor) {
                this.corridors.push(corridor);
            }
        }
    }

    private getCorridor(treeNode1: Tree, treeNode2: Tree): Corridor|null
    {
        let minCorridorSize = this.CORRIDOR_WIDTH;
        let corridorId;
        let corridorX, corridorY, corridorWidth, corridorHeight;
        // Тип разделения - сравним координаты x и y у зон
        if (treeNode1.x === treeNode2.x) {
            // вертикальное разделение - коридор рисуем вертикально
            let top, bottom;
            if (treeNode1.y < treeNode2.y) {
                top = treeNode1;
                bottom = treeNode2;
            } else {
                top = treeNode2;
                bottom = treeNode1;
            }

            let topRoom = top.getRoom();
            let bottomRoom = bottom.getRoom();

            // вычисляем позицию и размеры коридора между комнатами
            corridorWidth = minCorridorSize;
            let topRoomBottomY = topRoom.y + topRoom.height;
            let bottomRoomTopY = bottomRoom.y;
            // смещение центра коридора по Y, чтобы попасть на обе комнаты
            corridorHeight = Math.max(bottomRoomTopY, topRoomBottomY) - Math.min(bottomRoomTopY, topRoomBottomY);
            corridorY = topRoom.y + topRoom.height + (corridorHeight / 2);

            let topRoomCenterX = topRoom.x + topRoom.width / 2;
            let bottomRoomCenterX = bottomRoom.x + bottomRoom.width / 2;
            let centerDiffX = Math.abs(topRoomCenterX - bottomRoomCenterX);

            corridorX = Math.min(topRoomCenterX, bottomRoomCenterX) + centerDiffX / 2;
            corridorId = topRoom.id + bottomRoom.id;

            let newCoord = this.checkAndUpdateCorridorCoords(
                corridorX, corridorWidth,
                topRoom.x, topRoom.width,
                bottomRoom.x, bottomRoom.width,
            );
            corridorX = newCoord.coord;
            corridorWidth = newCoord.size;
        } else {
            // горизонтальное разделение - коридор горизонтальный
            let left, right;
            if (treeNode1.x < treeNode2.x) {
                left = treeNode1;
                right = treeNode2;
            } else {
                left = treeNode2;
                right = treeNode1;
            }

            let leftRoom = left.getRoom();
            let rightRoom = right.getRoom();

            // вычисляем позицию и размеры коридора между комнатами
            corridorHeight = minCorridorSize;
            let leftRoomRightX = leftRoom.x + leftRoom.width;
            let rightRoomLeftX = (rightRoom.x);
            // смещение центра коридора по X, чтобы попасть на обе комнаты
            corridorWidth = Math.max(rightRoomLeftX, leftRoomRightX) - Math.min(rightRoomLeftX, leftRoomRightX);
            corridorX = leftRoom.x + leftRoom.width + (corridorWidth / 2);

            let leftRoomCenterY = leftRoom.y + leftRoom.height / 2;
            let rightRoomCenterY = rightRoom.y + rightRoom.height / 2;
            let centerDiffY = Math.abs(leftRoomCenterY - rightRoomCenterY);

            corridorY = Math.min(leftRoomCenterY, rightRoomCenterY) + centerDiffY / 2;
            corridorId = leftRoom.id + rightRoom.id;

            let newCoord = this.checkAndUpdateCorridorCoords(
                corridorY, corridorHeight,
                leftRoom.y, leftRoom.height,
                rightRoom.y, rightRoom.height,
            );
            corridorY = newCoord.coord;
            corridorHeight = newCoord.size;
        }

        let c = new Corridor(
            Math.floor(corridorX - corridorWidth / 2),
            Math.floor(corridorY - corridorHeight / 2),
            Math.floor(corridorWidth),
            Math.floor(corridorHeight)
        );
        c.id = corridorId;

        return c;
    }

    private checkAndUpdateCorridorCoords(originCoord, originSize, coordRoom1, sizeRoom1, coordRoom2, sizeRoom2): {coord: number, size: number}
    {
        // проверим - попал ли коридор на комнаты. Вдруг он сместился, нужно подвинуть
        let coordMin = originCoord - originSize / 2;
        let coordMax = originCoord + originSize / 2;

        let newCorridorMaxX = coordMax,
            newCorridorMinX =  coordMin;

        if (coordMax > (coordRoom1 + sizeRoom1)) {
            newCorridorMaxX = (coordRoom1 + sizeRoom1);
        }
        if (coordMax > (coordRoom2 + sizeRoom2)) {
            newCorridorMaxX = (coordRoom2 + sizeRoom2);
        }
        if (coordMin < (coordRoom1)) {
            newCorridorMinX = coordRoom1;
        }
        if (coordMin < coordRoom2) {
            newCorridorMinX = coordRoom2;
        }
        // исправим положение коридора
        if (originCoord < (newCorridorMinX + originSize / 2)){
            originCoord = newCorridorMinX + originSize / 2;
        }
        if (originCoord > (newCorridorMaxX - originSize / 2)) {
            originCoord = (newCorridorMaxX - originSize / 2);
        }

        return {coord: originCoord, size: originSize};
    }
}
