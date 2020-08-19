/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Phaser = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(scene, x, y) {
        var _this = _super.call(this, scene, x, y, 'red_boat') || this;
        _this.playerSpriteRotateSize = 11.25; // 11.25 градусов на спрайт
        _this.direction = 0;
        _this.speed = 0;
        _this.SPEED_LIMIT = 150;
        _this.BACKWARD_SPEED_LIMIT = -50;
        _this.ACCELERATION = 30; // m/sec^2
        _this.DECELERATION = 50; // m/sec^2
        _this.ROTATE_SPEED = 90; // Degrees per second
        _this.sprite = _this.scene.physics.add.sprite(x, y, 'red_boat', 'red_boat_0');
        return _this;
    }
    Player.prototype.getPlayerSpriteByDirection = function (player, directionInDeg) {
        var halfStep = this.playerSpriteRotateSize / 2;
        // 5.625 - половина от шага поворота. Спрайт смотрит в определённый угол и плюс-минус половина шага.
        var index = 0;
        if ((directionInDeg > (360 - halfStep)) || directionInDeg < halfStep) {
            index = 0;
        }
        else if ((directionInDeg > (11.25 - halfStep)) && (directionInDeg < (11.25 + halfStep))) {
            index = 1;
        }
        else if (directionInDeg > (22.5 - halfStep) && directionInDeg < (22.5 + halfStep)) {
            index = 2;
        }
        else if (directionInDeg > (33.75 - halfStep) && directionInDeg < (33.75 + halfStep)) {
            index = 3;
        }
        else if (directionInDeg > (45 - halfStep) && directionInDeg < (45 + halfStep)) {
            index = 4;
        }
        else if (directionInDeg > (56.25 - halfStep) && directionInDeg < (56.25 + halfStep)) {
            index = 5;
        }
        else if (directionInDeg > (67.5 - halfStep) && directionInDeg < (67.5 + halfStep)) {
            index = 6;
        }
        else if (directionInDeg > (78.75 - halfStep) && directionInDeg < (78.75 + halfStep)) {
            index = 7;
        }
        else if (directionInDeg > (90 - halfStep) && directionInDeg < (90 + halfStep)) {
            index = 8;
        }
        else if (directionInDeg > (101.25 - halfStep) && directionInDeg < (101.25 + halfStep)) {
            index = 9;
        }
        else if (directionInDeg > (112.5 - halfStep) && directionInDeg < (112.5 + halfStep)) {
            index = 10;
        }
        else if (directionInDeg > (123.75 - halfStep) && directionInDeg < (123.75 + halfStep)) {
            index = 11;
        }
        else if (directionInDeg > (135 - halfStep) && directionInDeg < (135 + halfStep)) {
            index = 12;
        }
        else if (directionInDeg > (146.25 - halfStep) && directionInDeg < (146.25 + halfStep)) {
            index = 13;
        }
        else if (directionInDeg > (157.5 - halfStep) && directionInDeg < (157.5 + halfStep)) {
            index = 14;
        }
        else if (directionInDeg > (168.75 - halfStep) && directionInDeg < (168.75 + halfStep)) {
            index = 15;
        }
        else if (directionInDeg > (180 - halfStep) && directionInDeg < (180 + halfStep)) {
            index = 16;
        }
        else if (directionInDeg > (191.25 - halfStep) && directionInDeg < (191.25 + halfStep)) {
            index = 17;
        }
        else if (directionInDeg > (202.5 - halfStep) && directionInDeg < (202.5 + halfStep)) {
            index = 18;
        }
        else if (directionInDeg > (213.75 - halfStep) && directionInDeg < (213.75 + halfStep)) {
            index = 19;
        }
        else if (directionInDeg > (225 - halfStep) && directionInDeg < (225 + halfStep)) {
            index = 20;
        }
        else if (directionInDeg > (236.25 - halfStep) && directionInDeg < (236.25 + halfStep)) {
            index = 21;
        }
        else if (directionInDeg > (247.5 - halfStep) && directionInDeg < (247.5 + halfStep)) {
            index = 22;
        }
        else if (directionInDeg > (258.75 - halfStep) && directionInDeg < (258.75 + halfStep)) {
            index = 23;
        }
        else if (directionInDeg > (270 - halfStep) && directionInDeg < (270 + halfStep)) {
            index = 24;
        }
        else if (directionInDeg > (281.25 - halfStep) && directionInDeg < (281.25 + halfStep)) {
            index = 25;
        }
        else if (directionInDeg > (292.5 - halfStep) && directionInDeg < (292.5 + halfStep)) {
            index = 26;
        }
        else if (directionInDeg > (303.75 - halfStep) && directionInDeg < (303.75 + halfStep)) {
            index = 27;
        }
        else if (directionInDeg > (315 - halfStep) && directionInDeg < (315 + halfStep)) {
            index = 28;
        }
        else if (directionInDeg > (326.25 - halfStep) && directionInDeg < (326.25 + halfStep)) {
            index = 29;
        }
        else if (directionInDeg > (337.5 - halfStep) && directionInDeg < (337.5 + halfStep)) {
            index = 30;
        }
        else if (directionInDeg > (348.75 - halfStep) && directionInDeg < (348.75 + halfStep)) {
            index = 31;
        }
        var num = index;
        if (index > 16) {
            num = 31 - index;
            return { name: 'red_boat_' + num, flipX: true };
        }
        return { name: 'red_boat_' + num, flipX: false };
    };
    ;
    Player.prototype.update = function (time, delta) {
        var tDiff = delta / 1000;
        var cursors = this.scene.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.direction -= (this.ROTATE_SPEED * tDiff);
            if (this.direction < 0) {
                this.direction = 360 - (this.direction);
            }
        }
        else if (cursors.right.isDown) {
            this.direction += (this.ROTATE_SPEED * tDiff);
            if (this.direction > 360) {
                this.direction = this.direction - 360;
            }
        }
        if (cursors.up.isDown) {
            this.speed += (this.ACCELERATION * tDiff);
            if (this.speed > this.SPEED_LIMIT) {
                this.speed = this.SPEED_LIMIT;
            }
        }
        else if (cursors.down.isDown) {
            this.speed -= (this.DECELERATION * tDiff);
            if (this.speed < this.BACKWARD_SPEED_LIMIT) {
                this.speed = this.BACKWARD_SPEED_LIMIT;
            }
        }
        // после всех изменений проапдейтим горизонтальную и вертикальную скорости
        this.updateVelocities();
        if (cursors.space.isDown) {
            if (this.speed > 0) {
                this.speed -= (this.DECELERATION * tDiff);
                if (this.speed < 0) {
                    this.speed = 0;
                }
            }
            else if (this.speed < 0) {
                this.speed += (this.DECELERATION * tDiff);
                if (this.speed > 0) {
                    this.speed = 0;
                }
            }
            this.updateVelocities();
        }
        // взять нужный спрайт, подставить в отображение
        var config = this.getPlayerSpriteByDirection(this, this.direction);
        this.sprite.destroy();
        this.sprite = this.scene.physics.add.sprite(Math.floor(this.body.position.x), Math.floor(this.body.position.y), 'red_boat', config.name);
        if (config.flipX) {
            this.sprite.flipX = true;
        }
        this.sprite.setOriginFromFrame();
    };
    Player.prototype.updateVelocities = function () {
        var directionInRad = this.direction * Math.PI / 180;
        this.setVelocityX(this.speed * Math.sin(directionInRad));
        this.setVelocityY(-1 * this.speed * Math.cos(directionInRad));
    };
    return Player;
}(Phaser.Physics.Arcade.Sprite));
exports.Player = Player;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Phaser = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
var GameScene_1 = __webpack_require__(/*! ./scenes/GameScene */ "./src/scenes/GameScene.ts");
// the game itself
var game;
window.onload = function () {
    var gameConfig = {
        title: 'Sample',
        type: Phaser.AUTO,
        scale: {
            width: 800,
            height: 600,
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: true,
            },
        },
        scene: [GameScene_1.GameScene],
        parent: 'game',
        backgroundColor: '#aaaaff',
    };
    game = new Phaser.Game(gameConfig);
};


/***/ }),

/***/ "./src/scenes/GameScene.ts":
/*!*********************************!*\
  !*** ./src/scenes/GameScene.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameScene = void 0;
var Phaser = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
var Player_1 = __webpack_require__(/*! ../Player */ "./src/Player.ts");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = this;
        var sceneConfig = {
            active: false,
            visible: false,
            key: 'Game',
        };
        _this = _super.call(this, sceneConfig) || this;
        return _this;
    }
    GameScene.prototype.preload = function () {
        this.load.setBaseURL();
        this.load.atlas('red_boat', 'assets/atlas/boatsSpriteListTransparent.png', 'assets/atlas/redBoatSpriteListConfig.json');
        this.load.image('tiles', 'assets/tilemaps/WaterMazeTiles.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/WaterMazeMap.json');
    };
    GameScene.prototype.create = function () {
        var map = this.make.tilemap({ key: 'map' });
        // The first parameter is the name of the tileset in Tiled and the second parameter is the key
        // of the tileset image used when loading the file in preload.
        var tiles = map.addTilesetImage('cybernoid', 'tiles');
        // You can load a layer from the map using the layer name from Tiled, or by using the layer
        // index (0 in this case).
        this.layer = map.createStaticLayer(0, tiles, 0, 0);
        // TODO: научится бы корректно нужные спрайты для тайлов указывать.
        // TODO: и соответственно - их проверять
        map.setCollisionBetween(86, 999, true, false, this.layer);
        // let shapeGraphics = this.add.graphics();
        // this.drawCollisionShapes(shapeGraphics);
        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        var player = new Player_1.Player(this, 100, 100);
        this.player = this.physics.add.existing(player);
    };
    GameScene.prototype.update = function (time, delta) {
        var cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.update(time, delta);
        this.physics.collide(this.player, this.layer);
    };
    GameScene.prototype.drawCollisionShapes = function (graphics) {
        graphics.clear();
        // Loop over each tile and visualize its collision shape (if it has one)
        this.layer.forEachTile(function (tile) {
            var tileWorldX = tile.getLeft();
            var tileWorldY = tile.getTop();
            var collisionGroup = tile.getCollisionGroup();
            // console.log(collisionGroup);
            if (!collisionGroup || collisionGroup.objects.length === 0) {
                return;
            }
            // The group will have an array of objects - these are the individual collision shapes
            var objects = collisionGroup.objects;
            for (var i = 0; i < objects.length; i++) {
                var object = objects[i];
                var objectX = tileWorldX + object.x;
                var objectY = tileWorldY + object.y;
                // When objects are parsed by Phaser, they will be guaranteed to have one of the
                // following properties if they are a rectangle/ellipse/polygon/polyline.
                if (object.rectangle) {
                    graphics.strokeRect(objectX, objectY, object.width, object.height);
                }
                else if (object.ellipse) {
                    // Ellipses in Tiled have a top-left origin, while ellipses in Phaser have a center
                    // origin
                    graphics.strokeEllipse(objectX + object.width / 2, objectY + object.height / 2, object.width, object.height);
                }
                else if (object.polygon || object.polyline) {
                    var originalPoints = object.polygon ? object.polygon : object.polyline;
                    var points = [];
                    for (var j = 0; j < originalPoints.length; j++) {
                        var point = originalPoints[j];
                        points.push({
                            x: objectX + point.x,
                            y: objectY + point.y
                        });
                    }
                    graphics.strokePoints(points);
                }
            }
        });
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;


/***/ }),

/***/ 0:
/*!***************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://0.0.0.0:8080 ./src/main.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /var/www/node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:8080 */"./node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:8080");
module.exports = __webpack_require__(/*! ./src/main.ts */"./src/main.ts");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3Qgc3luYyBub25yZWN1cnNpdmUgXlxcLlxcL2xvZyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BsYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NlbmVzL0dhbWVTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FB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SyxDQUFDLENBQUM7NEJBQ3BCLENBQUMsRUFBRSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUM7eUJBQ3ZCLENBQUMsQ0FBQztxQkFDTjtvQkFDRCxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNqQzthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLENBcEg4QixNQUFNLENBQUMsS0FBSyxHQW9IMUM7QUFwSFksOEJBQVMiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhcHBcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMCxcInZlbmRvcnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vbG9nXCI6IFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90IHN5bmMgXlxcXFwuXFxcXC9sb2ckXCI7IiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gXCJwaGFzZXJcIjtcbmltcG9ydCB7R2FtZVNjZW5lfSBmcm9tIFwiLi9zY2VuZXMvR2FtZVNjZW5lXCI7XG5pbXBvcnQgQm9keSA9IFBoYXNlci5QaHlzaWNzLkFyY2FkZS5Cb2R5O1xuXG5leHBvcnQgY2xhc3MgUGxheWVyIGV4dGVuZHMgUGhhc2VyLlBoeXNpY3MuQXJjYWRlLlNwcml0ZSB7XG4gICAgcHJvdGVjdGVkIHBsYXllclNwcml0ZVJvdGF0ZVNpemUgPSAxMS4yNTsgLy8gMTEuMjUg0LPRgNCw0LTRg9GB0L7QsiDQvdCwINGB0L/RgNCw0LnRglxuICAgIHByb3RlY3RlZCBkaXJlY3Rpb246IG51bWJlciA9IDA7XG4gICAgcHJvdGVjdGVkIHNwZWVkOiBudW1iZXIgPSAwO1xuXG4gICAgcHJvdGVjdGVkIFNQRUVEX0xJTUlUOiBudW1iZXIgPSAxNTA7XG4gICAgcHJvdGVjdGVkIEJBQ0tXQVJEX1NQRUVEX0xJTUlUOiBudW1iZXIgPSAtNTA7XG4gICAgcHJvdGVjdGVkIEFDQ0VMRVJBVElPTjogbnVtYmVyID0gMzA7IC8vIG0vc2VjXjJcbiAgICBwcm90ZWN0ZWQgREVDRUxFUkFUSU9OOiBudW1iZXIgPSA1MDsgLy8gbS9zZWNeMlxuICAgIHByb3RlY3RlZCBST1RBVEVfU1BFRUQ6IG51bWJlciA9IDkwOyAvLyBEZWdyZWVzIHBlciBzZWNvbmRcblxuICAgIHByaXZhdGUgc3ByaXRlOiBQaGFzZXIuVHlwZXMuUGh5c2ljcy5BcmNhZGUuU3ByaXRlV2l0aER5bmFtaWNCb2R5O1xuXG4gICAgY29uc3RydWN0b3Ioc2NlbmU6IEdhbWVTY2VuZSwgeDogaW50ZWdlciwgeTogaW50ZWdlcikge1xuICAgICAgICBzdXBlcihzY2VuZSwgeCwgeSwgJ3JlZF9ib2F0Jyk7XG5cbiAgICAgICAgdGhpcy5zcHJpdGUgPSB0aGlzLnNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZSh4LCB5LCAncmVkX2JvYXQnLCAncmVkX2JvYXRfMCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UGxheWVyU3ByaXRlQnlEaXJlY3Rpb24ocGxheWVyLCBkaXJlY3Rpb25JbkRlZykgOiB7bmFtZTogc3RyaW5nLCBmbGlwWDogYm9vbGVhbn0ge1xuICAgICAgICBsZXQgaGFsZlN0ZXAgPSB0aGlzLnBsYXllclNwcml0ZVJvdGF0ZVNpemUgLyAyO1xuICAgICAgICAvLyA1LjYyNSAtINC/0L7Qu9C+0LLQuNC90LAg0L7RgiDRiNCw0LPQsCDQv9C+0LLQvtGA0L7RgtCwLiDQodC/0YDQsNC50YIg0YHQvNC+0YLRgNC40YIg0LIg0L7Qv9GA0LXQtNC10LvRkdC90L3Ri9C5INGD0LPQvtC7INC4INC/0LvRjtGBLdC80LjQvdGD0YEg0L/QvtC70L7QstC40L3QsCDRiNCw0LPQsC5cbiAgICAgICAgbGV0IGluZGV4ID0gMDtcblxuICAgICAgICBpZiAoIChkaXJlY3Rpb25JbkRlZyA+ICgzNjAgLSBoYWxmU3RlcCkpIHx8IGRpcmVjdGlvbkluRGVnIDwgaGFsZlN0ZXApIHtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICggKGRpcmVjdGlvbkluRGVnID4gKDExLjI1IC0gaGFsZlN0ZXApKSAmJiAoZGlyZWN0aW9uSW5EZWcgPCAoMTEuMjUgKyBoYWxmU3RlcCkpICkge1xuICAgICAgICAgICAgaW5kZXggPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDIyLjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjIuNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDMzLjc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDMzLjc1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDM7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoNDUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoNDUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gNDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICg1Ni4yNSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICg1Ni4yNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSA1O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDY3LjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoNjcuNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSA2O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDc4Ljc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDc4Ljc1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoOTAgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoOTAgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gODtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgxMDEuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTAxLjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTEyLjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTEyLjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTA7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTIzLjc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDEyMy43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAxMTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgxMzUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTM1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDEyO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDE0Ni4yNSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgxNDYuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTM7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTU3LjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTU3LjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTY4Ljc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDE2OC43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAxNTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgxODAgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTgwICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDE2O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDE5MS4yNSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgxOTEuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjAyLjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjAyLjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTg7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjEzLjc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDIxMy43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAxOTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDIwO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDIzNi4yNSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgyMzYuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjQ3LjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjQ3LjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjI7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjU4Ljc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDI1OC43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyMztcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyNzAgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjcwICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI0O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDI4MS4yNSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgyODEuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjU7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjkyLjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjkyLjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjY7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMzAzLjc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDMwMy43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyNztcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgzMTUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMzE1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI4O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDMyNi4yNSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgzMjYuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMzM3LjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMzM3LjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMzA7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMzQ4Ljc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDM0OC43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAzMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBudW0gPSBpbmRleDtcbiAgICAgICAgaWYgKGluZGV4ID4gMTYpIHtcbiAgICAgICAgICAgIG51bSA9IDMxIC0gaW5kZXg7XG4gICAgICAgICAgICByZXR1cm4ge25hbWU6ICdyZWRfYm9hdF8nICsgbnVtLCBmbGlwWDogdHJ1ZX07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtuYW1lOiAncmVkX2JvYXRfJyArIG51bSwgZmxpcFg6IGZhbHNlfTtcbiAgICB9O1xuXG4gICAgcHVibGljIHVwZGF0ZSh0aW1lLCBkZWx0YSkge1xuICAgICAgICBsZXQgdERpZmYgPSBkZWx0YSAvIDEwMDA7XG4gICAgICAgIGxldCBjdXJzb3JzID0gdGhpcy5zY2VuZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XG5cbiAgICAgICAgaWYgKGN1cnNvcnMubGVmdC5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uIC09ICh0aGlzLlJPVEFURV9TUEVFRCAqIHREaWZmKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IDM2MCAtICh0aGlzLmRpcmVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY3Vyc29ycy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uICs9ICh0aGlzLlJPVEFURV9TUEVFRCAqIHREaWZmKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA+IDM2MCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb24gLSAzNjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnNvcnMudXAuaXNEb3duKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkICs9ICh0aGlzLkFDQ0VMRVJBVElPTiAqIHREaWZmKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkID4gdGhpcy5TUEVFRF9MSU1JVCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSB0aGlzLlNQRUVEX0xJTUlUO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGN1cnNvcnMuZG93bi5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgLT0gKHRoaXMuREVDRUxFUkFUSU9OICogdERpZmYpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWQgPCB0aGlzLkJBQ0tXQVJEX1NQRUVEX0xJTUlUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IHRoaXMuQkFDS1dBUkRfU1BFRURfTElNSVQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8g0L/QvtGB0LvQtSDQstGB0LXRhSDQuNC30LzQtdC90LXQvdC40Lkg0L/RgNC+0LDQv9C00LXQudGC0LjQvCDQs9C+0YDQuNC30L7QvdGC0LDQu9GM0L3Rg9GOINC4INCy0LXRgNGC0LjQutCw0LvRjNC90YPRjiDRgdC60L7RgNC+0YHRgtC4XG4gICAgICAgIHRoaXMudXBkYXRlVmVsb2NpdGllcygpO1xuXG4gICAgICAgIGlmIChjdXJzb3JzLnNwYWNlLmlzRG93bikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWQgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCAtPSAodGhpcy5ERUNFTEVSQVRJT04gKiB0RGlmZik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zcGVlZCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkICs9ICh0aGlzLkRFQ0VMRVJBVElPTiAqIHREaWZmKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZlbG9jaXRpZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCy0LfRj9GC0Ywg0L3Rg9C20L3Ri9C5INGB0L/RgNCw0LnRgiwg0L/QvtC00YHRgtCw0LLQuNGC0Ywg0LIg0L7RgtC+0LHRgNCw0LbQtdC90LjQtVxuICAgICAgICBsZXQgY29uZmlnID0gdGhpcy5nZXRQbGF5ZXJTcHJpdGVCeURpcmVjdGlvbih0aGlzLCB0aGlzLmRpcmVjdGlvbik7XG4gICAgICAgIHRoaXMuc3ByaXRlLmRlc3Ryb3koKTtcblxuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMuc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKFxuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLmJvZHkucG9zaXRpb24ueCksXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuYm9keS5wb3NpdGlvbi55KSxcbiAgICAgICAgICAgICdyZWRfYm9hdCcsXG4gICAgICAgICAgICBjb25maWcubmFtZVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChjb25maWcuZmxpcFgpIHtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLmZsaXBYID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNwcml0ZS5zZXRPcmlnaW5Gcm9tRnJhbWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZlbG9jaXRpZXMoKSB7XG4gICAgICAgIGxldCBkaXJlY3Rpb25JblJhZCA9IHRoaXMuZGlyZWN0aW9uICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgdGhpcy5zZXRWZWxvY2l0eVgodGhpcy5zcGVlZCAqIE1hdGguc2luKGRpcmVjdGlvbkluUmFkKSk7XG4gICAgICAgIHRoaXMuc2V0VmVsb2NpdHlZKC0xICogdGhpcy5zcGVlZCAqIE1hdGguY29zKGRpcmVjdGlvbkluUmFkKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gJ3BoYXNlcic7XG5pbXBvcnQge0dhbWVTY2VuZX0gZnJvbSBcIi4vc2NlbmVzL0dhbWVTY2VuZVwiO1xuXG4vLyB0aGUgZ2FtZSBpdHNlbGZcbmxldCBnYW1lO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgZ2FtZUNvbmZpZzogUGhhc2VyLlR5cGVzLkNvcmUuR2FtZUNvbmZpZyA9IHtcbiAgICAgICAgdGl0bGU6ICdTYW1wbGUnLFxuICAgICAgICB0eXBlOiBQaGFzZXIuQVVUTyxcbiAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMCxcbiAgICAgICAgfSxcbiAgICAgICAgcGh5c2ljczoge1xuICAgICAgICAgICAgZGVmYXVsdDogJ2FyY2FkZScsXG4gICAgICAgICAgICBhcmNhZGU6IHtcbiAgICAgICAgICAgICAgICBkZWJ1ZzogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHNjZW5lOiBbR2FtZVNjZW5lXSxcbiAgICAgICAgcGFyZW50OiAnZ2FtZScsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNhYWFhZmYnLFxuICAgIH07XG5cbiAgICBnYW1lID0gbmV3IFBoYXNlci5HYW1lKGdhbWVDb25maWcpO1xufTtcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XG5pbXBvcnQge1BsYXllcn0gZnJvbSBcIi4uL1BsYXllclwiO1xuaW1wb3J0IEdhbWVPYmplY3RXaXRoQm9keSA9IFBoYXNlci5UeXBlcy5QaHlzaWNzLkFyY2FkZS5HYW1lT2JqZWN0V2l0aEJvZHk7XG5pbXBvcnQgU3RhdGljVGlsZW1hcExheWVyID0gUGhhc2VyLlRpbGVtYXBzLlN0YXRpY1RpbGVtYXBMYXllcjtcblxuZXhwb3J0IGNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFBoYXNlci5TY2VuZSB7XG4gICAgcHJpdmF0ZSBwbGF5ZXI6IEdhbWVPYmplY3RXaXRoQm9keTtcblxuICAgIHByaXZhdGUgbGF5ZXI6IFN0YXRpY1RpbGVtYXBMYXllcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zdCBzY2VuZUNvbmZpZzogUGhhc2VyLlR5cGVzLlNjZW5lcy5TZXR0aW5nc0NvbmZpZyA9IHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogJ0dhbWUnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKHNjZW5lQ29uZmlnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZCgpIHtcbiAgICAgICAgdGhpcy5sb2FkLnNldEJhc2VVUkwoKTtcbiAgICAgICAgdGhpcy5sb2FkLmF0bGFzKFxuICAgICAgICAgICAgJ3JlZF9ib2F0JyxcbiAgICAgICAgICAgICdhc3NldHMvYXRsYXMvYm9hdHNTcHJpdGVMaXN0VHJhbnNwYXJlbnQucG5nJyxcbiAgICAgICAgICAgICdhc3NldHMvYXRsYXMvcmVkQm9hdFNwcml0ZUxpc3RDb25maWcuanNvbidcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3RpbGVzJywgJ2Fzc2V0cy90aWxlbWFwcy9XYXRlck1hemVUaWxlcy5wbmcnKTtcbiAgICAgICAgdGhpcy5sb2FkLnRpbGVtYXBUaWxlZEpTT04oJ21hcCcsICdhc3NldHMvdGlsZW1hcHMvV2F0ZXJNYXplTWFwLmpzb24nKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlKCkge1xuICAgICAgICBsZXQgbWFwID0gdGhpcy5tYWtlLnRpbGVtYXAoeyBrZXk6ICdtYXAnIH0pO1xuXG4gICAgICAgIC8vIFRoZSBmaXJzdCBwYXJhbWV0ZXIgaXMgdGhlIG5hbWUgb2YgdGhlIHRpbGVzZXQgaW4gVGlsZWQgYW5kIHRoZSBzZWNvbmQgcGFyYW1ldGVyIGlzIHRoZSBrZXlcbiAgICAgICAgLy8gb2YgdGhlIHRpbGVzZXQgaW1hZ2UgdXNlZCB3aGVuIGxvYWRpbmcgdGhlIGZpbGUgaW4gcHJlbG9hZC5cbiAgICAgICAgbGV0IHRpbGVzID0gbWFwLmFkZFRpbGVzZXRJbWFnZSgnY3liZXJub2lkJywgJ3RpbGVzJyk7XG5cbiAgICAgICAgLy8gWW91IGNhbiBsb2FkIGEgbGF5ZXIgZnJvbSB0aGUgbWFwIHVzaW5nIHRoZSBsYXllciBuYW1lIGZyb20gVGlsZWQsIG9yIGJ5IHVzaW5nIHRoZSBsYXllclxuICAgICAgICAvLyBpbmRleCAoMCBpbiB0aGlzIGNhc2UpLlxuICAgICAgICB0aGlzLmxheWVyID0gbWFwLmNyZWF0ZVN0YXRpY0xheWVyKDAsIHRpbGVzLCAwLCAwKTtcblxuICAgICAgICAvLyBUT0RPOiDQvdCw0YPRh9C40YLRgdGPINCx0Ysg0LrQvtGA0YDQtdC60YLQvdC+INC90YPQttC90YvQtSDRgdC/0YDQsNC50YLRiyDQtNC70Y8g0YLQsNC50LvQvtCyINGD0LrQsNC30YvQstCw0YLRjC5cbiAgICAgICAgLy8gVE9ETzog0Lgg0YHQvtC+0YLQstC10YLRgdGC0LLQtdC90L3QviAtINC40YUg0L/RgNC+0LLQtdGA0Y/RgtGMXG4gICAgICAgIG1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDg2LCA5OTksIHRydWUsIGZhbHNlLCB0aGlzLmxheWVyKTtcblxuICAgICAgICAvLyBsZXQgc2hhcGVHcmFwaGljcyA9IHRoaXMuYWRkLmdyYXBoaWNzKCk7XG4gICAgICAgIC8vIHRoaXMuZHJhd0NvbGxpc2lvblNoYXBlcyhzaGFwZUdyYXBoaWNzKTtcblxuICAgICAgICAvLyB0aGlzLmNhbWVyYXMubWFpbi5zZXRCb3VuZHMoMCwgMCwgbWFwLndpZHRoSW5QaXhlbHMsIG1hcC5oZWlnaHRJblBpeGVscyk7XG5cbiAgICAgICAgbGV0IHBsYXllciA9IG5ldyBQbGF5ZXIodGhpcywgMTAwLCAxMDApO1xuICAgICAgICB0aGlzLnBsYXllciA9IHRoaXMucGh5c2ljcy5hZGQuZXhpc3RpbmcocGxheWVyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKHRpbWUsIGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvcktleXMgPSB0aGlzLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcblxuICAgICAgICB0aGlzLnBsYXllci51cGRhdGUodGltZSwgZGVsdGEpO1xuXG4gICAgICAgIHRoaXMucGh5c2ljcy5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxheWVyKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgZHJhd0NvbGxpc2lvblNoYXBlcyAoZ3JhcGhpY3MpXG4gICAge1xuICAgICAgICBncmFwaGljcy5jbGVhcigpO1xuXG4gICAgICAgIC8vIExvb3Agb3ZlciBlYWNoIHRpbGUgYW5kIHZpc3VhbGl6ZSBpdHMgY29sbGlzaW9uIHNoYXBlIChpZiBpdCBoYXMgb25lKVxuICAgICAgICB0aGlzLmxheWVyLmZvckVhY2hUaWxlKGZ1bmN0aW9uICh0aWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdGlsZVdvcmxkWCA9IHRpbGUuZ2V0TGVmdCgpO1xuICAgICAgICAgICAgdmFyIHRpbGVXb3JsZFkgPSB0aWxlLmdldFRvcCgpO1xuICAgICAgICAgICAgdmFyIGNvbGxpc2lvbkdyb3VwID0gdGlsZS5nZXRDb2xsaXNpb25Hcm91cCgpO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb2xsaXNpb25Hcm91cCk7XG5cbiAgICAgICAgICAgIGlmICghY29sbGlzaW9uR3JvdXAgfHwgY29sbGlzaW9uR3JvdXAub2JqZWN0cy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIC8vIFRoZSBncm91cCB3aWxsIGhhdmUgYW4gYXJyYXkgb2Ygb2JqZWN0cyAtIHRoZXNlIGFyZSB0aGUgaW5kaXZpZHVhbCBjb2xsaXNpb24gc2hhcGVzXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IGNvbGxpc2lvbkdyb3VwLm9iamVjdHM7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0ID0gb2JqZWN0c1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0WCA9IHRpbGVXb3JsZFggKyBvYmplY3QueDtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0WSA9IHRpbGVXb3JsZFkgKyBvYmplY3QueTtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gb2JqZWN0cyBhcmUgcGFyc2VkIGJ5IFBoYXNlciwgdGhleSB3aWxsIGJlIGd1YXJhbnRlZWQgdG8gaGF2ZSBvbmUgb2YgdGhlXG4gICAgICAgICAgICAgICAgLy8gZm9sbG93aW5nIHByb3BlcnRpZXMgaWYgdGhleSBhcmUgYSByZWN0YW5nbGUvZWxsaXBzZS9wb2x5Z29uL3BvbHlsaW5lLlxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QucmVjdGFuZ2xlKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlUmVjdChvYmplY3RYLCBvYmplY3RZLCBvYmplY3Qud2lkdGgsIG9iamVjdC5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmplY3QuZWxsaXBzZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEVsbGlwc2VzIGluIFRpbGVkIGhhdmUgYSB0b3AtbGVmdCBvcmlnaW4sIHdoaWxlIGVsbGlwc2VzIGluIFBoYXNlciBoYXZlIGEgY2VudGVyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yaWdpblxuICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5zdHJva2VFbGxpcHNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0WCArIG9iamVjdC53aWR0aCAvIDIsIG9iamVjdFkgKyBvYmplY3QuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC53aWR0aCwgb2JqZWN0LmhlaWdodFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmplY3QucG9seWdvbiB8fCBvYmplY3QucG9seWxpbmUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxQb2ludHMgPSBvYmplY3QucG9seWdvbiA/IG9iamVjdC5wb2x5Z29uIDogb2JqZWN0LnBvbHlsaW5lO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9pbnRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb3JpZ2luYWxQb2ludHMubGVuZ3RoOyBqKyspXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IG9yaWdpbmFsUG9pbnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IG9iamVjdFggKyBwb2ludC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IG9iamVjdFkgKyBwb2ludC55XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5zdHJva2VQb2ludHMocG9pbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=