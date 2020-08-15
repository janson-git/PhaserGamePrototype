// Каждый спрайт показывает угол, от которого + и - на 6 градусов его и рисуем
var boatsSpriteListConfig = {"frames": [
  {
    "filename": "red_boat_0", // 0 градусов
    "frame": {"x":0,"y":0,"w":18,"h":24},
    "trimmed": false,
    "spriteSourceSize": {"x":0,"y":0,"w":18,"h":24},
    "sourceSize": {"w":18,"h":24},
    "pivot": {"x":0.5,"y":0.5}
  },
  {
    "filename": "red_boat_1", // 11.25 градусов
    "frame": {"x":20,"y":0,"w":18,"h":24},
    "trimmed": false,
    "spriteSourceSize": {"x":0,"y":0,"w":18,"h":24},
    "sourceSize": {"w":18,"h":24},
    "pivot": {"x":0.5,"y":0.5}
  },
  {
    "filename": "red_boat_2", // 22.50 градуса
    "frame": {"x":41,"y":0,"w":18,"h":24},
    "trimmed": false,
    "spriteSourceSize": {"x":0,"y":0,"w":18,"h":24},
    "sourceSize": {"w":18,"h":24},
    "pivot": {"x":0.5,"y":0.5}
  },
  {
    "filename": "red_boat_3", // 33.75 градуса
    "frame": {"x":62,"y":0,"w":20,"h":24},
    "trimmed": false,
    "spriteSourceSize": {"x":0,"y":0,"w":20,"h":24},
    "sourceSize": {"w":20,"h":24},
    "pivot": {"x":0.5,"y":0.5}
  },
  {
    "filename": "red_boat_4", // 45 градусов
    "frame": {"x":85,"y":2,"w":24,"h":20},
    "trimmed": false,
    "spriteSourceSize": {"x":0,"y":0,"w":23,"h":20},
    "sourceSize": {"w":23,"h":20},
    "pivot": {"x":0.5,"y":0.5}
  },
  {
    "filename": "red_boat_5", // 56.25 градусов
    "frame": {"x":111,"y":3,"w":24,"h":20},
    "trimmed": false,
    "spriteSourceSize": {"x":0,"y":0,"w":24,"h":20},
    "sourceSize": {"w":24,"h":20},
    "pivot": {"x":0.5,"y":0.5}
  },
  {
    "filename": "red_boat_6", // 67.5 градусов
    "frame": {"x":138,"y":3,"w":24,"h":20},
    "trimmed": false,
    "spriteSourceSize": {"x":0,"y":0,"w":24,"h":20},
    "sourceSize": {"w":24,"h":20},
    "pivot": {"x":0.5,"y":0.5}
  },
  {
    "filename": "red_boat_7", // 78.75 градусов
    "frame": {"x":166,"y":4,"w":26,"h":20},
    "trimmed": false,
    "spriteSourceSize": {"x":0,"y":0,"w":26,"h":20},
    "sourceSize": {"w":26,"h":20},
    "pivot": {"x":0.5,"y":0.5}
  },
  {
    "filename": "red_boat_8", // 90 градусов
    "frame": {"x":195,"y":5,"w":26,"h":20},
    "trimmed": false,
    "spriteSourceSize": {"x":0,"y":0,"w":26,"h":20},
    "sourceSize": {"w":26,"h":20},
    "pivot": {"x":0.5,"y":0.5}
  },
  {
    "filename": "red_boat_9", // 101.25 градусов
    "frame": {"x":224,"y":4,"w":26,"h":20},
    "trimmed": false,
    "spriteSourceSize": {"x":0,"y":0,"w":26,"h":20},
    "sourceSize": {"w":26,"h":20},
    "pivot": {"x":0.5,"y":0.5}
  },
    {
      "filename": "red_boat_10", // 112.5 градусов
      "frame": {"x":253,"y":4,"w":26,"h":20},
      "trimmed": false,
      "spriteSourceSize": {"x":0,"y":0,"w":26,"h":20},
      "sourceSize": {"w":26,"h":20},
      "pivot": {"x":0.5,"y":0.5}
    },
    {
      "filename": "red_boat_11", // 123.75 градусов
      "frame": {"x":282,"y":3,"w":24,"h":22},
      "trimmed": false,
      "spriteSourceSize": {"x":0,"y":0,"w":24,"h":21},
      "sourceSize": {"w":24,"h":21},
      "pivot": {"x":0.5,"y":0.5}
    },
    {
      "filename": "red_boat_12", // 135 градусов
      "frame": {"x":308,"y":2,"w":24,"h":22},
      "trimmed": false,
      "spriteSourceSize": {"x":0,"y":0,"w":24,"h":21},
      "sourceSize": {"w":24,"h":21},
      "pivot": {"x":0.5,"y":0.5}
    },
    {
      "filename": "red_boat_13", // 146.25 градусов
      "frame": {"x":334,"y":2,"w":20,"h":22},
      "trimmed": false,
      "spriteSourceSize": {"x":0,"y":0,"w":24,"h":22},
      "sourceSize": {"w":24,"h":22},
      "pivot": {"x":0.5,"y":0.5}
    },
    {
      "filename": "red_boat_14", // 157.5 градусов
      "frame": {"x":357,"y":1,"w":20,"h":24},
      "trimmed": false,
      "spriteSourceSize": {"x":0,"y":0,"w":19,"h":23},
      "sourceSize": {"w":19,"h":23},
      "pivot": {"x":0.5,"y":0.5}
    },
    {
      "filename": "red_boat_15", // 168.75 градусов
      "frame": {"x":378,"y":2,"w":18,"h":24},
      "trimmed": false,
      "spriteSourceSize": {"x":0,"y":0,"w":18,"h":24},
      "sourceSize": {"w":18,"h":24},
      "pivot": {"x":0.5,"y":0.5}
    },
    {
      "filename": "red_boat_16", // 180 градусов
      "frame": {"x":398,"y":0,"w":18,"h":24},
      "trimmed": false,
      "spriteSourceSize": {"x":0,"y":0,"w":17,"h":24},
      "sourceSize": {"w":17,"h":24},
      "pivot": {"x":0.5,"y":0.5}
    },
]};

// spriteConfig: {
//     // Для углов свыше 180 и до 360 - отображаем отражённые спрайты
//     17: {sx: 378, sy: 0, h: 24, w: 18, mirror: true}, // 191.25 градусов
//     18: {sx: 357, sy: 1, h: 23, w: 19, mirror: true}, // 202.5 градусов
//     19: {sx: 334, sy: 2, h: 22, w: 20, mirror: true}, // 213.75 градусов
//     20: {sx: 308, sy: 2, h: 21, w: 24, mirror: true}, // 225 градусов
//     21: {sx: 282, sy: 3, h: 21, w: 24, mirror: true}, // 236.25 градусов
//     22: {sx: 253, sy: 4, h: 19, w: 26, mirror: true}, // 247.5 градусов
//     23: {sx: 224, sy: 4, h: 20, w: 26, mirror: true}, // 258.75 градусов
//     24: {sx: 195, sy: 5, h: 19, w: 26, mirror: true}, // 270 градусов
//     25: {sx: 166, sy: 4, h: 20, w: 26, mirror: true}, // 281.25 градусов
//     26: {sx: 138, sy: 3, h: 20, w: 24, mirror: true}, // 292.5 градусов
//     27: {sx: 111, sy: 3, h: 20, w: 24, mirror: true}, // 303.75 градусов
//     28: {sx: 85, sy: 2, h: 20, w: 23, mirror: true}, // 315 градусов
//     29: {sx: 62, sy: 0, h: 24, w: 20, mirror: true}, // 326.25 градусов
//     30: {sx: 41, sy: 0, h: 24, w: 19, mirror: true}, // 337.5 градуса
//     31: {sx: 20, sy: 0, h: 24, w: 18, mirror: true}, // 348.75 градусов
// },
//
