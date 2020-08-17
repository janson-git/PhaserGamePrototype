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
            this.direction -= 4;
            if (this.direction < 0) {
                this.direction = 360;
            }
            this.updateVelocities();
        }
        else if (cursors.right.isDown) {
            this.direction += 4;
            if (this.direction > 360) {
                this.direction = 0;
            }
            this.updateVelocities();
        }
        if (cursors.up.isDown) {
            this.speed += (this.ACCELERATION * tDiff);
            if (this.speed > this.SPEED_LIMIT) {
                this.speed = this.SPEED_LIMIT;
            }
            this.updateVelocities();
        }
        else if (cursors.down.isDown) {
            this.speed -= (this.DECELERATION * tDiff);
            if (this.speed < this.BACKWARD_SPEED_LIMIT) {
                this.speed = this.BACKWARD_SPEED_LIMIT;
            }
            this.updateVelocities();
        }
        if (cursors.space.isDown) {
            if (this.speed > 0) {
                this.speed -= (this.DECELERATION * tDiff);
                if (this.speed < 0) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3Qgc3luYyBub25yZWN1cnNpdmUgXlxcLlxcL2xvZyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BsYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NlbmVzL0dhbWVTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FB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SUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQ0FwRDhCLE1BQU0sQ0FBQyxLQUFLLEdBb0QxQztBQXBEWSw4QkFBUyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImFwcFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9sb2dcIjogXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2cuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3Qgc3luYyBeXFxcXC5cXFxcL2xvZyRcIjsiLCJpbXBvcnQgKiBhcyBQaGFzZXIgZnJvbSBcInBoYXNlclwiO1xuaW1wb3J0IHtHYW1lU2NlbmV9IGZyb20gXCIuL3NjZW5lcy9HYW1lU2NlbmVcIjtcbmltcG9ydCBCb2R5ID0gUGhhc2VyLlBoeXNpY3MuQXJjYWRlLkJvZHk7XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuU3ByaXRlIHtcbiAgICBwcm90ZWN0ZWQgcGxheWVyU3ByaXRlUm90YXRlU2l6ZSA9IDExLjI1OyAvLyAxMS4yNSDQs9GA0LDQtNGD0YHQvtCyINC90LAg0YHQv9GA0LDQudGCXG4gICAgcHJvdGVjdGVkIGRpcmVjdGlvbjogbnVtYmVyID0gMDtcbiAgICBwcm90ZWN0ZWQgc3BlZWQ6IG51bWJlciA9IDA7XG5cbiAgICBwcm90ZWN0ZWQgU1BFRURfTElNSVQ6IG51bWJlciA9IDE1MDtcbiAgICBwcm90ZWN0ZWQgQkFDS1dBUkRfU1BFRURfTElNSVQ6IG51bWJlciA9IC01MDtcbiAgICBwcm90ZWN0ZWQgQUNDRUxFUkFUSU9OOiBudW1iZXIgPSAzMDsgLy8gbS9zZWNeMlxuICAgIHByb3RlY3RlZCBERUNFTEVSQVRJT046IG51bWJlciA9IDUwOyAvLyBtL3NlY14yXG5cbiAgICBwcml2YXRlIHNwcml0ZTogUGhhc2VyLlR5cGVzLlBoeXNpY3MuQXJjYWRlLlNwcml0ZVdpdGhEeW5hbWljQm9keTtcblxuICAgIGNvbnN0cnVjdG9yKHNjZW5lOiBHYW1lU2NlbmUsIHg6IGludGVnZXIsIHk6IGludGVnZXIpIHtcbiAgICAgICAgc3VwZXIoc2NlbmUsIHgsIHksICdyZWRfYm9hdCcpO1xuXG4gICAgICAgIHRoaXMuc3ByaXRlID0gdGhpcy5zY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoeCwgeSwgJ3JlZF9ib2F0JywgJ3JlZF9ib2F0XzAnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBsYXllclNwcml0ZUJ5RGlyZWN0aW9uKHBsYXllciwgZGlyZWN0aW9uSW5EZWcpIDoge25hbWU6IHN0cmluZywgZmxpcFg6IGJvb2xlYW59IHtcbiAgICAgICAgbGV0IGhhbGZTdGVwID0gdGhpcy5wbGF5ZXJTcHJpdGVSb3RhdGVTaXplIC8gMjtcbiAgICAgICAgLy8gNS42MjUgLSDQv9C+0LvQvtCy0LjQvdCwINC+0YIg0YjQsNCz0LAg0L/QvtCy0L7RgNC+0YLQsC4g0KHQv9GA0LDQudGCINGB0LzQvtGC0YDQuNGCINCyINC+0L/RgNC10LTQtdC70ZHQvdC90YvQuSDRg9Cz0L7QuyDQuCDQv9C70Y7RgS3QvNC40L3Rg9GBINC/0L7Qu9C+0LLQuNC90LAg0YjQsNCz0LAuXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICAgICAgaWYgKCAoZGlyZWN0aW9uSW5EZWcgPiAoMzYwIC0gaGFsZlN0ZXApKSB8fCBkaXJlY3Rpb25JbkRlZyA8IGhhbGZTdGVwKSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoIChkaXJlY3Rpb25JbkRlZyA+ICgxMS4yNSAtIGhhbGZTdGVwKSkgJiYgKGRpcmVjdGlvbkluRGVnIDwgKDExLjI1ICsgaGFsZlN0ZXApKSApIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyMi41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDIyLjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgzMy43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgzMy43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAzO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDQ1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDQ1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoNTYuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoNTYuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gNTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICg2Ny41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDY3LjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gNjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICg3OC43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICg3OC43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSA3O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDkwIC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDkwICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDg7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTAxLjI1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDEwMS4yNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSA5O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDExMi41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDExMi41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDEwO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDEyMy43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgxMjMuNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTM1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDEzNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAxMjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgxNDYuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTQ2LjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDEzO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDE1Ny41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDE1Ny41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDE0O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDE2OC43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgxNjguNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTU7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTgwIC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDE4MCArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAxNjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgxOTEuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTkxLjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDE3O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDIwMi41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDIwMi41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDE4O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDIxMy43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgyMTMuNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjI1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDIyNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyMDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyMzYuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjM2LjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDIxO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDI0Ny41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDI0Ny41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDIyO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDI1OC43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgyNTguNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjM7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjcwIC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDI3MCArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyNDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyODEuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjgxLjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI1O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDI5Mi41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDI5Mi41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI2O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDMwMy43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgzMDMuNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMzE1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDMxNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyODtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgzMjYuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMzI2LjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI5O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDMzNy41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDMzNy41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDMwO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDM0OC43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgzNDguNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMzE7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbnVtID0gaW5kZXg7XG4gICAgICAgIGlmIChpbmRleCA+IDE2KSB7XG4gICAgICAgICAgICBudW0gPSAzMSAtIGluZGV4O1xuICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiAncmVkX2JvYXRfJyArIG51bSwgZmxpcFg6IHRydWV9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7bmFtZTogJ3JlZF9ib2F0XycgKyBudW0sIGZsaXBYOiBmYWxzZX07XG4gICAgfTtcblxuICAgIHB1YmxpYyB1cGRhdGUodGltZSwgZGVsdGEpIHtcbiAgICAgICAgbGV0IHREaWZmID0gZGVsdGEgLyAxMDAwO1xuICAgICAgICBsZXQgY3Vyc29ycyA9IHRoaXMuc2NlbmUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuXG4gICAgICAgIGlmIChjdXJzb3JzLmxlZnQuaXNEb3duKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiAtPSA0O1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gMzYwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVWZWxvY2l0aWVzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3Vyc29ycy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uICs9IDQ7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPiAzNjApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZlbG9jaXRpZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3Vyc29ycy51cC5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgKz0gKHRoaXMuQUNDRUxFUkFUSU9OICogdERpZmYpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWQgPiB0aGlzLlNQRUVEX0xJTUlUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IHRoaXMuU1BFRURfTElNSVQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmVsb2NpdGllcygpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnNvcnMuZG93bi5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgLT0gKHRoaXMuREVDRUxFUkFUSU9OICogdERpZmYpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWQgPCB0aGlzLkJBQ0tXQVJEX1NQRUVEX0xJTUlUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IHRoaXMuQkFDS1dBUkRfU1BFRURfTElNSVQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmVsb2NpdGllcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnNvcnMuc3BhY2UuaXNEb3duKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zcGVlZCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkIC09ICh0aGlzLkRFQ0VMRVJBVElPTiAqIHREaWZmKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVlZCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZlbG9jaXRpZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCy0LfRj9GC0Ywg0L3Rg9C20L3Ri9C5INGB0L/RgNCw0LnRgiwg0L/QvtC00YHRgtCw0LLQuNGC0Ywg0LIg0L7RgtC+0LHRgNCw0LbQtdC90LjQtVxuICAgICAgICBsZXQgY29uZmlnID0gdGhpcy5nZXRQbGF5ZXJTcHJpdGVCeURpcmVjdGlvbih0aGlzLCB0aGlzLmRpcmVjdGlvbik7XG4gICAgICAgIHRoaXMuc3ByaXRlLmRlc3Ryb3koKTtcblxuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMuc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKFxuICAgICAgICAgICAgTWF0aC5mbG9vcih0aGlzLmJvZHkucG9zaXRpb24ueCksXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuYm9keS5wb3NpdGlvbi55KSxcbiAgICAgICAgICAgICdyZWRfYm9hdCcsXG4gICAgICAgICAgICBjb25maWcubmFtZVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChjb25maWcuZmxpcFgpIHtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLmZsaXBYID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNwcml0ZS5zZXRPcmlnaW5Gcm9tRnJhbWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZlbG9jaXRpZXMoKSB7XG4gICAgICAgIGxldCBkaXJlY3Rpb25JblJhZCA9IHRoaXMuZGlyZWN0aW9uICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgdGhpcy5zZXRWZWxvY2l0eVgodGhpcy5zcGVlZCAqIE1hdGguc2luKGRpcmVjdGlvbkluUmFkKSk7XG4gICAgICAgIHRoaXMuc2V0VmVsb2NpdHlZKC0xICogdGhpcy5zcGVlZCAqIE1hdGguY29zKGRpcmVjdGlvbkluUmFkKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gJ3BoYXNlcic7XG5pbXBvcnQge0dhbWVTY2VuZX0gZnJvbSBcIi4vc2NlbmVzL0dhbWVTY2VuZVwiO1xuXG4vLyB0aGUgZ2FtZSBpdHNlbGZcbmxldCBnYW1lO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgZ2FtZUNvbmZpZzogUGhhc2VyLlR5cGVzLkNvcmUuR2FtZUNvbmZpZyA9IHtcbiAgICAgICAgdGl0bGU6ICdTYW1wbGUnLFxuICAgICAgICB0eXBlOiBQaGFzZXIuQVVUTyxcbiAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMCxcbiAgICAgICAgfSxcbiAgICAgICAgcGh5c2ljczoge1xuICAgICAgICAgICAgZGVmYXVsdDogJ2FyY2FkZScsXG4gICAgICAgICAgICBhcmNhZGU6IHtcbiAgICAgICAgICAgICAgICBkZWJ1ZzogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHNjZW5lOiBbR2FtZVNjZW5lXSxcbiAgICAgICAgcGFyZW50OiAnZ2FtZScsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNhYWFhZmYnLFxuICAgIH07XG5cbiAgICBnYW1lID0gbmV3IFBoYXNlci5HYW1lKGdhbWVDb25maWcpO1xufTtcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XG5pbXBvcnQge1BsYXllcn0gZnJvbSBcIi4uL1BsYXllclwiO1xuaW1wb3J0IEdhbWVPYmplY3RXaXRoQm9keSA9IFBoYXNlci5UeXBlcy5QaHlzaWNzLkFyY2FkZS5HYW1lT2JqZWN0V2l0aEJvZHk7XG5cbmV4cG9ydCBjbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xuICAgIHByaXZhdGUgc3F1YXJlOiBQaGFzZXIuR2FtZU9iamVjdHMuUmVjdGFuZ2xlICYgeyBib2R5OiBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuQm9keSB9O1xuICAgIHByaXZhdGUgcGxheWVyOiBHYW1lT2JqZWN0V2l0aEJvZHk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc3Qgc2NlbmVDb25maWc6IFBoYXNlci5UeXBlcy5TY2VuZXMuU2V0dGluZ3NDb25maWcgPSB7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6ICdHYW1lJyxcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihzY2VuZUNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHVibGljIHByZWxvYWQoKSB7XG4gICAgICAgIHRoaXMubG9hZC5zZXRCYXNlVVJMKCk7XG4gICAgICAgIHRoaXMubG9hZC5hdGxhcyhcbiAgICAgICAgICAgICdyZWRfYm9hdCcsXG4gICAgICAgICAgICAnYXNzZXRzL2F0bGFzL2JvYXRzU3ByaXRlTGlzdFRyYW5zcGFyZW50LnBuZycsXG4gICAgICAgICAgICAnYXNzZXRzL2F0bGFzL3JlZEJvYXRTcHJpdGVMaXN0Q29uZmlnLmpzb24nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5zcXVhcmUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoNDAwLCA0MDAsIDEwMCwgMTAwLCAweEZGRkZGRikgYXMgYW55O1xuICAgICAgICB0aGlzLnBoeXNpY3MuYWRkLmV4aXN0aW5nKHRoaXMuc3F1YXJlKTtcblxuICAgICAgICBsZXQgcGxheWVyID0gbmV3IFBsYXllcih0aGlzLCAxMDAsIDEwMCk7XG4gICAgICAgIHRoaXMucGxheWVyID0gdGhpcy5waHlzaWNzLmFkZC5leGlzdGluZyhwbGF5ZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUodGltZSwgZGVsdGEpIHtcbiAgICAgICAgY29uc3QgY3Vyc29yS2V5cyA9IHRoaXMuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuXG4gICAgICAgIGlmIChjdXJzb3JLZXlzLnVwLmlzRG93bikge1xuICAgICAgICAgICAgdGhpcy5zcXVhcmUuYm9keS5zZXRWZWxvY2l0eVkoLTUpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnNvcktleXMuZG93bi5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlLmJvZHkuc2V0VmVsb2NpdHlZKDUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zcXVhcmUuYm9keS5zZXRWZWxvY2l0eVkoMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3Vyc29yS2V5cy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlLmJvZHkuc2V0VmVsb2NpdHlYKDUpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnNvcktleXMubGVmdC5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlLmJvZHkuc2V0VmVsb2NpdHlYKC01KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlLmJvZHkuc2V0VmVsb2NpdHlYKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlKHRpbWUsIGRlbHRhKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9