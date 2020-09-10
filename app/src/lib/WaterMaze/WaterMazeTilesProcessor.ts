/**
 * Это класс, который принимает на вход карту уровня в виде массива данных,
 * из генератора, где 0 - это блок, а 1 - это проход.
 * И на основе этого массива генерирует новую карту уровня, расставляя
 * соответстующие взаимному расположению элементов уровня тайлы
 * из WaterMazeTiles[Extruded]
 */
import TilesEnum from "./TilesEnum";
import Tile = Phaser.Tilemaps.Tile;

export default class WaterMazeTilesProcessor {
    /**
     * Расставляет тайлы из спрайта водяного лабиринта в уровень
     * @param level
     * @param rowWidth
     */
    public static placeTiles(level: number[], rowWidth: number): number[] {
        let newLevel: number[] = [];
        let block: number = 0;
        let pass: number = 1;

        for (let i = 0; i < level.length; i++) {
            // 0 - блок, 1 - проход
            if (level[i] === pass) {
                // если проход - рисуем воду и всё тут
                newLevel[i] = TilesEnum.WATER;
            } else {
                // если у нас блок, то смотрим по окружающим, какой блок нам рисовать
                let n = [
                    level[ i - rowWidth - 1], // 0
                    level[ i - rowWidth], // 1 - top
                    level[ i - rowWidth + 1], // 2
                    level[ i - 1], // 3 - left
                    level[ i + 1], // 4 - right
                    level[ i + rowWidth - 1], // 5
                    level[ i + rowWidth], // 6 - bottom
                    level[ i + rowWidth + 1], // 7
                ];

                // проверяем четырёх соседей - верх, низ, лево право

                // если 3 соседа-прохода
                if (n[1] === pass && n[3] === pass && n[4] === pass && n[6] === pass) {
                    newLevel[i] = 113;
                } else if (n[1] === pass && n[3] === pass && n[4] === pass && n[6] === block) {
                    newLevel[i] = 167;
                } else if (n[1] === pass && n[3] === pass && n[4] === block && n[6] === pass) {
                    newLevel[i] = 195;
                } else if (n[1] === pass && n[3] === block && n[4] === pass && n[6] === pass) {
                    newLevel[i] = 197;
                } else if (n[1] === block && n[3] === pass && n[4] === pass && n[6] === pass) {
                    newLevel[i] = 223;
                }
                // если 2 соседа-прохода
                else if (n[1] === pass && n[3] === pass && n[4] === block && n[6] === block) {
                    newLevel[i] = TilesEnum.GRASS_TOP_LEFT_BORDER;
                } else if (n[1] === pass && n[3] === block && n[4] === pass && n[6] === block) {
                    newLevel[i] = TilesEnum.GRASS_TOP_RIGHT_BORDER;
                } else if (n[1] === block && n[3] === pass && n[4] === block && n[6] === pass) {
                    newLevel[i] = TilesEnum.GRASS_BOTTOM_LEFT_BORDER;
                } else if (n[1] === block && n[3] === block && n[4] === pass && n[6] === pass) {
                    newLevel[i] = TilesEnum.GRASS_BOTTOM_RIGHT_BORDER;
                }
                // если 1 сосед-проход
                else if (n[1] === pass) {
                    newLevel[i] = TilesEnum.GRASS_TOP_BORDER;
                } else if (n[3] === pass) {
                    newLevel[i] = TilesEnum.GRASS_LEFT_BORDER;
                } else if (n[4] === pass) {
                    newLevel[i] = TilesEnum.GRASS_RIGHT_BORDER;
                } else if (n[6] === pass) {
                    newLevel[i] = TilesEnum.GRASS_BOTTOM_BORDER;
                }
                // если со всех сторон блоки, проверим диагональных соседей
                else if (n[1] === block && n[3] === block && n[4] === block && n[6] === block) {
                    // все диагонали - проходы
                    if (n[0] === pass && n[2] === pass && n[5] === pass && n[7] === pass) {
                        newLevel[i] = 196;
                    }
                    // одна из диагоналей - проход
                    else if (n[0] === pass) {
                        newLevel[i] = 437;
                    } else if (n[2] === pass) {
                        newLevel[i] = 436;
                    } else if (n[5] === pass) {
                        newLevel[i] = 410;
                    } else if (n[7] ===  pass) {
                        newLevel[i] = 409;
                    } else {
                        newLevel[i] = TilesEnum.GRASS_CENTER;
                    }
                } else {
                    newLevel[i] = block;
                }
            }
        }
        return newLevel;
    }
}