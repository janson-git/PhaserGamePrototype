import * as Phaser from "phaser";

class Corridor {
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
        let tree = this.generate(new Tree(450,350));
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

                let corridor = this.getCorridor(tree.left, tree.right);
                if (corridor instanceof Corridor) {
                    this.add.rectangle(
                        tree.x + corridor.x, tree.y + corridor.y,
                        corridor.width, corridor.height,
                        0xFF0000,
                        0.5
                    );
                }
            }
        }
    }

    private getCorridor(treeNode1: Tree, treeNode2: Tree): Corridor|null
    {
        let minCorridorSize = 10;
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

            // вычисляем позицию и размеры коридора между комнатами
            corridorWidth = minCorridorSize;
            let topRoomBottomY = top.y + top.room.y + top.room.height;
            let bottomRoomTopY = (bottom.y + bottom.room.y);
            // смещение центра коридора по Y, чтобы попасть на обе комнаты
            corridorHeight = Math.max(bottomRoomTopY, topRoomBottomY) - Math.min(bottomRoomTopY, topRoomBottomY);
            corridorY = top.room.y + top.room.height + (corridorHeight / 2);

            let topRoomCenterX = top.room.x + top.room.width / 2;
            let bottomRoomCenterX = bottom.room.x + bottom.room.width / 2;
            let centerDiffX = Math.abs(topRoomCenterX - bottomRoomCenterX);

            corridorX = Math.min(topRoomCenterX, bottomRoomCenterX) + centerDiffX / 2;
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

            // вычисляем позицию и размеры коридора между комнатами
            corridorHeight = minCorridorSize;
            let leftRoomRightX = left.x + left.room.x + left.room.width;
            let rightRoomLeftX = (right.x + right.room.x);
            // смещение центра коридора по X, чтобы попасть на обе комнаты
            corridorWidth = Math.max(rightRoomLeftX, leftRoomRightX) - Math.min(rightRoomLeftX, leftRoomRightX);
            corridorX = left.room.x + left.room.width + (corridorWidth / 2);

            let leftRoomCenterY = left.room.y + left.room.height / 2;
            let rightRoomCenterY = right.room.y + right.room.height / 2;
            let centerDiffY = Math.abs(leftRoomCenterY - rightRoomCenterY);

            corridorY = Math.min(leftRoomCenterY, rightRoomCenterY) + centerDiffY / 2;
        }

        return new Corridor(corridorX, corridorY, corridorWidth, corridorHeight);
    }
}
