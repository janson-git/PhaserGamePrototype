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
    Player.prototype.update = function () {
        var cursors = this.scene.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.direction -= 4;
            if (this.direction < 0) {
                this.direction = 360;
            }
        }
        else if (cursors.right.isDown) {
            this.direction += 4;
            if (this.direction > 360) {
                this.direction = 0;
            }
        }
        if (cursors.up.isDown) {
            // TODO: разобраться с движением!
            this.sprite.setAngularVelocity(200);
        }
        // взять нужный спрайт, подставить в отображение
        var config = this.getPlayerSpriteByDirection(this, this.direction);
        this.sprite.destroy();
        this.sprite = this.scene.physics.add.sprite(this.body.position.x, this.body.position.y, 'red_boat', config.name);
        if (config.flipX) {
            this.sprite.flipX = true;
        }
        this.sprite.setOriginFromFrame();
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
        // this.add.rectangle(100,100, 2, 2, 0xFF0000);
        this.physics.add.sprite(150, 150, 'red_boat', 'red_boat_1');
    };
    GameScene.prototype.update = function () {
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
        this.player.update();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3Qgc3luYyBub25yZWN1cnNpdmUgXlxcLlxcL2xvZyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BsYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NlbmVzL0dhbWVTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FB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bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhcHBcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMCxcInZlbmRvcnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vbG9nXCI6IFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90IHN5bmMgXlxcXFwuXFxcXC9sb2ckXCI7IiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gXCJwaGFzZXJcIjtcbmltcG9ydCB7R2FtZVNjZW5lfSBmcm9tIFwiLi9zY2VuZXMvR2FtZVNjZW5lXCI7XG5pbXBvcnQgQm9keSA9IFBoYXNlci5QaHlzaWNzLkFyY2FkZS5Cb2R5O1xuXG5leHBvcnQgY2xhc3MgUGxheWVyIGV4dGVuZHMgUGhhc2VyLlBoeXNpY3MuQXJjYWRlLlNwcml0ZSB7XG4gICAgcHJvdGVjdGVkIHBsYXllclNwcml0ZVJvdGF0ZVNpemUgPSAxMS4yNTsgLy8gMTEuMjUg0LPRgNCw0LTRg9GB0L7QsiDQvdCwINGB0L/RgNCw0LnRglxuICAgIHByb3RlY3RlZCBkaXJlY3Rpb246IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBzcHJpdGU6IFBoYXNlci5UeXBlcy5QaHlzaWNzLkFyY2FkZS5TcHJpdGVXaXRoRHluYW1pY0JvZHk7XG5cbiAgICBjb25zdHJ1Y3RvcihzY2VuZTogR2FtZVNjZW5lLCB4OiBpbnRlZ2VyLCB5OiBpbnRlZ2VyKSB7XG4gICAgICAgIHN1cGVyKHNjZW5lLCB4LCB5LCAncmVkX2JvYXQnKTtcblxuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMuc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKHgsIHksICdyZWRfYm9hdCcsICdyZWRfYm9hdF8wJyk7XG4gICAgfVxuXG4gICAgZ2V0UGxheWVyU3ByaXRlQnlEaXJlY3Rpb24ocGxheWVyLCBkaXJlY3Rpb25JbkRlZykgOiB7bmFtZTogc3RyaW5nLCBmbGlwWDogYm9vbGVhbn0ge1xuICAgICAgICBsZXQgaGFsZlN0ZXAgPSB0aGlzLnBsYXllclNwcml0ZVJvdGF0ZVNpemUgLyAyO1xuICAgICAgICAvLyA1LjYyNSAtINC/0L7Qu9C+0LLQuNC90LAg0L7RgiDRiNCw0LPQsCDQv9C+0LLQvtGA0L7RgtCwLiDQodC/0YDQsNC50YIg0YHQvNC+0YLRgNC40YIg0LIg0L7Qv9GA0LXQtNC10LvRkdC90L3Ri9C5INGD0LPQvtC7INC4INC/0LvRjtGBLdC80LjQvdGD0YEg0L/QvtC70L7QstC40L3QsCDRiNCw0LPQsC5cbiAgICAgICAgbGV0IGluZGV4ID0gMDtcblxuICAgICAgICBpZiAoIChkaXJlY3Rpb25JbkRlZyA+ICgzNjAgLSBoYWxmU3RlcCkpIHx8IGRpcmVjdGlvbkluRGVnIDwgaGFsZlN0ZXApIHtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICggKGRpcmVjdGlvbkluRGVnID4gKDExLjI1IC0gaGFsZlN0ZXApKSAmJiAoZGlyZWN0aW9uSW5EZWcgPCAoMTEuMjUgKyBoYWxmU3RlcCkpICkge1xuICAgICAgICAgICAgaW5kZXggPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDIyLjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjIuNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDMzLjc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDMzLjc1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDM7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoNDUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoNDUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gNDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICg1Ni4yNSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICg1Ni4yNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSA1O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDY3LjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoNjcuNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSA2O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDc4Ljc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDc4Ljc1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoOTAgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoOTAgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gODtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgxMDEuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTAxLjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTEyLjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTEyLjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTA7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTIzLjc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDEyMy43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAxMTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgxMzUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTM1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDEyO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDE0Ni4yNSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgxNDYuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTM7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTU3LjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTU3LjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTY4Ljc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDE2OC43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAxNTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgxODAgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTgwICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDE2O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDE5MS4yNSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgxOTEuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjAyLjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjAyLjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTg7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjEzLjc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDIxMy43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAxOTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDIwO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDIzNi4yNSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgyMzYuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjQ3LjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjQ3LjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjI7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjU4Ljc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDI1OC43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyMztcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyNzAgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjcwICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI0O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDI4MS4yNSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgyODEuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjU7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjkyLjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjkyLjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjY7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMzAzLjc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDMwMy43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyNztcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgzMTUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMzE1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI4O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDMyNi4yNSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgzMjYuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMzM3LjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMzM3LjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMzA7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMzQ4Ljc1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDM0OC43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAzMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBudW0gPSBpbmRleDtcbiAgICAgICAgaWYgKGluZGV4ID4gMTYpIHtcbiAgICAgICAgICAgIG51bSA9IDMxIC0gaW5kZXg7XG4gICAgICAgICAgICByZXR1cm4ge25hbWU6ICdyZWRfYm9hdF8nICsgbnVtLCBmbGlwWDogdHJ1ZX07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtuYW1lOiAncmVkX2JvYXRfJyArIG51bSwgZmxpcFg6IGZhbHNlfTtcbiAgICB9O1xuXG4gICAgcHVibGljIHVwZGF0ZSgpIHtcbiAgICAgICAgbGV0IGN1cnNvcnMgPSB0aGlzLnNjZW5lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcblxuICAgICAgICBpZiAoY3Vyc29ycy5sZWZ0LmlzRG93bikge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gLT0gNDtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IDM2MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjdXJzb3JzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gKz0gNDtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA+IDM2MCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY3Vyc29ycy51cC5pc0Rvd24pIHtcbiAgICAgICAgICAgIC8vIFRPRE86INGA0LDQt9C+0LHRgNCw0YLRjNGB0Y8g0YEg0LTQstC40LbQtdC90LjQtdC8IVxuICAgICAgICAgICAgdGhpcy5zcHJpdGUuc2V0QW5ndWxhclZlbG9jaXR5KDIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQstC30Y/RgtGMINC90YPQttC90YvQuSDRgdC/0YDQsNC50YIsINC/0L7QtNGB0YLQsNCy0LjRgtGMINCyINC+0YLQvtCx0YDQsNC20LXQvdC40LVcbiAgICAgICAgbGV0IGNvbmZpZyA9IHRoaXMuZ2V0UGxheWVyU3ByaXRlQnlEaXJlY3Rpb24odGhpcywgdGhpcy5kaXJlY3Rpb24pO1xuICAgICAgICB0aGlzLnNwcml0ZS5kZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5zcHJpdGUgPSB0aGlzLnNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShcbiAgICAgICAgICAgIHRoaXMuYm9keS5wb3NpdGlvbi54LFxuICAgICAgICAgICAgdGhpcy5ib2R5LnBvc2l0aW9uLnksXG4gICAgICAgICAgICAncmVkX2JvYXQnLFxuICAgICAgICAgICAgY29uZmlnLm5hbWVcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoY29uZmlnLmZsaXBYKSB7XG4gICAgICAgICAgICB0aGlzLnNwcml0ZS5mbGlwWCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zcHJpdGUuc2V0T3JpZ2luRnJvbUZyYW1lKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gJ3BoYXNlcic7XG5pbXBvcnQge0dhbWVTY2VuZX0gZnJvbSBcIi4vc2NlbmVzL0dhbWVTY2VuZVwiO1xuXG4vLyB0aGUgZ2FtZSBpdHNlbGZcbmxldCBnYW1lO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgZ2FtZUNvbmZpZzogUGhhc2VyLlR5cGVzLkNvcmUuR2FtZUNvbmZpZyA9IHtcbiAgICAgICAgdGl0bGU6ICdTYW1wbGUnLFxuICAgICAgICB0eXBlOiBQaGFzZXIuQVVUTyxcbiAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMCxcbiAgICAgICAgfSxcbiAgICAgICAgcGh5c2ljczoge1xuICAgICAgICAgICAgZGVmYXVsdDogJ2FyY2FkZScsXG4gICAgICAgICAgICBhcmNhZGU6IHtcbiAgICAgICAgICAgICAgICBkZWJ1ZzogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHNjZW5lOiBbR2FtZVNjZW5lXSxcbiAgICAgICAgcGFyZW50OiAnZ2FtZScsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNhYWFhZmYnLFxuICAgIH07XG5cbiAgICBnYW1lID0gbmV3IFBoYXNlci5HYW1lKGdhbWVDb25maWcpO1xufTtcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XG5pbXBvcnQge1BsYXllcn0gZnJvbSBcIi4uL1BsYXllclwiO1xuaW1wb3J0IEdhbWVPYmplY3RXaXRoQm9keSA9IFBoYXNlci5UeXBlcy5QaHlzaWNzLkFyY2FkZS5HYW1lT2JqZWN0V2l0aEJvZHk7XG5cbmV4cG9ydCBjbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xuICAgIHByaXZhdGUgc3F1YXJlOiBQaGFzZXIuR2FtZU9iamVjdHMuUmVjdGFuZ2xlICYgeyBib2R5OiBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuQm9keSB9O1xuICAgIHByaXZhdGUgcGxheWVyOiBHYW1lT2JqZWN0V2l0aEJvZHk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc3Qgc2NlbmVDb25maWc6IFBoYXNlci5UeXBlcy5TY2VuZXMuU2V0dGluZ3NDb25maWcgPSB7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBrZXk6ICdHYW1lJyxcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihzY2VuZUNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHVibGljIHByZWxvYWQoKSB7XG4gICAgICAgIHRoaXMubG9hZC5zZXRCYXNlVVJMKCk7XG4gICAgICAgIHRoaXMubG9hZC5hdGxhcyhcbiAgICAgICAgICAgICdyZWRfYm9hdCcsXG4gICAgICAgICAgICAnYXNzZXRzL2F0bGFzL2JvYXRzU3ByaXRlTGlzdFRyYW5zcGFyZW50LnBuZycsXG4gICAgICAgICAgICAnYXNzZXRzL2F0bGFzL3JlZEJvYXRTcHJpdGVMaXN0Q29uZmlnLmpzb24nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5zcXVhcmUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoNDAwLCA0MDAsIDEwMCwgMTAwLCAweEZGRkZGRikgYXMgYW55O1xuICAgICAgICB0aGlzLnBoeXNpY3MuYWRkLmV4aXN0aW5nKHRoaXMuc3F1YXJlKTtcblxuICAgICAgICBsZXQgcGxheWVyID0gbmV3IFBsYXllcih0aGlzLCAxMDAsIDEwMCk7XG4gICAgICAgIHRoaXMucGxheWVyID0gdGhpcy5waHlzaWNzLmFkZC5leGlzdGluZyhwbGF5ZXIpO1xuXG4gICAgICAgIC8vIHRoaXMuYWRkLnJlY3RhbmdsZSgxMDAsMTAwLCAyLCAyLCAweEZGMDAwMCk7XG5cbiAgICAgICAgdGhpcy5waHlzaWNzLmFkZC5zcHJpdGUoMTUwLCAxNTAsICdyZWRfYm9hdCcsICdyZWRfYm9hdF8xJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgY3Vyc29yS2V5cyA9IHRoaXMuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuXG4gICAgICAgIGlmIChjdXJzb3JLZXlzLnVwLmlzRG93bikge1xuICAgICAgICAgICAgdGhpcy5zcXVhcmUuYm9keS5zZXRWZWxvY2l0eVkoLTUpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnNvcktleXMuZG93bi5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlLmJvZHkuc2V0VmVsb2NpdHlZKDUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zcXVhcmUuYm9keS5zZXRWZWxvY2l0eVkoMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3Vyc29yS2V5cy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlLmJvZHkuc2V0VmVsb2NpdHlYKDUpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnNvcktleXMubGVmdC5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlLmJvZHkuc2V0VmVsb2NpdHlYKC01KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlLmJvZHkuc2V0VmVsb2NpdHlYKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlKCk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==