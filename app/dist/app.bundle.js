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
/******/ 	deferredModules.push(["./src/main.ts","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

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
exports.game = exports.GameScene = void 0;
var Phaser = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
var Player_1 = __webpack_require__(/*! ./Player */ "./src/Player.ts");
var sceneConfig = {
    active: false,
    visible: false,
    key: 'Game',
};
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this, sceneConfig) || this;
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
    scene: GameScene,
    parent: 'game',
    backgroundColor: '#aaaaff',
};
exports.game = new Phaser.Game(gameConfig);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BsYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7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QUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLENBakQ4QixNQUFNLENBQUMsS0FBSyxHQWlEMUM7QUFqRFksOEJBQVM7QUFtRHRCLElBQU0sVUFBVSxHQUFpQztJQUM3QyxLQUFLLEVBQUUsUUFBUTtJQUVmLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtJQUVqQixLQUFLLEVBQUU7UUFDSCxLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxHQUFHO0tBQ2Q7SUFFRCxPQUFPLEVBQUU7UUFDTCxPQUFPLEVBQUUsUUFBUTtRQUNqQixNQUFNLEVBQUU7WUFDSixLQUFLLEVBQUUsSUFBSTtTQUNkO0tBQ0o7SUFDRCxLQUFLLEVBQUUsU0FBUztJQUVoQixNQUFNLEVBQUUsTUFBTTtJQUNkLGVBQWUsRUFBRSxTQUFTO0NBQzdCLENBQUM7QUFFVyxZQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiYXBwXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvbWFpbi50c1wiLFwidmVuZG9yc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XG5pbXBvcnQge0dhbWVTY2VuZX0gZnJvbSBcIi4vbWFpblwiO1xuaW1wb3J0IEJvZHkgPSBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuQm9keTtcblxuZXhwb3J0IGNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5QaHlzaWNzLkFyY2FkZS5TcHJpdGUge1xuICAgIHByb3RlY3RlZCBwbGF5ZXJTcHJpdGVSb3RhdGVTaXplID0gMTEuMjU7IC8vIDExLjI1INCz0YDQsNC00YPRgdC+0LIg0L3QsCDRgdC/0YDQsNC50YJcbiAgICBwcm90ZWN0ZWQgZGlyZWN0aW9uOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgc3ByaXRlOiBQaGFzZXIuVHlwZXMuUGh5c2ljcy5BcmNhZGUuU3ByaXRlV2l0aER5bmFtaWNCb2R5O1xuXG4gICAgY29uc3RydWN0b3Ioc2NlbmU6IEdhbWVTY2VuZSwgeDogaW50ZWdlciwgeTogaW50ZWdlcikge1xuICAgICAgICBzdXBlcihzY2VuZSwgeCwgeSwgJ3JlZF9ib2F0Jyk7XG5cbiAgICAgICAgdGhpcy5zcHJpdGUgPSB0aGlzLnNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZSh4LCB5LCAncmVkX2JvYXQnLCAncmVkX2JvYXRfMCcpO1xuICAgIH1cblxuICAgIGdldFBsYXllclNwcml0ZUJ5RGlyZWN0aW9uKHBsYXllciwgZGlyZWN0aW9uSW5EZWcpIDoge25hbWU6IHN0cmluZywgZmxpcFg6IGJvb2xlYW59IHtcbiAgICAgICAgbGV0IGhhbGZTdGVwID0gdGhpcy5wbGF5ZXJTcHJpdGVSb3RhdGVTaXplIC8gMjtcbiAgICAgICAgLy8gNS42MjUgLSDQv9C+0LvQvtCy0LjQvdCwINC+0YIg0YjQsNCz0LAg0L/QvtCy0L7RgNC+0YLQsC4g0KHQv9GA0LDQudGCINGB0LzQvtGC0YDQuNGCINCyINC+0L/RgNC10LTQtdC70ZHQvdC90YvQuSDRg9Cz0L7QuyDQuCDQv9C70Y7RgS3QvNC40L3Rg9GBINC/0L7Qu9C+0LLQuNC90LAg0YjQsNCz0LAuXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICAgICAgaWYgKCAoZGlyZWN0aW9uSW5EZWcgPiAoMzYwIC0gaGFsZlN0ZXApKSB8fCBkaXJlY3Rpb25JbkRlZyA8IGhhbGZTdGVwKSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoIChkaXJlY3Rpb25JbkRlZyA+ICgxMS4yNSAtIGhhbGZTdGVwKSkgJiYgKGRpcmVjdGlvbkluRGVnIDwgKDExLjI1ICsgaGFsZlN0ZXApKSApIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyMi41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDIyLjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgzMy43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgzMy43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAzO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDQ1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDQ1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoNTYuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoNTYuMjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gNTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICg2Ny41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDY3LjUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gNjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICg3OC43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICg3OC43NSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSA3O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDkwIC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDkwICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDg7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTAxLjI1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDEwMS4yNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSA5O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDExMi41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDExMi41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDEwO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDEyMy43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgxMjMuNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTM1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDEzNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAxMjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgxNDYuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTQ2LjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDEzO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDE1Ny41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDE1Ny41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDE0O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDE2OC43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgxNjguNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTU7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMTgwIC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDE4MCArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAxNjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgxOTEuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMTkxLjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDE3O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDIwMi41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDIwMi41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDE4O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDIxMy43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgyMTMuNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMTk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjI1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDIyNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyMDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyMzYuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjM2LjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDIxO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDI0Ny41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDI0Ny41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDIyO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDI1OC43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgyNTguNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjM7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMjcwIC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDI3MCArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyNDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgyODEuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMjgxLjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI1O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDI5Mi41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDI5Mi41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI2O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDMwMy43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgzMDMuNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uSW5EZWcgPiAoMzE1IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDMxNSArIGhhbGZTdGVwKSkge1xuICAgICAgICAgICAgaW5kZXggPSAyODtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25JbkRlZyA+ICgzMjYuMjUgLSBoYWxmU3RlcCkgJiYgZGlyZWN0aW9uSW5EZWcgPCAoMzI2LjI1ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDI5O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDMzNy41IC0gaGFsZlN0ZXApICYmIGRpcmVjdGlvbkluRGVnIDwgKDMzNy41ICsgaGFsZlN0ZXApKSB7XG4gICAgICAgICAgICBpbmRleCA9IDMwO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbkluRGVnID4gKDM0OC43NSAtIGhhbGZTdGVwKSAmJiBkaXJlY3Rpb25JbkRlZyA8ICgzNDguNzUgKyBoYWxmU3RlcCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMzE7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbnVtID0gaW5kZXg7XG4gICAgICAgIGlmIChpbmRleCA+IDE2KSB7XG4gICAgICAgICAgICBudW0gPSAzMSAtIGluZGV4O1xuICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiAncmVkX2JvYXRfJyArIG51bSwgZmxpcFg6IHRydWV9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7bmFtZTogJ3JlZF9ib2F0XycgKyBudW0sIGZsaXBYOiBmYWxzZX07XG4gICAgfTtcblxuICAgIHB1YmxpYyB1cGRhdGUoKSB7XG4gICAgICAgIGxldCBjdXJzb3JzID0gdGhpcy5zY2VuZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XG5cbiAgICAgICAgaWYgKGN1cnNvcnMubGVmdC5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uIC09IDQ7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAzNjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY3Vyc29ycy5yaWdodC5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uICs9IDQ7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPiAzNjApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnNvcnMudXAuaXNEb3duKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiDRgNCw0LfQvtCx0YDQsNGC0YzRgdGPINGBINC00LLQuNC20LXQvdC40LXQvCFcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLnNldEFuZ3VsYXJWZWxvY2l0eSgyMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0LLQt9GP0YLRjCDQvdGD0LbQvdGL0Lkg0YHQv9GA0LDQudGCLCDQv9C+0LTRgdGC0LDQstC40YLRjCDQsiDQvtGC0L7QsdGA0LDQttC10L3QuNC1XG4gICAgICAgIGxldCBjb25maWcgPSB0aGlzLmdldFBsYXllclNwcml0ZUJ5RGlyZWN0aW9uKHRoaXMsIHRoaXMuZGlyZWN0aW9uKTtcbiAgICAgICAgdGhpcy5zcHJpdGUuZGVzdHJveSgpO1xuXG4gICAgICAgIHRoaXMuc3ByaXRlID0gdGhpcy5zY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoXG4gICAgICAgICAgICB0aGlzLmJvZHkucG9zaXRpb24ueCxcbiAgICAgICAgICAgIHRoaXMuYm9keS5wb3NpdGlvbi55LFxuICAgICAgICAgICAgJ3JlZF9ib2F0JyxcbiAgICAgICAgICAgIGNvbmZpZy5uYW1lXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5mbGlwWCkge1xuICAgICAgICAgICAgdGhpcy5zcHJpdGUuZmxpcFggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ByaXRlLnNldE9yaWdpbkZyb21GcmFtZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tICdwaGFzZXInO1xuaW1wb3J0IEdhbWUgPSBQaGFzZXIuR2FtZTtcbmltcG9ydCB7UGxheWVyfSBmcm9tIFwiLi9QbGF5ZXJcIjtcbmltcG9ydCBHYW1lT2JqZWN0V2l0aEJvZHkgPSBQaGFzZXIuVHlwZXMuUGh5c2ljcy5BcmNhZGUuR2FtZU9iamVjdFdpdGhCb2R5O1xuXG5jb25zdCBzY2VuZUNvbmZpZzogUGhhc2VyLlR5cGVzLlNjZW5lcy5TZXR0aW5nc0NvbmZpZyA9IHtcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIHZpc2libGU6IGZhbHNlLFxuICAgIGtleTogJ0dhbWUnLFxufTtcblxuZXhwb3J0IGNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFBoYXNlci5TY2VuZSB7XG4gICAgcHJpdmF0ZSBzcXVhcmU6IFBoYXNlci5HYW1lT2JqZWN0cy5SZWN0YW5nbGUgJiB7IGJvZHk6IFBoYXNlci5QaHlzaWNzLkFyY2FkZS5Cb2R5IH07XG4gICAgcHJpdmF0ZSBwbGF5ZXI6IEdhbWVPYmplY3RXaXRoQm9keTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoc2NlbmVDb25maWcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwcmVsb2FkKCkge1xuICAgICAgICB0aGlzLmxvYWQuc2V0QmFzZVVSTCgpO1xuICAgICAgICB0aGlzLmxvYWQuYXRsYXMoXG4gICAgICAgICAgICAncmVkX2JvYXQnLFxuICAgICAgICAgICAgJ2Fzc2V0cy9hdGxhcy9ib2F0c1Nwcml0ZUxpc3RUcmFuc3BhcmVudC5wbmcnLFxuICAgICAgICAgICAgJ2Fzc2V0cy9hdGxhcy9yZWRCb2F0U3ByaXRlTGlzdENvbmZpZy5qc29uJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMuc3F1YXJlID0gdGhpcy5hZGQucmVjdGFuZ2xlKDQwMCwgNDAwLCAxMDAsIDEwMCwgMHhGRkZGRkYpIGFzIGFueTtcbiAgICAgICAgdGhpcy5waHlzaWNzLmFkZC5leGlzdGluZyh0aGlzLnNxdWFyZSk7XG5cbiAgICAgICAgbGV0IHBsYXllciA9IG5ldyBQbGF5ZXIodGhpcywgMTAwLCAxMDApO1xuICAgICAgICB0aGlzLnBsYXllciA9IHRoaXMucGh5c2ljcy5hZGQuZXhpc3RpbmcocGxheWVyKTtcblxuICAgICAgICAvLyB0aGlzLmFkZC5yZWN0YW5nbGUoMTAwLDEwMCwgMiwgMiwgMHhGRjAwMDApO1xuXG4gICAgICAgIHRoaXMucGh5c2ljcy5hZGQuc3ByaXRlKDE1MCwgMTUwLCAncmVkX2JvYXQnLCAncmVkX2JvYXRfMScpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvcktleXMgPSB0aGlzLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcblxuICAgICAgICBpZiAoY3Vyc29yS2V5cy51cC5pc0Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlLmJvZHkuc2V0VmVsb2NpdHlZKC01KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJzb3JLZXlzLmRvd24uaXNEb3duKSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZS5ib2R5LnNldFZlbG9jaXR5WSg1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlLmJvZHkuc2V0VmVsb2NpdHlZKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnNvcktleXMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZS5ib2R5LnNldFZlbG9jaXR5WCg1KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJzb3JLZXlzLmxlZnQuaXNEb3duKSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZS5ib2R5LnNldFZlbG9jaXR5WCgtNSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZS5ib2R5LnNldFZlbG9jaXR5WCgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZSgpO1xuICAgIH1cbn1cblxuY29uc3QgZ2FtZUNvbmZpZzogUGhhc2VyLlR5cGVzLkNvcmUuR2FtZUNvbmZpZyA9IHtcbiAgICB0aXRsZTogJ1NhbXBsZScsXG5cbiAgICB0eXBlOiBQaGFzZXIuQVVUTyxcblxuICAgIHNjYWxlOiB7XG4gICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICAgIGhlaWdodDogNjAwLFxuICAgIH0sXG5cbiAgICBwaHlzaWNzOiB7XG4gICAgICAgIGRlZmF1bHQ6ICdhcmNhZGUnLFxuICAgICAgICBhcmNhZGU6IHtcbiAgICAgICAgICAgIGRlYnVnOiB0cnVlLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgc2NlbmU6IEdhbWVTY2VuZSxcblxuICAgIHBhcmVudDogJ2dhbWUnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyNhYWFhZmYnLFxufTtcblxuZXhwb3J0IGNvbnN0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoZ2FtZUNvbmZpZyk7Il0sInNvdXJjZVJvb3QiOiIifQ==