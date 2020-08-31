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

/***/ "./src/Components/TextButton.ts":
/*!**************************************!*\
  !*** ./src/Components/TextButton.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar TextButton = /** @class */ (function (_super) {\n    __extends(TextButton, _super);\n    function TextButton(scene, x, y, text, style) {\n        var _this = _super.call(this, scene, x, y, text, style) || this;\n        _this.defaultTextColor = '#fff';\n        _this.hoverTextColor = '#0ff';\n        _this.activeTextColor = '#ff0';\n        _this.setFontSize(10);\n        _this.setShadow(0, 0, 'black', 5);\n        _this.setStyle({ fill: _this.defaultTextColor });\n        _this.setInteractive({ useHandCursor: true })\n            .on('pointerover', function () { return _this.buttonHoverState(); })\n            .on('pointerout', function () { return _this.buttonRestState(); })\n            .on('pointerdown', function () { return _this.buttonActiveState(); })\n            .on('pointerup', function () { return _this.buttonHoverState(); });\n        return _this;\n    }\n    TextButton.prototype.buttonHoverState = function () {\n        this.setStyle({ fill: this.hoverTextColor });\n    };\n    TextButton.prototype.buttonRestState = function () {\n        this.setStyle({ fill: this.defaultTextColor });\n    };\n    TextButton.prototype.buttonActiveState = function () {\n        this.setStyle({ fill: this.activeTextColor });\n    };\n    return TextButton;\n}(Phaser.GameObjects.Text));\nexports.default = TextButton;\n\n\n//# sourceURL=webpack:///./src/Components/TextButton.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Player = void 0;\nvar Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar Player = /** @class */ (function (_super) {\n    __extends(Player, _super);\n    function Player(scene, x, y) {\n        var _this = _super.call(this, scene, x, y, 'red_boat') || this;\n        _this.playerSpriteRotateSize = 11.25; // 11.25 градусов на спрайт\n        _this.direction = 0;\n        _this.speed = 0;\n        _this.SPEED_LIMIT = 150;\n        _this.BACKWARD_SPEED_LIMIT = -50;\n        _this.ACCELERATION = 30; // m/sec^2\n        _this.DECELERATION = 50; // m/sec^2\n        _this.ROTATE_SPEED = 90; // Degrees per second\n        // добавляем в сцену чтобы спрайт был видим\n        _this.scene.add.existing(_this);\n        // добавляем в физику, чтобы учавствовать в обсчитывании столкновений\n        _this.scene.physics.add.existing(_this);\n        return _this;\n    }\n    Player.prototype.getPlayerSpriteByDirection = function (player, directionInDeg) {\n        var halfStep = this.playerSpriteRotateSize / 2;\n        // 5.625 - половина от шага поворота. Спрайт смотрит в определённый угол и плюс-минус половина шага.\n        var index = 0;\n        if ((directionInDeg > (360 - halfStep)) || directionInDeg < halfStep) {\n            index = 0;\n        }\n        else if ((directionInDeg > (11.25 - halfStep)) && (directionInDeg < (11.25 + halfStep))) {\n            index = 1;\n        }\n        else if (directionInDeg > (22.5 - halfStep) && directionInDeg < (22.5 + halfStep)) {\n            index = 2;\n        }\n        else if (directionInDeg > (33.75 - halfStep) && directionInDeg < (33.75 + halfStep)) {\n            index = 3;\n        }\n        else if (directionInDeg > (45 - halfStep) && directionInDeg < (45 + halfStep)) {\n            index = 4;\n        }\n        else if (directionInDeg > (56.25 - halfStep) && directionInDeg < (56.25 + halfStep)) {\n            index = 5;\n        }\n        else if (directionInDeg > (67.5 - halfStep) && directionInDeg < (67.5 + halfStep)) {\n            index = 6;\n        }\n        else if (directionInDeg > (78.75 - halfStep) && directionInDeg < (78.75 + halfStep)) {\n            index = 7;\n        }\n        else if (directionInDeg > (90 - halfStep) && directionInDeg < (90 + halfStep)) {\n            index = 8;\n        }\n        else if (directionInDeg > (101.25 - halfStep) && directionInDeg < (101.25 + halfStep)) {\n            index = 9;\n        }\n        else if (directionInDeg > (112.5 - halfStep) && directionInDeg < (112.5 + halfStep)) {\n            index = 10;\n        }\n        else if (directionInDeg > (123.75 - halfStep) && directionInDeg < (123.75 + halfStep)) {\n            index = 11;\n        }\n        else if (directionInDeg > (135 - halfStep) && directionInDeg < (135 + halfStep)) {\n            index = 12;\n        }\n        else if (directionInDeg > (146.25 - halfStep) && directionInDeg < (146.25 + halfStep)) {\n            index = 13;\n        }\n        else if (directionInDeg > (157.5 - halfStep) && directionInDeg < (157.5 + halfStep)) {\n            index = 14;\n        }\n        else if (directionInDeg > (168.75 - halfStep) && directionInDeg < (168.75 + halfStep)) {\n            index = 15;\n        }\n        else if (directionInDeg > (180 - halfStep) && directionInDeg < (180 + halfStep)) {\n            index = 16;\n        }\n        else if (directionInDeg > (191.25 - halfStep) && directionInDeg < (191.25 + halfStep)) {\n            index = 17;\n        }\n        else if (directionInDeg > (202.5 - halfStep) && directionInDeg < (202.5 + halfStep)) {\n            index = 18;\n        }\n        else if (directionInDeg > (213.75 - halfStep) && directionInDeg < (213.75 + halfStep)) {\n            index = 19;\n        }\n        else if (directionInDeg > (225 - halfStep) && directionInDeg < (225 + halfStep)) {\n            index = 20;\n        }\n        else if (directionInDeg > (236.25 - halfStep) && directionInDeg < (236.25 + halfStep)) {\n            index = 21;\n        }\n        else if (directionInDeg > (247.5 - halfStep) && directionInDeg < (247.5 + halfStep)) {\n            index = 22;\n        }\n        else if (directionInDeg > (258.75 - halfStep) && directionInDeg < (258.75 + halfStep)) {\n            index = 23;\n        }\n        else if (directionInDeg > (270 - halfStep) && directionInDeg < (270 + halfStep)) {\n            index = 24;\n        }\n        else if (directionInDeg > (281.25 - halfStep) && directionInDeg < (281.25 + halfStep)) {\n            index = 25;\n        }\n        else if (directionInDeg > (292.5 - halfStep) && directionInDeg < (292.5 + halfStep)) {\n            index = 26;\n        }\n        else if (directionInDeg > (303.75 - halfStep) && directionInDeg < (303.75 + halfStep)) {\n            index = 27;\n        }\n        else if (directionInDeg > (315 - halfStep) && directionInDeg < (315 + halfStep)) {\n            index = 28;\n        }\n        else if (directionInDeg > (326.25 - halfStep) && directionInDeg < (326.25 + halfStep)) {\n            index = 29;\n        }\n        else if (directionInDeg > (337.5 - halfStep) && directionInDeg < (337.5 + halfStep)) {\n            index = 30;\n        }\n        else if (directionInDeg > (348.75 - halfStep) && directionInDeg < (348.75 + halfStep)) {\n            index = 31;\n        }\n        var num = index;\n        if (index > 16) {\n            num = 31 - index;\n            return { name: 'red_boat_' + num, flipX: true };\n        }\n        return { name: 'red_boat_' + num, flipX: false };\n    };\n    ;\n    Player.prototype.update = function (time, delta) {\n        var tDiff = delta / 1000;\n        var cursors = this.scene.input.keyboard.createCursorKeys();\n        if (cursors.left.isDown) {\n            this.direction -= (this.ROTATE_SPEED * tDiff);\n            if (this.direction < 0) {\n                this.direction = 360 - (this.direction);\n            }\n        }\n        else if (cursors.right.isDown) {\n            this.direction += (this.ROTATE_SPEED * tDiff);\n            if (this.direction > 360) {\n                this.direction = this.direction - 360;\n            }\n        }\n        if (cursors.up.isDown) {\n            this.speed += (this.ACCELERATION * tDiff);\n            if (this.speed > this.SPEED_LIMIT) {\n                this.speed = this.SPEED_LIMIT;\n            }\n        }\n        else if (cursors.down.isDown) {\n            this.speed -= (this.DECELERATION * tDiff);\n            if (this.speed < this.BACKWARD_SPEED_LIMIT) {\n                this.speed = this.BACKWARD_SPEED_LIMIT;\n            }\n        }\n        if (cursors.space.isDown) {\n            if (this.speed > 0) {\n                this.speed -= (this.DECELERATION * tDiff);\n                if (this.speed < 0) {\n                    this.speed = 0;\n                }\n            }\n            else if (this.speed < 0) {\n                this.speed += (this.DECELERATION * tDiff);\n                if (this.speed > 0) {\n                    this.speed = 0;\n                }\n            }\n        }\n        // после всех изменений проапдейтим горизонтальную и вертикальную скорости\n        this.updateVelocities();\n        // взять нужный спрайт, подставить в отображение\n        var config = this.getPlayerSpriteByDirection(this, this.direction);\n        // обновляем отображаемый фрейм спрайта\n        var frame = this.setFrame(config.name);\n        this.setBodySize(frame.width, frame.height);\n        this.flipX = config.flipX || false;\n    };\n    Player.prototype.updateVelocities = function () {\n        var directionInRad = this.direction * Math.PI / 180;\n        this.setVelocityX(this.speed * Math.sin(directionInRad));\n        this.setVelocityY(-1 * this.speed * Math.cos(directionInRad));\n    };\n    return Player;\n}(Phaser.Physics.Arcade.Sprite));\nexports.Player = Player;\n\n\n//# sourceURL=webpack:///./src/Player.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar GameScene_1 = __webpack_require__(/*! ./scenes/GameScene */ \"./src/scenes/GameScene.ts\");\nvar HelloScene_1 = __webpack_require__(/*! ./scenes/HelloScene */ \"./src/scenes/HelloScene.ts\");\nvar Center = Phaser.Scale.Center;\nvar GeneratorScene_1 = __webpack_require__(/*! ./scenes/GeneratorScene */ \"./src/scenes/GeneratorScene.ts\");\n// the game itself\nvar game;\nwindow.onload = function () {\n    var gameConfig = {\n        title: 'Sample',\n        type: Phaser.AUTO,\n        scale: {\n            width: 500,\n            height: 400,\n            autoCenter: Center.CENTER_BOTH\n        },\n        physics: {\n            default: 'arcade',\n            arcade: {\n                debug: true,\n            },\n        },\n        scene: [GeneratorScene_1.GeneratorScene, HelloScene_1.HelloScene, GameScene_1.GameScene],\n        parent: 'game',\n        backgroundColor: '#000000',\n    };\n    game = new Phaser.Game(gameConfig);\n};\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/scenes/GameScene.ts":
/*!*********************************!*\
  !*** ./src/scenes/GameScene.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar Player_1 = __webpack_require__(/*! ../Player */ \"./src/Player.ts\");\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    function GameScene() {\n        var _this = this;\n        var sceneConfig = {\n            active: false,\n            visible: false,\n            key: 'Game',\n        };\n        _this = _super.call(this, sceneConfig) || this;\n        return _this;\n    }\n    GameScene.prototype.preload = function () {\n        this.load.setBaseURL();\n        this.load.atlas('red_boat', 'assets/atlas/boatsSpriteListTransparent.png', 'assets/atlas/redBoatSpriteListConfig.json');\n        this.load.image('tilesExtruded', 'assets/tilemaps/WaterMazeTilesExtruded.png');\n        this.load.tilemapTiledJSON('map', 'assets/tilemaps/WaterMazeMap.json');\n    };\n    GameScene.prototype.create = function () {\n        var map = this.make.tilemap({ key: 'map' });\n        // The first parameter is the name of the tileset in Tiled and the second parameter is the key\n        // of the tileset image used when loading the file in preload.\n        var tiles = map.addTilesetImage('waterAndGrass', 'tilesExtruded');\n        // You can load a layer from the map using the layer name from Tiled, or by using the layer\n        // index (0 in this case).\n        this.layer = map.createStaticLayer(0, tiles, 0, 0);\n        // TODO: научится бы корректно нужные спрайты для тайлов указывать.\n        // TODO: и соответственно - их проверять\n        map.setCollisionBetween(85, 999, true, false, this.layer);\n        // let shapeGraphics = this.add.graphics();\n        // this.drawCollisionShapes(shapeGraphics);\n        this.player = new Player_1.Player(this, 100, 100);\n        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);\n        this.cameras.main.setRoundPixels(true);\n        this.cameras.main.startFollow(this.player, true);\n    };\n    GameScene.prototype.update = function (time, delta) {\n        var cursorKeys = this.input.keyboard.createCursorKeys();\n        this.player.update(time, delta);\n        this.physics.collide(this.player, this.layer);\n    };\n    GameScene.prototype.drawCollisionShapes = function (graphics) {\n        graphics.clear();\n        // Loop over each tile and visualize its collision shape (if it has one)\n        this.layer.forEachTile(function (tile) {\n            var tileWorldX = tile.getLeft();\n            var tileWorldY = tile.getTop();\n            var collisionGroup = tile.getCollisionGroup();\n            // console.log(collisionGroup);\n            if (!collisionGroup || collisionGroup.objects.length === 0) {\n                return;\n            }\n            // The group will have an array of objects - these are the individual collision shapes\n            var objects = collisionGroup.objects;\n            for (var i = 0; i < objects.length; i++) {\n                var object = objects[i];\n                var objectX = tileWorldX + object.x;\n                var objectY = tileWorldY + object.y;\n                // When objects are parsed by Phaser, they will be guaranteed to have one of the\n                // following properties if they are a rectangle/ellipse/polygon/polyline.\n                if (object.rectangle) {\n                    graphics.strokeRect(objectX, objectY, object.width, object.height);\n                }\n                else if (object.ellipse) {\n                    // Ellipses in Tiled have a top-left origin, while ellipses in Phaser have a center\n                    // origin\n                    graphics.strokeEllipse(objectX + object.width / 2, objectY + object.height / 2, object.width, object.height);\n                }\n                else if (object.polygon || object.polyline) {\n                    var originalPoints = object.polygon ? object.polygon : object.polyline;\n                    var points = [];\n                    for (var j = 0; j < originalPoints.length; j++) {\n                        var point = originalPoints[j];\n                        points.push({\n                            x: objectX + point.x,\n                            y: objectY + point.y\n                        });\n                    }\n                    graphics.strokePoints(points);\n                }\n            }\n        });\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/GameScene.ts?");

/***/ }),

/***/ "./src/scenes/GeneratorScene.ts":
/*!**************************************!*\
  !*** ./src/scenes/GeneratorScene.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GeneratorScene = void 0;\nvar Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar TextButton_1 = __webpack_require__(/*! ../Components/TextButton */ \"./src/Components/TextButton.ts\");\nvar Corridor = /** @class */ (function () {\n    function Corridor(x, y, width, height) {\n        this.x = x;\n        this.y = y;\n        this.width = width;\n        this.height = height;\n    }\n    return Corridor;\n}());\nvar Room = /** @class */ (function () {\n    function Room(x, y, width, height) {\n        this.x = x;\n        this.y = y;\n        this.width = width;\n        this.height = height;\n    }\n    return Room;\n}());\nvar Tree = /** @class */ (function () {\n    function Tree(width, height) {\n        this.width = width;\n        this.height = height;\n        this.x = 0;\n        this.y = 0;\n    }\n    /**\n     * Берёт из узла или собственную комнату или одну из комнат его дочерних узлов\n     */\n    Tree.prototype.getRoom = function () {\n        if (this.room instanceof Room) {\n            return this.room;\n        }\n        var leftRoom, rightRoom;\n        if (this.left instanceof Tree) {\n            leftRoom = this.left.getRoom();\n        }\n        if (this.left instanceof Tree) {\n            rightRoom = this.right.getRoom();\n        }\n        if (leftRoom === null && rightRoom === null) {\n            return null;\n        }\n        if (leftRoom !== null || rightRoom !== null) {\n            return leftRoom === null ? rightRoom : leftRoom;\n        }\n        // если есть обе комнаты, всегда возвращаем левую\n        return leftRoom;\n    };\n    return Tree;\n}());\nvar KeyGenerator = /** @class */ (function () {\n    function KeyGenerator() {\n    }\n    KeyGenerator.getNextKey = function (prefix) {\n        var keyToReturn;\n        if (prefix === undefined) {\n            keyToReturn = '' + KeyGenerator.key;\n            KeyGenerator.key++;\n            return keyToReturn;\n        }\n        if (!KeyGenerator.prefixedKeys.hasOwnProperty(prefix)) {\n            KeyGenerator.prefixedKeys[prefix] = 1;\n        }\n        keyToReturn = prefix + KeyGenerator.prefixedKeys[prefix];\n        KeyGenerator.prefixedKeys[prefix]++;\n        return keyToReturn;\n    };\n    KeyGenerator.resetAll = function () {\n        KeyGenerator.key = 1;\n        KeyGenerator.prefixedKeys = {};\n    };\n    KeyGenerator.key = 1;\n    KeyGenerator.prefixedKeys = {};\n    return KeyGenerator;\n}());\nvar GeneratorScene = /** @class */ (function (_super) {\n    __extends(GeneratorScene, _super);\n    function GeneratorScene() {\n        var _this = this;\n        var sceneConfig = {\n            active: false,\n            visible: false,\n            key: 'Generator',\n        };\n        _this = _super.call(this, sceneConfig) || this;\n        _this.MAX = 170; // максимальный размер зоны - если больше, то можно делить\n        // минимальный размер комнаты удобно делать больше 50%. Тогда при соединении\n        // всегда рисуем коридор посередине и попадаем куда надо :)\n        _this.MIN_ROOM_SIZE = 60; // в процентах от размера зоны\n        _this.MIN_ROOM_MARGIN = 15; // комната не должна быть к краю зоны ближе чем это значение\n        _this.SPLIT_FROM = 30; // ограничение по разделению на зоны, не ближе чем 30% от одной стены\n        _this.SPLIT_TO = 70; // ограничение по разделению на зоны, не ближе чем 70% от другой стены\n        _this.zones = [];\n        _this.rooms = [];\n        _this.corridors = [];\n        _this.debugMarks = [];\n        return _this;\n    }\n    GeneratorScene.prototype.preload = function () {\n    };\n    GeneratorScene.prototype.create = function () {\n        var _this = this;\n        this.generateNewMap();\n        // КНОПОЧКИ\n        // кнопочка перегенерации карты\n        this.generateButton = new TextButton_1.default(this, 5, 5, 'Generate');\n        this.generateButton.setFontSize(12);\n        this.generateButton.on('pointerdown', function () { return _this.restartScene(); });\n        this.add.existing(this.generateButton);\n        // кнопочка скрыть/показать метки комнат и корридоров\n        this.generateButton = new TextButton_1.default(this, 70, 5, 'Show marks');\n        this.generateButton.setFontSize(12);\n        this.generateButton.on('pointerdown', function () { return _this.toggleMarks(); });\n        this.add.existing(this.generateButton);\n    };\n    GeneratorScene.prototype.restartScene = function () {\n        this.rooms = [];\n        this.corridors = [];\n        KeyGenerator.resetAll();\n        this.scene.restart();\n    };\n    GeneratorScene.prototype.toggleMarks = function () {\n        var _this = this;\n        this.isDebugMarksVisible = !this.isDebugMarksVisible;\n        this.debugMarks.forEach(function (mark) {\n            mark.setVisible(_this.isDebugMarksVisible);\n        });\n    };\n    GeneratorScene.prototype.update = function (time, delta) {\n    };\n    GeneratorScene.prototype.generateNewMap = function () {\n        var _this = this;\n        var startTree = new Tree(480, 380);\n        startTree.x = 10;\n        startTree.y = 10;\n        startTree.id = 'T' + KeyGenerator.getNextKey();\n        this.zones.push(startTree);\n        // сгенерируем дерево\n        var tree = this.generate(startTree);\n        this.createRooms(tree);\n        // и теперь для всех комнат и коридоров для дебага можно отрисовать их метки\n        // поверх уже нарисованной карты\n        // ЗОНЫ\n        // this.zones.forEach((tree: Tree) => {\n        //     // отрисуем зону\n        //     this.add.rectangle(\n        //         tree.x + (tree.width/2), tree.y + (tree.height/2),\n        //         tree.width - 2, tree.height - 2,\n        //         0x0000FF,\n        //         .2\n        //     );\n        //     this.add.text(\n        //         tree.x, tree.y,\n        //         `${tree.id}`\n        //     ).setColor('yellow').setFontSize(10);\n        // });\n        // КОМНАТЫ\n        this.rooms.forEach(function (room) {\n            // при отрисовке на поле, позиционирование происходит по центру спрайта/фигуры\n            _this.add.rectangle(room.x + (room.width / 2), room.y + (room.height / 2), room.width, room.height, 0xFFFFFF);\n            var mark = _this.add.text(room.x, room.y, \"\" + room.id).setColor('green').setFontSize(10).setVisible(_this.isDebugMarksVisible).setDepth(10);\n            _this.debugMarks.push(mark);\n        });\n        // КОРИДОРЫ\n        this.corridors.forEach(function (corridor) {\n            _this.add.rectangle(corridor.x + (corridor.width / 2), corridor.y + (corridor.height / 2), corridor.width, corridor.height, 0xFFFFFF);\n            var mark = _this.add.text(corridor.x + corridor.width / 2, corridor.y + corridor.height / 2, \"\" + corridor.id).setColor('black').setBackgroundColor('yellow').setFontSize(10).setVisible(_this.isDebugMarksVisible).setDepth(10);\n            _this.debugMarks.push(mark);\n        });\n    };\n    GeneratorScene.prototype.getRandomIntegerBetween = function (from, to) {\n        return Math.floor((Math.random() * (to - from + 1)) + from);\n    };\n    GeneratorScene.prototype.getSplitSizes = function (size) {\n        var splitMin = size / 100 * this.SPLIT_FROM;\n        var splitMax = size / 100 * this.SPLIT_TO;\n        var point = this.getRandomIntegerBetween(splitMin, splitMax);\n        return [point, size - point];\n    };\n    GeneratorScene.prototype.generate = function (tree) {\n        var _a, _b;\n        var splitType;\n        // если не делится, просто возвращаемся сразу\n        if (tree.width < this.MAX && tree.height < this.MAX) {\n            return tree;\n        }\n        if (tree.width > this.MAX && tree.height > this.MAX) {\n            // get random split type\n            var array = ['vertical', 'horizontal'];\n            splitType = array[Math.floor(Math.random() * array.length)];\n        }\n        else {\n            splitType = tree.width > this.MAX ? 'vertical' : 'horizontal';\n        }\n        var leftSize, rightSize;\n        var leftTree, rightTree;\n        if (splitType === 'vertical') {\n            if (tree.width > this.MAX) {\n                _a = this.getSplitSizes(tree.width), leftSize = _a[0], rightSize = _a[1];\n                leftTree = new Tree(leftSize, tree.height);\n                rightTree = new Tree(rightSize, tree.height);\n                leftTree.x = tree.x;\n                leftTree.y = tree.y;\n                rightTree.x = tree.x + leftSize;\n                rightTree.y = tree.y;\n            }\n        }\n        else {\n            if (tree.height > this.MAX) {\n                _b = this.getSplitSizes(tree.height), leftSize = _b[0], rightSize = _b[1];\n                leftTree = new Tree(tree.width, leftSize);\n                rightTree = new Tree(tree.width, rightSize);\n                leftTree.x = tree.x;\n                leftTree.y = tree.y;\n                rightTree.x = tree.x;\n                rightTree.y = tree.y + leftSize;\n            }\n        }\n        if (leftTree instanceof Tree) {\n            leftTree.id = 'T' + KeyGenerator.getNextKey();\n            this.zones.push(leftTree);\n            tree.left = this.generate(leftTree);\n        }\n        if (rightTree instanceof Tree) {\n            rightTree.id = 'T' + KeyGenerator.getNextKey();\n            this.zones.push(rightTree);\n            tree.right = this.generate(rightTree);\n        }\n        return tree;\n    };\n    // отображаем зоны и рисуем комнаты в них\n    GeneratorScene.prototype.createRooms = function (tree) {\n        if (!(tree.left instanceof Tree && tree.right instanceof Tree)) {\n            // отрисуем \"комнату\" в зоне. Комнаты должны быть меньше от 10 до 30% чем ячейка\n            // минимальный размер комнаты - 60% от зоны\n            var minWidth = tree.width / 100 * this.MIN_ROOM_SIZE;\n            var minHeight = tree.height / 100 * this.MIN_ROOM_SIZE;\n            var roomOffsetX = this.getRandomIntegerBetween(this.MIN_ROOM_MARGIN, tree.width - minWidth);\n            var roomOffsetY = this.getRandomIntegerBetween(this.MIN_ROOM_MARGIN, tree.height - minHeight);\n            var roomWidth = this.getRandomIntegerBetween(minWidth, tree.width - roomOffsetX - this.MIN_ROOM_MARGIN);\n            var roomHeight = this.getRandomIntegerBetween(minHeight, tree.height - roomOffsetY - this.MIN_ROOM_MARGIN);\n            // создаём комнату с реальными x и y на холсте\n            var roomX = tree.x + roomOffsetX;\n            var roomY = tree.y + roomOffsetY;\n            tree.room = new Room(roomX, roomY, roomWidth, roomHeight);\n            tree.room.tree = tree;\n            tree.room.id = KeyGenerator.getNextKey('R');\n            this.rooms.push(tree.room);\n        }\n        if (tree.left instanceof Tree && tree.right instanceof Tree) {\n            this.createRooms(tree.left);\n            this.createRooms(tree.right);\n            var corridor = this.getCorridor(tree.left, tree.right);\n            if (corridor instanceof Corridor) {\n                this.corridors.push(corridor);\n            }\n        }\n    };\n    GeneratorScene.prototype.getCorridor = function (treeNode1, treeNode2) {\n        var minCorridorSize = 10;\n        var corridorId;\n        var corridorX, corridorY, corridorWidth, corridorHeight;\n        // Тип разделения - сравним координаты x и y у зон\n        if (treeNode1.x === treeNode2.x) {\n            // вертикальное разделение - коридор рисуем вертикально\n            var top_1, bottom = void 0;\n            if (treeNode1.y < treeNode2.y) {\n                top_1 = treeNode1;\n                bottom = treeNode2;\n            }\n            else {\n                top_1 = treeNode2;\n                bottom = treeNode1;\n            }\n            var topRoom = top_1.getRoom();\n            var bottomRoom = bottom.getRoom();\n            // вычисляем позицию и размеры коридора между комнатами\n            corridorWidth = minCorridorSize;\n            var topRoomBottomY = topRoom.y + topRoom.height;\n            var bottomRoomTopY = bottomRoom.y;\n            // смещение центра коридора по Y, чтобы попасть на обе комнаты\n            corridorHeight = Math.max(bottomRoomTopY, topRoomBottomY) - Math.min(bottomRoomTopY, topRoomBottomY);\n            corridorY = topRoom.y + topRoom.height + (corridorHeight / 2);\n            var topRoomCenterX = topRoom.x + topRoom.width / 2;\n            var bottomRoomCenterX = bottomRoom.x + bottomRoom.width / 2;\n            var centerDiffX = Math.abs(topRoomCenterX - bottomRoomCenterX);\n            corridorX = Math.min(topRoomCenterX, bottomRoomCenterX) + centerDiffX / 2;\n            corridorId = topRoom.id + bottomRoom.id;\n            var newCoord = this.checkAndUpdateCorridorCoords(corridorX, corridorWidth, topRoom.x, topRoom.width, bottomRoom.x, bottomRoom.width);\n            corridorX = newCoord.coord;\n            corridorWidth = newCoord.size;\n        }\n        else {\n            // горизонтальное разделение - коридор горизонтальный\n            var left = void 0, right = void 0;\n            if (treeNode1.x < treeNode2.x) {\n                left = treeNode1;\n                right = treeNode2;\n            }\n            else {\n                left = treeNode2;\n                right = treeNode1;\n            }\n            var leftRoom = left.getRoom();\n            var rightRoom = right.getRoom();\n            // вычисляем позицию и размеры коридора между комнатами\n            corridorHeight = minCorridorSize;\n            var leftRoomRightX = leftRoom.x + leftRoom.width;\n            var rightRoomLeftX = (rightRoom.x);\n            // смещение центра коридора по X, чтобы попасть на обе комнаты\n            corridorWidth = Math.max(rightRoomLeftX, leftRoomRightX) - Math.min(rightRoomLeftX, leftRoomRightX);\n            corridorX = leftRoom.x + leftRoom.width + (corridorWidth / 2);\n            var leftRoomCenterY = leftRoom.y + leftRoom.height / 2;\n            var rightRoomCenterY = rightRoom.y + rightRoom.height / 2;\n            var centerDiffY = Math.abs(leftRoomCenterY - rightRoomCenterY);\n            corridorY = Math.min(leftRoomCenterY, rightRoomCenterY) + centerDiffY / 2;\n            corridorId = leftRoom.id + rightRoom.id;\n            var newCoord = this.checkAndUpdateCorridorCoords(corridorY, corridorHeight, leftRoom.y, leftRoom.height, rightRoom.y, rightRoom.height);\n            corridorY = newCoord.coord;\n            corridorHeight = newCoord.size;\n        }\n        var c = new Corridor(corridorX - corridorWidth / 2, corridorY - corridorHeight / 2, corridorWidth, corridorHeight);\n        c.id = corridorId;\n        return c;\n    };\n    GeneratorScene.prototype.checkAndUpdateCorridorCoords = function (originCoord, originSize, coordRoom1, sizeRoom1, coordRoom2, sizeRoom2) {\n        // проверим - попал ли коридор на комнаты. Вдруг он сместился, нужно подвинуть\n        var coordMin = originCoord - originSize / 2;\n        var coordMax = originCoord + originSize / 2;\n        var newCorridorMaxX = coordMax, newCorridorMinX = coordMin;\n        if (coordMax > (coordRoom1 + sizeRoom1)) {\n            newCorridorMaxX = (coordRoom1 + sizeRoom1);\n        }\n        if (coordMax > (coordRoom2 + sizeRoom2)) {\n            newCorridorMaxX = (coordRoom2 + sizeRoom2);\n        }\n        if (coordMin < (coordRoom1)) {\n            newCorridorMinX = coordRoom1;\n        }\n        if (coordMin < coordRoom2) {\n            newCorridorMinX = coordRoom2;\n        }\n        // исправим положение коридора\n        if (originCoord < (newCorridorMinX + originSize / 2)) {\n            originCoord = newCorridorMinX + originSize / 2;\n        }\n        if (originCoord > (newCorridorMaxX - originSize / 2)) {\n            originCoord = (newCorridorMaxX - originSize / 2);\n        }\n        return { coord: originCoord, size: originSize };\n    };\n    return GeneratorScene;\n}(Phaser.Scene));\nexports.GeneratorScene = GeneratorScene;\n\n\n//# sourceURL=webpack:///./src/scenes/GeneratorScene.ts?");

/***/ }),

/***/ "./src/scenes/HelloScene.ts":
/*!**********************************!*\
  !*** ./src/scenes/HelloScene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.HelloScene = void 0;\nvar Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar HelloScene = /** @class */ (function (_super) {\n    __extends(HelloScene, _super);\n    function HelloScene() {\n        var _this = this;\n        var sceneConfig = {\n            active: false,\n            visible: false,\n            key: 'Hello',\n        };\n        _this = _super.call(this, sceneConfig) || this;\n        return _this;\n    }\n    HelloScene.prototype.preload = function () {\n    };\n    HelloScene.prototype.create = function () {\n        var _this = this;\n        var centerX = this.game.scale.width / 2;\n        var centerY = this.game.scale.height / 2;\n        // Выбор сцены. Переход на генератор\n        this.menuGeneratorLink = this.add.text(10, 10, 'Map generator')\n            .setColor('black')\n            .setInteractive({ useHandCursor: true })\n            .on('pointerover', function () { return _this.hoverText(); })\n            .on('pointerout', function () { return _this.outText(); })\n            .on('pointerdown', function () { return _this.clickText(); });\n        // Нарисуем кнопку, при клике - вызываем сцену игры\n        this.button = this.add.circle(centerX, centerY, 25, 0x00FF00)\n            .setInteractive({ useHandCursor: true })\n            .on('pointerover', function () { return _this.hoverButton(); })\n            .on('pointerout', function () { return _this.outButton(); })\n            .on('pointerdown', function () { return _this.clickButton(); });\n        this.add.polygon(centerX + 2, centerY + 15, [\n            0, -15, 0, 15, 20, 0,\n        ], 0x000000);\n    };\n    HelloScene.prototype.hoverButton = function () {\n        this.button.setFillStyle(0xFFFF00);\n    };\n    HelloScene.prototype.outButton = function () {\n        this.button.setFillStyle(0x00FF00);\n    };\n    HelloScene.prototype.clickButton = function () {\n        this.scene.start('Game');\n    };\n    HelloScene.prototype.hoverText = function () {\n        this.menuGeneratorLink.setShadow(0, 0, 'black', 5);\n    };\n    HelloScene.prototype.outText = function () {\n        this.menuGeneratorLink.setShadow(0, 0, 'white', 0);\n    };\n    HelloScene.prototype.clickText = function () {\n        this.scene.start('Generator');\n    };\n    HelloScene.prototype.update = function (time, delta) {\n    };\n    return HelloScene;\n}(Phaser.Scene));\nexports.HelloScene = HelloScene;\n\n\n//# sourceURL=webpack:///./src/scenes/HelloScene.ts?");

/***/ })

/******/ });