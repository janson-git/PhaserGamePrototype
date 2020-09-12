enum TilesEnum {
    WATER = 11, // вода без травы
    WATER_LILY = 41, // кувшинка без цветка
    WATER_LILY_FLOWER = 47, // кувшинка c цветком

    GRASS_SINGLE_BUSH = 113, // одинокий куст травы

    // границы травы, переход к воде
    GRASS_BORDER_TOP_LEFT = 4,
    GRASS_BORDER_TOP = 5,
    GRASS_BORDER_TOP_RIGHT = 6,
    GRASS_BORDER_LEFT = 31,
    GRASS_CENTER = 32, // центральный блок, со всех сторон окружённый травой
    GRASS_BORDER_RIGHT = 33,
    GRASS_BORDER_BOTTOM_LEFT = 58,
    GRASS_BORDER_BOTTOM = 59,
    GRASS_BORDER_BOTTOM_RIGHT = 60,

    // "крест" из травы. Например для отрисовки узких стен или одиночных полу-островков
    GRASS_CROSS_TOP = 167,
    GRASS_CROSS_LEFT = 195,
    GRASS_CROSS_CENTER = 196,
    GRASS_CROSS_RIGHT = 197,
    GRASS_CROSS_BOTTOM = 223,

    // Углы, соседствующие с единственным блоком-проходом, расположенные от него по диагонали
    GRASS_CORNER_TOP_LEFT = 409,
    GRASS_CORNER_TOP_RIGHT = 410,
    GRASS_CORNER_BOTTOM_LEFT = 436,
    GRASS_CORNER_BOTTOM_RIGHT = 437,
}

export default TilesEnum;