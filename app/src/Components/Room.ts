import Tree from "./Tree";

export default class Room {
    public id: string;
    public x: number; // положение внутри зоны
    public y: number; // положение внутри зоны
    public width: number; // ширина комнаты внутри зоны
    public height: number; // высота комнаты внутри зоны
    public tree: Tree; // ссылка на зону, в которой отрисована комната

    constructor(x: number, y: number, width: number, height: number)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
