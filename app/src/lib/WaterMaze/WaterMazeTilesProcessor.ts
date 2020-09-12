/**
 * Это класс, который принимает на вход карту уровня в виде массива данных,
 * из генератора, где 0 - это блок, а 1 - это проход.
 * И на основе этого массива генерирует новую карту уровня, расставляя
 * соответстующие взаимному расположению элементов уровня тайлы
 * из WaterMazeTiles[Extruded]
 */
import TilesEnum from "./TilesEnum";

export default class WaterMazeTilesProcessor {

    /**
     * Возвращает массив со значениями тайлов, которые считаем "блоками"
     */
    public static getCollisionTilesIndexes(): number[]
    {
        return [
            TilesEnum.GRASS_BORDER_TOP_LEFT,
            TilesEnum.GRASS_BORDER_TOP,
            TilesEnum.GRASS_BORDER_TOP_RIGHT,
            TilesEnum.GRASS_BORDER_LEFT,
            TilesEnum.GRASS_CENTER,
            TilesEnum.GRASS_BORDER_RIGHT,
            TilesEnum.GRASS_BORDER_BOTTOM_LEFT,
            TilesEnum.GRASS_BORDER_BOTTOM,
            TilesEnum.GRASS_BORDER_BOTTOM_RIGHT,

            TilesEnum.GRASS_SINGLE_BUSH,

            TilesEnum.GRASS_BORDER_TOP_LEFT,
            TilesEnum.GRASS_BORDER_TOP,
            TilesEnum.GRASS_BORDER_TOP_RIGHT,
            TilesEnum.GRASS_BORDER_LEFT,
            TilesEnum.GRASS_CENTER,
            TilesEnum.GRASS_BORDER_RIGHT,
            TilesEnum.GRASS_BORDER_BOTTOM_LEFT,
            TilesEnum.GRASS_BORDER_BOTTOM,
            TilesEnum.GRASS_BORDER_BOTTOM_RIGHT,

            TilesEnum.GRASS_CROSS_TOP,
            TilesEnum.GRASS_CROSS_LEFT,
            TilesEnum.GRASS_CROSS_CENTER,
            TilesEnum.GRASS_CROSS_RIGHT,
            TilesEnum.GRASS_CROSS_BOTTOM,

            TilesEnum.GRASS_CORNER_TOP_LEFT,
            TilesEnum.GRASS_CORNER_TOP_RIGHT,
            TilesEnum.GRASS_CORNER_BOTTOM_LEFT,
            TilesEnum.GRASS_CORNER_BOTTOM_RIGHT,
        ];
    }

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
            // Соседи
            let n = [
                level[ i - rowWidth - 1], // 0 - top-left
                level[ i - rowWidth], // 1 - top
                level[ i - rowWidth + 1], // 2 - top-right
                level[ i - 1], // 3 - left
                level[ i + 1], // 4 - right
                level[ i + rowWidth - 1], // 5 - bottom-left
                level[ i + rowWidth], // 6 - bottom
                level[ i + rowWidth + 1], // 7 - bottom-right
            ];

            // 0 - блок, 1 - проход
            if (level[i] === pass) {
                // если проход - рисуем воду и всё тут
                newLevel[i] = TilesEnum.WATER;

                // если все соседи - проход, то с некоторым шансом поставим кувшинку
                if (n[0] === pass && n[1] === pass && n[2] === pass && n[3] === pass &&
                    n[4] === pass && n[5] === pass && n[6] === pass && n[7] === pass
                ) {
                    let chance = Math.random();
                    // Шанс на кувшинку с цветком - 0.2%
                    if (chance <= .002) {
                        newLevel[i] = TilesEnum.WATER_LILY_FLOWER;
                    }
                    // Шанс на кувшинку без цветка - 1%
                    else if (chance <= .01) {
                        newLevel[i] = TilesEnum.WATER_LILY;
                    }
                }
                // если соседи - блоки, то нужно поставить воду с камышами

            } else {
                // если у нас блок, то смотрим по соседям, какой блок нам рисовать
                // ПРОВЕРЯЕМ ЧЕТЫРЁХ ПРЯМЫХ СОСЕДЕЙ - верх, низ, лево право

                // если 4 соседа-прохода
                if (n[1] === pass && n[3] === pass && n[4] === pass && n[6] === pass) {
                    newLevel[i] = TilesEnum.GRASS_SINGLE_BUSH;
                }
                // если 3 соседа-прохода
                // это элементы фигуры-креста
                //   X
                //  XXX
                //   X
                else if (n[1] === pass && n[3] === pass && n[4] === pass && n[6] === block) {
                    newLevel[i] = TilesEnum.GRASS_CROSS_TOP;
                } else if (n[1] === pass && n[3] === pass && n[4] === block && n[6] === pass) {
                    newLevel[i] = TilesEnum.GRASS_CROSS_LEFT;
                } else if (n[1] === pass && n[3] === block && n[4] === pass && n[6] === pass) {
                    newLevel[i] = TilesEnum.GRASS_CROSS_RIGHT;
                } else if (n[1] === block && n[3] === pass && n[4] === pass && n[6] === pass) {
                    newLevel[i] = TilesEnum.GRASS_CROSS_BOTTOM;
                }
                // если 2 соседа-прохода
                else if (n[1] === pass && n[3] === pass && n[4] === block && n[6] === block) {
                    newLevel[i] = TilesEnum.GRASS_BORDER_TOP_LEFT;
                } else if (n[1] === pass && n[3] === block && n[4] === pass && n[6] === block) {
                    newLevel[i] = TilesEnum.GRASS_BORDER_TOP_RIGHT;
                } else if (n[1] === block && n[3] === pass && n[4] === block && n[6] === pass) {
                    newLevel[i] = TilesEnum.GRASS_BORDER_BOTTOM_LEFT;
                } else if (n[1] === block && n[3] === block && n[4] === pass && n[6] === pass) {
                    newLevel[i] = TilesEnum.GRASS_BORDER_BOTTOM_RIGHT;
                }
                // если 1 сосед-проход
                else if (n[1] === pass) {
                    newLevel[i] = TilesEnum.GRASS_BORDER_TOP;
                } else if (n[3] === pass) {
                    newLevel[i] = TilesEnum.GRASS_BORDER_LEFT;
                } else if (n[4] === pass) {
                    newLevel[i] = TilesEnum.GRASS_BORDER_RIGHT;
                } else if (n[6] === pass) {
                    newLevel[i] = TilesEnum.GRASS_BORDER_BOTTOM;
                }
                // ПРОВЕРИМ ДИАГОНАЛЬНЫХ СОСЕДЕЙ
                // если со всех сторон блоки, проверим диагональных соседей
                else if (n[1] === block && n[3] === block && n[4] === block && n[6] === block) {
                    // все диагонали - проходы
                    if (n[0] === pass && n[2] === pass && n[5] === pass && n[7] === pass) {
                        newLevel[i] = TilesEnum.GRASS_CROSS_CENTER;
                    }
                    // одна из диагоналей - проход
                    else if (n[0] === pass) {
                        newLevel[i] = TilesEnum.GRASS_CORNER_BOTTOM_RIGHT;
                    } else if (n[2] === pass) {
                        newLevel[i] = TilesEnum.GRASS_CORNER_BOTTOM_LEFT;
                    } else if (n[5] === pass) {
                        newLevel[i] = TilesEnum.GRASS_CORNER_TOP_RIGHT;
                    } else if (n[7] ===  pass) {
                        newLevel[i] = TilesEnum.GRASS_CORNER_TOP_LEFT;
                    } else {
                        newLevel[i] = TilesEnum.GRASS_CENTER;
                    }
                } else {
                    newLevel[i] = TilesEnum.GRASS_CENTER;
                }
            }
        }
        return newLevel;
    }
}