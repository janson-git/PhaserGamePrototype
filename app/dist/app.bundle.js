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
    };
    GameScene.prototype.create = function () {
        this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF);
        this.physics.add.existing(this.square);
        var player = new Player_1.Player(this, 100, 100);
        this.player = this.physics.add.existing(player);
    };
    GameScene.prototype.update = function (time, delta) {
        var cursorKeys = this.input.keyboard.createCursorKeys();
        if (cursorKeys.up.isDown) {
            this.square.body.setVelocityY(-5);
        }
        else if (cursorKeys.down.isDown) {
            this.square.body.setVelocityY(5);
        }
        else {
            this.square.body.setVelocityY(0);
        }
        if (cursorKeys.right.isDown) {
            this.square.body.setVelocityX(5);
        }
        else if (cursorKeys.left.isDown) {
            this.square.body.setVelocityX(-5);
        }
        else {
            this.square.body.setVelocityX(0);
        }
        this.player.update(time, delta);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3Qgc3luYyBub25yZWN1cnNpdmUgXlxcLlxcL2xvZyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BsYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NlbmVzL0dhbWVTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FB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QUMsTUFBTSxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxDQXBEOEIsTUFBTSxDQUFDLEtBQUssR0FvRDFDO0FBcERZLDhCQUFTIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiYXBwXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzAsXCJ2ZW5kb3JzXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL2xvZ1wiOiBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdCBzeW5jIF5cXFxcLlxcXFwvbG9nJFwiOyIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XG5pbXBvcnQge0dhbWVTY2VuZX0gZnJvbSBcIi4vc2NlbmVzL0dhbWVTY2VuZVwiO1xuaW1wb3J0IEJvZHkgPSBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuQm9keTtcblxuZXhwb3J0IGNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5QaHlzaWNzLkFyY2FkZS5TcHJpdGUge1xuICAgIHByb3RlY3RlZCBwbGF5ZXJTcHJpdGVSb3RhdGVTaXplID0gMTEuMjU7IC8vIDExLjI1INCz0YDQsNC00YPRgdC+0LIg0L3QsCDRgdC/0YDQsNC50YJcbiAgICBwcm90ZWN0ZWQgZGlyZWN0aW9uOiBudW1iZXIgPSAwO1xuICAgIHByb3RlY3RlZCBzcGVlZDogbnVtYmVyID0gMDtcblxuICAgIHByb3RlY3RlZCBTUEVFRF9MSU1JVDogbnVtYmVyID0gMTUwO1xuICAgIHByb3RlY3RlZCBCQUNLV0FSRF9TUEVFRF9MSU1JVDogbnVtYmVyID0gLTUwO1xuICAgIHByb3RlY3RlZCBBQ0NFTEVSQVRJT046IG51bWJlciA9IDMwOyAvLyBtL3NlY14yXG4gICAgcHJvdGVjdGVkIERFQ0VMRVJBVElPTjogbnVtYmVyID0gNTA7IC8vIG0vc2VjXjJcbiAgICBwcm90ZWN0ZWQgUk9UQVRFX1NQRUVEOiBudW1iZXIgPSA5MDsgLy8gRGVncmVlcyBwZXIgc2Vjb25kXG5cbiAgICBwcml2YXRlIHNwcml0ZTogUGhhc2VyLlR5cGVzLlBoeXNpY3MuQXJjYWRlLlNwcml0ZVdpdGhEeW5hbWljQm9keTtcblxuICAgIGNvbnN0cnVjdG9yKHNjZW5lOiBHYW1lU2NlbmUsIHg6IGludGVnZXIsIHk6IGludGVnZXIpIHtcbiAgICAgICAgc3VwZXIoc2NlbmUsIHgsIHksICdyZWRfYm9hdCcpO1xuXG4gICAgICAgIHRoaXMuc3ByaXRlID0gdGhpcy5zY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoeCwgeSwgJ3JlZF9ib2F0JywgJ3JlZF9ib2F0XzAnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBsYXllclNwcml0ZUJ5RGlyZWN0aW9uKHBsYXllciwgZGlyZWN0aW9uSW5EZWcpIDoge25hbWU6IHN0cmluZywgZmxpcFg6IGJvb2xlYW59IHtcbiAgICAgICAgbGV0IGhhbGZTdGVwID0gdGhpcy5wbGF5ZXJTcHJpdGVSb3RhdGVTaXplIC8gMjtcbiAgICAgICAgLy8gNS42MjUgLSDQv9C+0LvQvtCy0LjQvdCwINC+0YIg0YjQsNCz0LAg0L/QvtCy0L7RgNC+0YLQsC4g0KHQv9GA0LDQudGCINGB0LzQvtGC0YDQuNGCINCyINC+0L/RgNC10LTQtdC70ZHQvdC90YvQuSDRg9Cz0L7QuyDQuCDQv9C70Y7RgS3QvNC40L3Rg9GBINC/0L7Qu9C+0LLQuNC90LAg0YjQsNCz0LAuXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICAgICAgaWYgKCAoZGlyZWN0aW9uSW5EZWcgPiAoMzYwIC0gaGFsZlN0ZXApKSB8fCBkaXJlY3Rpb25JbkRlZyA8IGhhbGZTdGVwKSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoIChkaXJlY3Rpb25JbkRlZyA+ICgxMS4yNSAtIGhhbGZTdGVwKSkgJiYgKGRpcmVjdGlvbkluRGVnIDwgKDExLjI1ICsgaGFsZlN0ZXApKSApIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyMi41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDIyLjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgzMy43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgzMy43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAzO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDQ1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDQ1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoNTYuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoNTYuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gNTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICg2Ny41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDY3LjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gNjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICg3OC43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICg3OC43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSA3O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDkwIC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDkwICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDg7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTAxLjI1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDEwMS4yNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSA5O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDExMi41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDExMi41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDEwO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDEyMy43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgxMjMuNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTM1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDEzNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAxMjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgxNDYuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTQ2LjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDEzO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDE1Ny41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDE1Ny41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDE0O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDE2OC43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgxNjguNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTU7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTgwIC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDE4MCArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAxNjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgxOTEuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTkxLjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDE3O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDIwMi41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDIwMi41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDE4O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDIxMy43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgyMTMuNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjI1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDIyNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyMDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyMzYuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjM2LjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDIxO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDI0Ny41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDI0Ny41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDIyO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDI1OC43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgyNTguNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjM7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjcwIC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDI3MCArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyNDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyODEuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjgxLjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI1O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDI5Mi41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDI5Mi41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI2O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDMwMy43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgzMDMuNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMzE1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDMxNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyODtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgzMjYuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMzI2LjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI5O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDMzNy41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDMzNy41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDMwO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDM0OC43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgzNDguNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMzE7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbnVtID0gaW5kZXg7XG4gICAgICAgIGlmIChpbmRleCA+IDE2KSB7XG4gICAgICAgICAgICBudW0gPSAzMSAtIGluZGV4O1xuICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiAncmVkX2JvYXRfJyArIG51bSwgZmxpcFg6IHRydWV9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7bmFtZTogJ3JlZF9ib2F0XycgKyBudW0sIGZsaXBYOiBmYWxzZX07XG4gICAgfTtcblxuICAgIHB1YmxpYyB1cGRhdGUodGltZSwgZGVsdGEpIHtcbiAgICAgICAgbGV0IHREaWZmID0gZGVsdGEgLyAxMDAwO1xuICAgICAgICBsZXQgY3Vyc29ycyA9IHRoaXMuc2NlbmUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuXG4gICAgICAgIGlmIChjdXJzb3JzLmxlZnQuaXNEb3duKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiAtPSAodGhpcy5ST1RBVEVfU1BFRUQgKiB0RGlmZik7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAzNjAgLSAodGhpcy5kaXJlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGN1cnNvcnMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiArPSAodGhpcy5ST1RBVEVfU1BFRUQgKiB0RGlmZik7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPiAzNjApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uIC0gMzYwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJzb3JzLnVwLmlzRG93bikge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCArPSAodGhpcy5BQ0NFTEVSQVRJT04gKiB0RGlmZik7XG4gICAgICAgICAgICBpZiAodGhpcy5zcGVlZCA+IHRoaXMuU1BFRURfTElNSVQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gdGhpcy5TUEVFRF9MSU1JVDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjdXJzb3JzLmRvd24uaXNEb3duKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkIC09ICh0aGlzLkRFQ0VMRVJBVElPTiAqIHREaWZmKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkIDwgdGhpcy5CQUNLV0FSRF9TUEVFRF9MSU1JVCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSB0aGlzLkJBQ0tXQVJEX1NQRUVEX0xJTUlUO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vINC/0L7RgdC70LUg0LLRgdC10YUg0LjQt9C80LXQvdC10L3QuNC5INC/0YDQvtCw0L/QtNC10LnRgtC40Lwg0LPQvtGA0LjQt9C+0L3RgtCw0LvRjNC90YPRjiDQuCDQstC10YDRgtC40LrQsNC70YzQvdGD0Y4g0YHQutC+0YDQvtGB0YLQuFxuICAgICAgICB0aGlzLnVwZGF0ZVZlbG9jaXRpZXMoKTtcblxuICAgICAgICBpZiAoY3Vyc29ycy5zcGFjZS5pc0Rvd24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgLT0gKHRoaXMuREVDRUxFUkFUSU9OICogdERpZmYpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3BlZWQgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCArPSAodGhpcy5ERUNFTEVSQVRJT04gKiB0RGlmZik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy51cGRhdGVWZWxvY2l0aWVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQstC30Y/RgtGMINC90YPQttC90YvQuSDRgdC/0YDQsNC50YIsINC/0L7QtNGB0YLQsNCy0LjRgtGMINCyINC+0YLQvtCx0YDQsNC20LXQvdC40LVcbiAgICAgICAgbGV0IGNvbmZpZyA9IHRoaXMuZ2V0UGxheWVyU3ByaXRlQnlEaXJlY3Rpb24odGhpcywgdGhpcy5kaXJlY3Rpb24pO1xuICAgICAgICB0aGlzLnNwcml0ZS5kZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5zcHJpdGUgPSB0aGlzLnNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShcbiAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy5ib2R5LnBvc2l0aW9uLngpLFxuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLmJvZHkucG9zaXRpb24ueSksXG4gICAgICAgICAgICAncmVkX2JvYXQnLFxuICAgICAgICAgICAgY29uZmlnLm5hbWVcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoY29uZmlnLmZsaXBYKSB7XG4gICAgICAgICAgICB0aGlzLnNwcml0ZS5mbGlwWCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zcHJpdGUuc2V0T3JpZ2luRnJvbUZyYW1lKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVWZWxvY2l0aWVzKCkge1xuICAgICAgICBsZXQgZGlyZWN0aW9uSW5SYWQgPSB0aGlzLmRpcmVjdGlvbiAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgIHRoaXMuc2V0VmVsb2NpdHlYKHRoaXMuc3BlZWQgKiBNYXRoLnNpbihkaXJlY3Rpb25JblJhZCkpO1xuICAgICAgICB0aGlzLnNldFZlbG9jaXR5WSgtMSAqIHRoaXMuc3BlZWQgKiBNYXRoLmNvcyhkaXJlY3Rpb25JblJhZCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tICdwaGFzZXInO1xuaW1wb3J0IHtHYW1lU2NlbmV9IGZyb20gXCIuL3NjZW5lcy9HYW1lU2NlbmVcIjtcblxuLy8gdGhlIGdhbWUgaXRzZWxmXG5sZXQgZ2FtZTtcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGdhbWVDb25maWc6IFBoYXNlci5UeXBlcy5Db3JlLkdhbWVDb25maWcgPSB7XG4gICAgICAgIHRpdGxlOiAnU2FtcGxlJyxcbiAgICAgICAgdHlwZTogUGhhc2VyLkFVVE8sXG4gICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICB3aWR0aDogODAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA2MDAsXG4gICAgICAgIH0sXG4gICAgICAgIHBoeXNpY3M6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdhcmNhZGUnLFxuICAgICAgICAgICAgYXJjYWRlOiB7XG4gICAgICAgICAgICAgICAgZGVidWc6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzY2VuZTogW0dhbWVTY2VuZV0sXG4gICAgICAgIHBhcmVudDogJ2dhbWUnLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjYWFhYWZmJyxcbiAgICB9O1xuXG4gICAgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShnYW1lQ29uZmlnKTtcbn07XG4iLCJpbXBvcnQgKiBhcyBQaGFzZXIgZnJvbSBcInBoYXNlclwiO1xuaW1wb3J0IHtQbGF5ZXJ9IGZyb20gXCIuLi9QbGF5ZXJcIjtcbmltcG9ydCBHYW1lT2JqZWN0V2l0aEJvZHkgPSBQaGFzZXIuVHlwZXMuUGh5c2ljcy5BcmNhZGUuR2FtZU9iamVjdFdpdGhCb2R5O1xuXG5leHBvcnQgY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcbiAgICBwcml2YXRlIHNxdWFyZTogUGhhc2VyLkdhbWVPYmplY3RzLlJlY3RhbmdsZSAmIHsgYm9keTogUGhhc2VyLlBoeXNpY3MuQXJjYWRlLkJvZHkgfTtcbiAgICBwcml2YXRlIHBsYXllcjogR2FtZU9iamVjdFdpdGhCb2R5O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IHNjZW5lQ29uZmlnOiBQaGFzZXIuVHlwZXMuU2NlbmVzLlNldHRpbmdzQ29uZmlnID0ge1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAga2V5OiAnR2FtZScsXG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIoc2NlbmVDb25maWcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwcmVsb2FkKCkge1xuICAgICAgICB0aGlzLmxvYWQuc2V0QmFzZVVSTCgpO1xuICAgICAgICB0aGlzLmxvYWQuYXRsYXMoXG4gICAgICAgICAgICAncmVkX2JvYXQnLFxuICAgICAgICAgICAgJ2Fzc2V0cy9hdGxhcy9ib2F0c1Nwcml0ZUxpc3RUcmFuc3BhcmVudC5wbmcnLFxuICAgICAgICAgICAgJ2Fzc2V0cy9hdGxhcy9yZWRCb2F0U3ByaXRlTGlzdENvbmZpZy5qc29uJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMuc3F1YXJlID0gdGhpcy5hZGQucmVjdGFuZ2xlKDQwMCwgNDAwLCAxMDAsIDEwMCwgMHhGRkZGRkYpIGFzIGFueTtcbiAgICAgICAgdGhpcy5waHlzaWNzLmFkZC5leGlzdGluZyh0aGlzLnNxdWFyZSk7XG5cbiAgICAgICAgbGV0IHBsYXllciA9IG5ldyBQbGF5ZXIodGhpcywgMTAwLCAxMDApO1xuICAgICAgICB0aGlzLnBsYXllciA9IHRoaXMucGh5c2ljcy5hZGQuZXhpc3RpbmcocGxheWVyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKHRpbWUsIGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvcktleXMgPSB0aGlzLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcblxuICAgICAgICBpZiAoY3Vyc29yS2V5cy51cC5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlLmJvZHkuc2V0VmVsb2NpdHlZKC01KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJzb3JLZXlzLmRvd24uaXNEb3duKSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZS5ib2R5LnNldFZlbG9jaXR5WSg1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlLmJvZHkuc2V0VmVsb2NpdHlZKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnNvcktleXMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZS5ib2R5LnNldFZlbG9jaXR5WCg1KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJzb3JLZXlzLmxlZnQuaXNEb3duKSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZS5ib2R5LnNldFZlbG9jaXR5WCgtNSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZS5ib2R5LnNldFZlbG9jaXR5WCgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZSh0aW1lLCBkZWx0YSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==