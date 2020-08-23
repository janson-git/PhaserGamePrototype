import * as Phaser from "phaser";

class Tree {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    /** @var Tree|null */
    public left?: Tree;
    /** @var Tree|null */
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
    private MIN: number;
    private MAX: number;
    private SPLIT_FROM: number;
    private SPLIT_TO: number;

    constructor() {
        const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
            active: false,
            visible: false,
            key: 'Generator',
        };

        super(sceneConfig);

        this.MIN = 70;
        this.MAX = 120;
        this.SPLIT_FROM = 30;
        this.SPLIT_TO = 70;
    }

    public preload() {
    }

    public create() {
        // let centerX = this.game.scale.width / 2;
        // let centerY = this.game.scale.height / 2;
        //
        // // Нарисуем кнопку, при клике - вызываем сцену игры
        // this.button = this.add.circle(centerX, centerY, 25, 0x00FF00)
        //     .setInteractive({useHandCursor: true})
        //     .on('pointerover', () => this.hoverButton())
        //     .on('pointerout', () => this.outButton())
        //     .on('pointerdown', () => this.clickButton());
        //
        // this.add.polygon(centerX + 2, centerY + 15, [
        //     0,-15, 0,15, 20,0,
        // ], 0x000000);

        // this.add.line(
        //     0, 0,
        //     0, 0,
        //     0, 200,
        //     0x000000
        // );

        let tree = this.generate(new Tree(500,400));

        this.drawTree(tree);
    }


    public update(time, delta) {
    }

    private getRandomSplit() : string {
        let array = ['vertical', 'horizontal'];
        return array[Math.floor(Math.random() * array.length)];
    }

    private getSplitSizes(size) : Array<number> {
        let splitMin = size / 100 * this.SPLIT_FROM;
        let splitMax = size / 100 * this.SPLIT_TO;
        let point = Math.floor(Math.random() * (splitMax - splitMin + 1) + splitMin);
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

    private drawTree(tree: Tree) {
        // отрисуем зону
        this.add.rectangle(
            tree.x + (tree.width/2), tree.y + (tree.height/2),
            tree.width - 2, tree.height - 2,
            0x000000,
            .2
        );

        if (!(tree.left instanceof Tree) && !(tree.right instanceof Tree)) {
            // отрисуем "комнату" в зоне. Комнаты должны быть меньше от 10 до 30% чем ячейка
            // минимальный размер комнаты - 60% от зоны
            let minRoomSizeX = tree.width / 100 * 60;
            let minRoomSizeY = tree.height / 100 * 60;
            let roomWidth = ((tree.width - minRoomSizeX - 5) * (Math.random()) + minRoomSizeX);
            let roomHeight = ((tree.height - minRoomSizeY - 5) * (Math.random())  + minRoomSizeX);
            let roomX = (tree.width - roomWidth - 5) * (Math.random()) + 5;
            let roomY = (tree.height - roomHeight - 5) * (Math.random()) + 5;
            this.add.rectangle(
                tree.x + (tree.width / 2), tree.y + (tree.height / 2),
                minRoomSizeX, minRoomSizeY,
                0xFFFFFF
            );
            console.log(tree.width, minRoomSizeX, roomWidth, roomX);
        }

        if (tree.left instanceof Tree) {
            this.drawTree(tree.left);
        }
        if (tree.right instanceof Tree) {
            this.drawTree(tree.right);
        }
    }
}
