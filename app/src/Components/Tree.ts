import Room from "./Room";

export default class Tree {
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
