import * as Phaser from "phaser";

class Corridor {
    public id: string;
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
    public id: string;
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
    public id: string;

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

    /**
     * Берёт из узла или собственную комнату или одну из комнат его дочерних узлов
     */
    public getRoom(): Room|null
    {
        if (this.room instanceof Room) {
            return this.room;
        }

        let leftRoom: Room,
            rightRoom: Room;

        if (this.left instanceof Tree) {
            leftRoom = this.left.getRoom();
        }
        if (this.left instanceof Tree) {
            rightRoom = this.right.getRoom();
        }

        if (leftRoom === null && rightRoom === null) {
            return null;
        }
        if (leftRoom !== null || rightRoom !== null) {
            return leftRoom === null ? rightRoom : leftRoom;
        }

        // если есть обе комнаты, всегда возвращаем левую
        return leftRoom;
    }
}

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
        let startTree = new Tree(500,400);
        startTree.id = 'T' + KeyGenerator.getNextKey();
        let tree = this.generate(startTree);
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
        // если не делится, просто возвращаемся сразу
        if (tree.width < this.MAX && tree.height < this.MAX) {
            return tree;
        }
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

        leftTree.id = 'T' + KeyGenerator.getNextKey();
        rightTree.id = 'T' + KeyGenerator.getNextKey();

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
        // this.add.rectangle(
        //     centerX, centerY,
        //     tree.width - 2, tree.height - 2,
        //     0x000000,
        //     .2
        // );
        // this.add.text(
        //     tree.x, tree.y,
        //     `${tree.id}`
        // ).setColor('yellow').setFontSize(10);

        if (!(tree.left instanceof Tree && tree.right instanceof Tree)) {
            // отрисуем "комнату" в зоне. Комнаты должны быть меньше от 10 до 30% чем ячейка
            // минимальный размер комнаты - 60% от зоны
            let minWidth = tree.width / 100 * this.MIN_ROOM_SIZE;
            let minHeight = tree.height / 100 * this.MIN_ROOM_SIZE;

            let roomX = this.getRandomIntegerBetween(this.MIN_ROOM_MARGIN, tree.width - minWidth);
            let roomY = this.getRandomIntegerBetween(this.MIN_ROOM_MARGIN, tree.height - minHeight);

            let roomWidth = this.getRandomIntegerBetween(minWidth, tree.width - roomX - this.MIN_ROOM_MARGIN);
            let roomHeight = this.getRandomIntegerBetween(minHeight, tree.height - roomY - this.MIN_ROOM_MARGIN);

            // отрисуем комнату
            tree.room = new Room(roomX, roomY, roomWidth, roomHeight);
            tree.room.id = 'R' + KeyGenerator.getNextKey();

            // реальные координаты размещения на холсте
            let roomCenterX = tree.x + (roomWidth / 2) + roomX;
            let roomCenterY = tree.y + (roomHeight / 2) + roomY;
            this.add.rectangle(
                roomCenterX, roomCenterY,
                roomWidth, roomHeight,
                0xFFFFFF
            );
            // this.add.text(
            //     tree.x + roomX, tree.y + roomY,
            //     `${tree.room.id}`
            // ).setColor('green').setFontSize(10);
        }

        if (tree.left instanceof Tree && tree.right instanceof Tree) {
            this.drawRooms(tree.left);
            this.drawRooms(tree.right);

            // у нас только топ комната без комнаты?
            //if (tree.left.room instanceof Room && tree.right.room instanceof Room) {

                let corridor = this.getCorridor(tree.left, tree.right);
                console.log(corridor);
                if (corridor instanceof Corridor) {
                    this.add.rectangle(
                        tree.x + corridor.x, tree.y + corridor.y,
                        corridor.width, corridor.height,
                        0xFFFFFF
                    );
                    // this.add.text(
                    //     tree.x + corridor.x, tree.y + corridor.y,
                    //     corridor.id
                    // ).setColor('black').setFontSize(10).setBackgroundColor('yellow');
                }
            // }
        }
    }

    private getCorridor(treeNode1: Tree, treeNode2: Tree): Corridor|null
    {
        let minCorridorSize = 10;
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
            let topRoomBottomY = top.y + topRoom.y + topRoom.height;
            let bottomRoomTopY = (bottom.y + bottomRoom.y);
            // смещение центра коридора по Y, чтобы попасть на обе комнаты
            corridorHeight = Math.max(bottomRoomTopY, topRoomBottomY) - Math.min(bottomRoomTopY, topRoomBottomY);
            corridorY = topRoom.y + topRoom.height + (corridorHeight / 2);

            let topRoomCenterX = topRoom.x + topRoom.width / 2;
            let bottomRoomCenterX = bottomRoom.x + bottomRoom.width / 2;
            let centerDiffX = Math.abs(topRoomCenterX - bottomRoomCenterX);

            corridorX = Math.min(topRoomCenterX, bottomRoomCenterX) + centerDiffX / 2;
            corridorId = topRoom.id + bottomRoom.id;
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
            let leftRoomRightX = left.x + leftRoom.x + leftRoom.width;
            let rightRoomLeftX = (right.x + rightRoom.x);
            // смещение центра коридора по X, чтобы попасть на обе комнаты
            corridorWidth = Math.max(rightRoomLeftX, leftRoomRightX) - Math.min(rightRoomLeftX, leftRoomRightX);
            corridorX = leftRoom.x + leftRoom.width + (corridorWidth / 2);

            let leftRoomCenterY = leftRoom.y + leftRoom.height / 2;
            let rightRoomCenterY = rightRoom.y + rightRoom.height / 2;
            let centerDiffY = Math.abs(leftRoomCenterY - rightRoomCenterY);

            corridorY = Math.min(leftRoomCenterY, rightRoomCenterY) + centerDiffY / 2;
            corridorId = leftRoom.id + rightRoom.id;
        }

        let c = new Corridor(corridorX, corridorY, corridorWidth, corridorHeight);
        c.id = corridorId;

        return c;
    }
}
