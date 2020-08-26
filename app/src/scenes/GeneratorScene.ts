import * as Phaser from "phaser";

class Room {
    public x: number; // положение внутри зоны
    public y: number; // положение внутри зоны
    public width: number; // ширина комнаты внутри зоны
    public height: number; // высота комнаты внутри зоны

    constructor(x: number, y: number, width: number, height: number)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
class Tree {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public room?: Room;

    public left?: Tree;
    public right?: Tree;

    constructor(width: number, height: number)
    {
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
    }
}

export class GeneratorScene extends Phaser.Scene {
    private MAX: number;
    private MIN_ROOM_SIZE: number;
    private MIN_ROOM_MARGIN: number;
    private SPLIT_FROM: number;
    private SPLIT_TO: number;

    constructor() {
        const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
            active: false,
            visible: false,
            key: 'Generator',
        };

        super(sceneConfig);

        this.MAX = 170; // максимальный размер зоны - если больше, то можно делить
        // минимальный размер комнаты удобно делать больше 50%. Тогда при соединении
        // всегда рисуем коридор посередине и попадаем куда надо :)
        this.MIN_ROOM_SIZE = 60; // в процентах от размера зоны
        this.MIN_ROOM_MARGIN = 10; // комната не должна быть к краю зоны ближе чем это значение
        this.SPLIT_FROM = 30; // ограничение по разделению на зоны, не ближе чем 30% от одной стены
        this.SPLIT_TO = 70; // ограничение по разделению на зоны, не ближе чем 70% от другой стены
    }

    public preload() {
    }

    public create() {
        let tree = this.generate(new Tree(500,400));
        this.drawRooms(tree);
    }

    public update(time, delta) {
    }


    private getRandomIntegerBetween(from: number, to: number): number {
        return Math.floor((Math.random() * (to - from + 1)) + from);
    }

    private getRandomSplit() : string {
        let array = ['vertical', 'horizontal'];
        return array[Math.floor(Math.random() * array.length)];
    }

    private getSplitSizes(size) : Array<number> {
        let splitMin = size / 100 * this.SPLIT_FROM;
        let splitMax = size / 100 * this.SPLIT_TO;
        let point = this.getRandomIntegerBetween(splitMin, splitMax);
        return [point, size - point];
    }

    private generate(tree: Tree) {
        let splitType;
        if (tree.width > this.MAX && tree.height > this.MAX) {
            splitType = this.getRandomSplit();
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
            tree.left = this.generate(leftTree);
        }
        if (rightTree instanceof Tree) {
            tree.right = this.generate(rightTree);
        }
        return tree;
    }

    // отображаем зоны и рисуем комнаты в них
    private drawRooms(tree: Tree) {
        let centerX = tree.x + (tree.width/2);
        let centerY = tree.y + (tree.height/2);

        // отрисуем зону
        this.add.rectangle(
            centerX, centerY,
            tree.width - 2, tree.height - 2,
            0x000000,
            .2
        );

        if (!(tree.left instanceof Tree) && !(tree.right instanceof Tree)) {
            // отрисуем "комнату" в зоне. Комнаты должны быть меньше от 10 до 30% чем ячейка
            // минимальный размер комнаты - 60% от зоны
            let minWidth = tree.width / 100 * this.MIN_ROOM_SIZE;
            let minHeight = tree.height / 100 * this.MIN_ROOM_SIZE;

            let roomX = this.getRandomIntegerBetween(this.MIN_ROOM_MARGIN, tree.width - minWidth);
            let roomY = this.getRandomIntegerBetween(this.MIN_ROOM_MARGIN, tree.height - minHeight);

            let roomWidth = this.getRandomIntegerBetween(minWidth, tree.width - roomX - this.MIN_ROOM_MARGIN);
            let roomHeight = this.getRandomIntegerBetween(minHeight, tree.height - roomY - this.MIN_ROOM_MARGIN);

            // реальные координаты размещения на холсте
            let roomCenterX = tree.x + (roomWidth / 2) + roomX;
            let roomCenterY = tree.y + (roomHeight / 2) + roomY;
            this.add.rectangle(
                roomCenterX, roomCenterY,
                roomWidth, roomHeight,
                0xFFFFFF
            );
            this.add.text(
                roomCenterX + 10, roomCenterY,
                roomY + '(' + roomCenterY + ')'
            ).setFontSize(10).setColor('black');

            tree.room = new Room(roomX, roomY, roomWidth, roomHeight);
        }

        if (tree.left instanceof Tree && tree.right instanceof Tree) {
            this.drawRooms(tree.left);
            this.drawRooms(tree.right);

            // у нас только топ комната без комнаты?
            if (tree.left.room instanceof Room && tree.right.room instanceof Room) {
                // TODO: нарисовать коридор посередине. Как вычислить?
                // Тип разделения - сравним координаты x и y у зон
                if (tree.left.x === tree.right.x) {
                    // вертикальное разделение - коридор рисуем вертикально

                    // теперь нужно получить координаты стен которые будем соединять
                    // коридором
                    let minCorridorSize = 10;
                    let corridorX, corridorY, corridorWidth, corridorHeight;
                    if (tree.left.room.y < tree.right.room.y) {
                        // вычисляем позицию и размеры коридора между комнатами
                        corridorWidth = minCorridorSize;
                        let leftRoomBottomY = tree.left.y + tree.left.room.y + tree.left.room.height;
                        let rightRoomTopY = (tree.right.y + tree.right.room.y);
                        // смещение центра коридора по Y, чтобы попасть на обе комнаты
                        corridorHeight = rightRoomTopY - leftRoomBottomY;

                        corridorY = leftRoomBottomY + (corridorHeight / 2);
                        corridorX = (tree.width / 2) - minCorridorSize;

                        this.add.rectangle(
                            tree.x + (tree.width / 2), tree.y + corridorY,
                            corridorWidth, corridorHeight,
                            0xFFFF00
                        );
                        this.add.text(
                            tree.x + (tree.width / 2) + 20, tree.y + corridorY,
                            (rightRoomTopY - tree.right.y) + ' - ' +  (tree.right.y - leftRoomBottomY)
                        ).setFontSize(10);

                    } else {
                        // // вычисляем позицию и размеры коридора между комнатами
                        // corridorY = tree.right.room.y + tree.right.room.height;
                        // corridorX = (tree.width / 2) - minCorridorSize;
                        // corridorWidth = minCorridorSize;
                        // corridorHeight = tree.left.room.y - corridorY;
                        //
                        // this.add.rectangle(
                        //     tree.x + (tree.width / 2), tree.y + corridorY,
                        //     corridorWidth, corridorHeight,
                        //     0xFFFF00
                        // )
                    }


                } else if (tree.left.y === tree.right.y) {
                    // горизонтальное разделение - коридор рисуем горизонтально
                }
            }
        }
    }
}
