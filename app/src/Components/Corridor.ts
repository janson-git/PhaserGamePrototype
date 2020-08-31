export default class Corridor {
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
