/**
 * Клеточный автомат, который на основе сгенерированной карты комнат и коридоров
 * должен построить карту приближённую к пещероподобной. Т.е. с неровными стенами
 * и проходами
 */
import Room from "../Components/Room";
import Corridor from "../Components/Corridor";
import Scene = Phaser.Scene;

const SUPER_CELL: number = 9; // клетка в суперпозиции - может принять любое значение
const DEAD_CELL: number = 0; // точно мёртвая. Не изменит состояние при генерации
const LIVE_CELL: number = 1; // точно живая. Не изменит состояние при генерации
const SO_DEAD_CELL: number = 2; // условно мёртвая. Может изменить состояние на следующем шаге
const SO_LIVE_CELL: number = 3; // условно живая. --//--

const ZONE_PADDING: number = 5; // незаполняемый промежуток от границы зоны
const ROOM_FILL_MARGIN = 10; // промежуток вокруг комнаты для заполнения случайными клетками

export default class CellularAutomate
{
    private width: number;
    private height: number;

    private rooms: Room[];
    private corridors: Corridor[];

    private map: number[];

    constructor(width: number, height: number, rooms: Room[], corridors: Corridor[]) {
        this.rooms = rooms;
        this.corridors = corridors;
        this.width = width;
        this.height = height;

        this.map = [];
    }

    // метод для пересчёта положения на карте в точке x,y в смещение в массиве
    private coordToOffset(x, y): number {
        return y * this.width + x;
    }

    // метод для пересчёта смещения в массиве в положение на карте в точке x,y
    private offsetToCoord(offset): {x: number, y: number} {
        let x = offset % this.width;
        return {x: x, y: (offset - x) / this.width};
    }

    public initializeMap() {
        // TODO: 1. заливаем всю карту "точно мёртвым" цветом
        // TODO: 2. проходим по комнатам и коридорам, заливаем место случайно вокруг них "живыми"
        // TODO:    так чтобы на границах зон оставались "точно мёртвые" клетки
        // TODO: 3. заливаем комнаты и коридоры "точно живыми клетками"
        // TODO: 4. карта готова. Дальше отдельным методом прогоняем одну итерацию.
        // TODO:    сколько итераций надо - решает внешний код

        // заполняем весь массив карты "мёртвыми" клетками
        let mapSize = this.width * this.height;
        for (let i = 0; i < mapSize; i++) {
            this.map[i] = DEAD_CELL;
        }

        // Далее проходим по всем комнатам, получаем из них зоны, и пространство вокруг
        // комнаты заполняем клетками в суперпозиции. Аналогично - с коридорами
        this.rooms.forEach((room: Room) => {
            // берём границы, чтобы при заполнении пространства случайно не вылезти за зону
            let minX = room.tree.x + ZONE_PADDING;
            let maxX = room.tree.x + room.tree.width - ZONE_PADDING;
            let minY = room.tree.y + ZONE_PADDING;
            let maxY = room.tree.y + room.tree.height - ZONE_PADDING;

            // теперь вокруг комнаты заполняем клетками
            let fillX = room.x - ROOM_FILL_MARGIN;
            let fillY = room.y - ROOM_FILL_MARGIN;
            if (fillX < minX) {
                fillX = minX;
            }
            if (fillY < minY) {
                fillY = minY;
            }
            let fillMaxX = room.x + room.width + ROOM_FILL_MARGIN;
            let fillMaxY = room.y + room.height + ROOM_FILL_MARGIN;
            if (fillMaxX > maxX) {
                fillMaxX = maxX;
            }
            if (fillMaxY > maxY) {
                fillMaxY = maxY;
            }

            let roomX = room.x;
            let roomMaxX = room.x + room.width;
            let roomY = room.y;
            let roomMaxY = room.y + room.height;

            for (let i = fillX; i <= fillMaxX; i++) {
                for (let j = fillY; j <= fillMaxY; j++) {
                    // проверим, если это не внутри комнаты - то суперпозиция
                    // если внутри - то живая клетка
                    if (i >= roomX && i <= roomMaxX && j >= roomY && j <= roomMaxY) {
                        this.map[ this.coordToOffset(i, j) ] = LIVE_CELL;
                    } else {
                        this.map[this.coordToOffset(i, j)] = SUPER_CELL;
                    }
                }
            }
        });

        this.corridors.forEach((corridor: Corridor) => {
            // теперь вокруг коридора заполняем клетками в суперпозиции
            let fillX = corridor.x - ROOM_FILL_MARGIN;
            let fillY = corridor.y - ROOM_FILL_MARGIN;

            let fillMaxX = corridor.x + corridor.width + ROOM_FILL_MARGIN;
            let fillMaxY = corridor.y + corridor.height + ROOM_FILL_MARGIN;

            if (fillX < 0) {
                fillX = 0;
            }
            if (fillY < 0) {
                fillY = 0;
            }
            if (fillMaxX > this.width) {
                fillMaxX = this.width;
            }
            if (fillMaxY > this.height) {
                fillMaxY = this.height;
            }

            let roomX = corridor.x;
            let roomMaxX = corridor.x + corridor.width;
            let roomY = corridor.y;
            let roomMaxY = corridor.y + corridor.height;

            for (let i = fillX; i <= fillMaxX; i++) {
                for (let j = fillY; j <= fillMaxY; j++) {
                    if (this.map[ this.coordToOffset(i, j) ] === LIVE_CELL) {
                        continue;
                    }
                    // проверим, если это не внутри коридора - то суперпозиция
                    // если внутри - то живая клетка
                    if (i >= roomX && i <= roomMaxX && j >= roomY && j <= roomMaxY) {
                        this.map[ this.coordToOffset(i, j) ] = LIVE_CELL;
                    } else {
                        this.map[this.coordToOffset(i, j)] = SUPER_CELL;
                    }
                }
            }
        });

        this.map.forEach((value: number, index: number, map: number[]) => {
            if (value === SUPER_CELL) {
                map[index] = Math.random() > .5 ? SO_LIVE_CELL : SO_DEAD_CELL;
            }
        });

    }

    public renderMap(scene: Scene) {
        let graphics = scene.add.graphics().setDefaultStyles({
            lineStyle: {
                width: 1,
                color: 0xFF0000,
                alpha: 1
            },
            fillStyle: {
                color: 0xFF0000,
                alpha: 1
            }
        });

        this.map.forEach((value: number, index:number) => {
            if (value === DEAD_CELL) {
                return;
            }

            let color: number = 0XFFFFFF;
            switch (value) {
                case LIVE_CELL:
                    color = 0xFFFFFF;
                    break;
                case SO_LIVE_CELL:
                    color = 0xFFFFFF;
                    break;
                case SO_DEAD_CELL:
                    color = 0x000000;
                    break;
            }
            let point = this.offsetToCoord(index);
            graphics.fillStyle(color, 1);
            graphics.fillPoint(point.x, point.y);
        });
    }


    // прогоняет нужное количество итераций по подготовленной карте
    public run(iterations: number = 1) {
        // воспользуемся правилом отсюда: http://www.roguebasin.com/index.php?title=Cellular_Automata_Method_for_Generating_Random_Cave-Like_Levels
        // 1. клетка становится стеной, если она была стеной и >=4 соседей были стенами
        // 2. или клетка становится стеной, если она НЕ была стеной и >=5 соседей были стенами
        let mapSize = this.width * this.height;
        // для каких клеток есть смысл смотреть на соседей:
        let minCellIndex = this.width + 2;
        let maxCellIndex = mapSize - this.width - 2;

        for (let i = minCellIndex; i < maxCellIndex; i++) {
            if (this.map[i] === DEAD_CELL || this.map[i] === LIVE_CELL) {
                continue;
            }

            let isWasWall = this.map[i] === SO_DEAD_CELL;

            // соберём "соседей" клетки на карте из массива
            let neighbors = [
                this.map[ i - this.width - 1],
                this.map[ i - this.width],
                this.map[ i - this.width + 1],
                this.map[ i - 1],
                this.map[ i + 1],
                this.map[ i + this.width - 1],
                this.map[ i + this.width],
                this.map[ i + this.width + 1],
            ];

            let count = 0;
            neighbors.forEach((value) => {
                if (value === DEAD_CELL || value === SO_DEAD_CELL) {
                    count++;
                }
            });

            if ((isWasWall && count >= 4) || (!isWasWall && count >= 5)) {
                this.map[i] = SO_DEAD_CELL;
            }
        }

        if (iterations > 0) {
            this.run(iterations - 1);
        }
    }

}