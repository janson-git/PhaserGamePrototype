enum TilesEnum {
    WATER = 11, // вода без травы
    WATER_LILY = 41, // кувшинка без цветка
    WATER_LILY_FLOWER = 47, // кувшинка c цветком

    WATER_SEDGE_TOP_LEFT = 13,
    WATER_SEDGE_TOP = 14,
    WATER_SEDGE_TOP_RIGHT = 15,
    WATER_SEDGE_LEFT = 40,
    WATER_SEDGE_RIGHT = 42,
    WATER_SEDGE_BOTTOM_LEFT = 67,
    WATER_SEDGE_BOTTOM = 68,
    WATER_SEDGE_BOTTOM_RIGHT = 69,

    WATER_CROSS_SEDGE_TOP = 176,
    WATER_CROSS_SEDGE_LEFT = 202,
    WATER_CROSS_SEDGE_RIGHT = 204,
    WATER_CROSS_SEDGE_BOTTOM = 230,

    WATER_SEDGE_CENTER = 122, // вода с осокой со всех сторон окружённая травой
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

    GRASS_CENTER_WITH_SEDGE = 35, // центральный блок травы, с камышом

    // "крест" из травы. Например для отрисовки узких стен или одиночных полу-островков
    GRASS_CROSS_TOP = 167,
    GRASS_CROSS_LEFT = 193,
    GRASS_CROSS_CENTER = 194,
    GRASS_CROSS_RIGHT = 195,
    GRASS_CROSS_BOTTOM = 221,

    // Углы, соседствующие с единственным блоком-проходом, расположенные от него по диагонали
    GRASS_CORNER_TOP_LEFT = 409,
    GRASS_CORNER_TOP_RIGHT = 410,
    GRASS_CORNER_BOTTOM_LEFT = 436,
    GRASS_CORNER_BOTTOM_RIGHT = 437,

    // блок травы, с двумя диагональными соседями
    GRASS_CENTER_TWO_WATERS_AT_BOTTOM = 329,
    GRASS_CENTER_TWO_WATERS_AT_RIGHT = 355,
    GRASS_CENTER_TWO_WATERS_AT_LEFT = 357,
    GRASS_CENTER_TWO_WATERS_AT_TOP = 383,

    // стены из травы
    GRASS_WALL_HORIZONTAL = 86,
    GRASS_WALL_VERTICAL = 112,
}

export default TilesEnum;