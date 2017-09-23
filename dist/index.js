/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function Board(spaces) {
    this.spaces = spaces || [[null, null, null], [null, null, null], [null, null, null]];
}

Board.prototype.setBoard = function (spaces) {
    this.spaces = spaces;
};

Board.prototype.resetBoard = function () {
    this.spaces = this.spaces.map(function (row) {
        return row.map(function (space) {
            return null;
        });
    });
};

Board.prototype.addMove = function (player, row, column) {
    this.spaces[row][column] = player;
};

Board.prototype.isFull = function () {
    var rows = 3;
    for (var row = 0; row < rows; row++) {
        if (this.spaces[row].indexOf(null) > -1) return false;
    }
    return true;
};

Board.prototype.isSpaceOccupied = function (row, column) {
    return this.spaces[row][column] !== null;
};

Board.prototype.availableSpaces = function () {
    var spaces = this.spaces;
    var available = [];
    var rows = 3;
    var columns = 3;
    for (var row = 0; row < rows; row++) {
        for (var column = 0; column < columns; column++) {
            if (spaces[row][column] === null) {
                available.push([row, column]);
            }
        }
    }
    return available;
};

exports.default = Board;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

var _strategies = __webpack_require__(3);

var _strategies2 = _interopRequireDefault(_strategies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function twoPlayerGame() {
    var board = new _board2.default();
    return new _game2.default(board, _strategies.none, _strategies.none);
}

function easyGame(player) {
    var board = new _board2.default();
    if (player === 'o') return new _game2.default(board, _strategies.simple, _strategies.none);
    if (player === 'x' || player === undefined) return new _game2.default(board, _strategies.none, _strategies.simple);
}

function unbeatableGame(player) {
    var board = new _board2.default();
    if (player === 'o') return new _game2.default(board, _strategies.unbeatable, _strategies.none);
    if (player === 'x' || player === undefined) return new _game2.default(board, _strategies.none, _strategies.unbeatable);
}

var TicTacToe = {
    twoPlayerGame: twoPlayerGame,
    easyGame: easyGame,
    unbeatableGame: unbeatableGame
};

exports.default = TicTacToe;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Game(board, xStrategy, oStrategy) {
    this.board = board;
    this.x = xStrategy;
    this.o = oStrategy;
    this.currentPlayer = 'x';
}

Game.prototype.turn = function (row, column) {
    if (row === undefined && column === undefined) {
        var move = this[this.getCurrentPlayer()](this);
        row = move[0];
        column = move[1];
    }
    if (this.isValidMove(row, column)) {
        this.board.addMove(this.getCurrentPlayer(), row, column);
        this.nextPlayer();
    }
};

Game.prototype.restart = function () {
    this.board.resetBoard();
    this.currentPlayer = 'x';
};

Game.prototype.getAvailableSpaces = function () {
    return this.board.availableSpaces();
};

Game.prototype.isSpaceOccupied = function (row, column) {
    return this.board.isSpaceOccupied(row, column);
};

Game.prototype.isValidMove = function (row, column) {
    return row >= 0 && row <= 2 && column >= 0 && column <= 2 && !this.isSpaceOccupied(row, column);
};

Game.prototype.getBoardSpaces = function () {
    return this.board.spaces;
};

Game.prototype.setBoardSpaces = function (spaces) {
    this.board.setBoard(spaces);
};

Game.prototype.getState = function () {
    if (!this.isGameOver()) return 'Current player is ' + this.currentPlayer;else return this.isWinner('x') ? 'x is the winner' : this.isWinner('o') ? 'o is the winner' : 'Draw';
};

Game.prototype.getCurrentPlayer = function () {
    return this.currentPlayer;
};

Game.prototype.setCurrentPlayer = function (player) {
    this.currentPlayer = player;
};

Game.prototype.nextPlayer = function (player) {
    this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
};

Game.prototype.dummyGame = function () {
    var dummyBoard = new _board2.default();
    var dummy = new Game(dummyBoard);
    dummy.setBoardSpaces(this.board.spaces.map(function (x) {
        return x.map(function (x) {
            return x;
        });
    }));
    dummy.setCurrentPlayer(this.getCurrentPlayer());
    return dummy;
};

Game.prototype.isGameOver = function () {
    return this.isWinner('o') || this.isWinner('x') || this.board.isFull();
};

Game.prototype.isWinner = function (player) {
    var spaces = this.getBoardSpaces();
    return rowWin(player) || columnWin(player) || diagonalWin(player);

    function rowWin(player) {
        var rows = 3;
        for (var row = 0; row < rows; row++) {
            if (spaces[row][0] === player && spaces[row][1] === player && spaces[row][2] === player) return true;
        }
        return false;
    }

    function columnWin(player) {
        var columns = 3;

        for (var column = 0; column < columns; column++) {
            if (spaces[0][column] === player && spaces[1][column] === player && spaces[2][column] === player) return true;
        }
        return false;
    }

    function diagonalWin(player) {
        var leftToRight = spaces[0][0] === player && spaces[1][1] === player && spaces[2][2] === player;
        var rightToLeft = spaces[0][2] === player && spaces[1][1] === player && spaces[2][0] === player;
        if (leftToRight || rightToLeft) return true;
        return false;
    }
};

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.unbeatable = exports.simple = exports.none = undefined;

var _none = __webpack_require__(4);

var _none2 = _interopRequireDefault(_none);

var _simple = __webpack_require__(5);

var _simple2 = _interopRequireDefault(_simple);

var _unbeatable = __webpack_require__(6);

var _unbeatable2 = _interopRequireDefault(_unbeatable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.none = _none2.default;
exports.simple = _simple2.default;
exports.unbeatable = _unbeatable2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function none(game) {
	return null;
}

exports.default = none;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function simple(game) {
	var length = game.getAvailableSpaces().length;
	var randomIndex = Math.floor(Math.random() * length);
	return game.getAvailableSpaces()[randomIndex];
}

exports.default = simple;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function unbeatable(game) {
    var choice = void 0;
    return chooseMove(game);

    function chooseMove(game) {
        var player = game.getCurrentPlayer();
        var opponent = getOpponent(player);
        var minimax = getMinimax(player, opponent);
        if (game.getBoardSpaces()[1][1] === null) return [1, 1];
        var initialDepth = 0;
        minimax(game, initialDepth);
        return choice;
    }

    function getOpponent(player) {
        return player === 'x' ? 'o' : 'x';
    }

    function isEmpty(game) {
        return game.getAvailableSpaces().length === 9;
    }

    function score(game, depth, player, opponent) {
        return game.isWinner(player) ? 10 - depth : game.isWinner(opponent) ? depth - 10 : 0;
    }

    function maxIndex(array) {
        var max = Math.max.apply(null, array);
        return array.indexOf(max);
    }
    function minIndex(array) {
        var min = Math.min.apply(null, array);
        return array.indexOf(min);
    }

    function possibleGame(move, game) {
        var dummy = game.dummyGame();
        dummy.board.addMove(game.getCurrentPlayer(), move[0], move[1]);
        dummy.nextPlayer();
        return dummy;
    }

    function getMinimax(player, opponent) {
        return minimax;

        function minimax(game, depth) {
            if (game.isGameOver()) return score(game, depth, player, opponent);
            var newDepth = depth + 1;
            var scores = [];
            var moves = [];

            game.getAvailableSpaces().forEach(function (move) {
                var possible = possibleGame(move, game);
                var score = minimax(possible, newDepth);
                scores.push(score);
                moves.push(move);
            });

            return getMinMaxScore(game.getCurrentPlayer());

            function getMinMaxScore(currentPlayer) {
                var _maxMinIndex;

                var maxMinIndex = (_maxMinIndex = {}, _defineProperty(_maxMinIndex, player, maxIndex(scores)), _defineProperty(_maxMinIndex, opponent, minIndex(scores)), _maxMinIndex);
                var index = maxMinIndex[currentPlayer];
                choice = moves[index];
                return scores[index];
            }
        }
    }
}

exports.default = unbeatable;

/***/ })
/******/ ]);