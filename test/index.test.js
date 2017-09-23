
import { assert } from 'chai'
import ticTacToe from '../index'
import { none, simple, unbeatable } from '../strategies'

const twoPlayerGame = ticTacToe.twoPlayerGame;
const easyGame = ticTacToe.easyGame;
const unbeatableGame = ticTacToe.unbeatableGame;


describe('ticTacToe', function () {
    describe('twoPlayerGame method', function() {
        const twoPlayer = twoPlayerGame();
        describe('when called', function () {
            const gameStrategyX = twoPlayer.x;
            const gameStrategyO = twoPlayer.o;
            it('should return a new game object with two human players', function () {
                assert.deepEqual(gameStrategyX, none);
                assert.deepEqual(gameStrategyO, none);
            });
        });
    });
    describe('easyGame method with no argument', function() {
        const easy = easyGame();
        describe('when called', function () {
            const gameStrategyX = easy.x;
            const gameStrategyO = easy.o;
            it('should return a new game object with a human player and simple strategy player', function () {
                assert.deepEqual(gameStrategyX, none);
                assert.deepEqual(gameStrategyO, simple);
            });
        });
    });
    describe('unbeatableGame method with no argument', function() {
        const unbeatableG = unbeatableGame();
        describe('when called', function () {
            const gameStrategyX = unbeatableG.x;
            const gameStrategyO = unbeatableG.o;
            it('should return a new game object with a human player and unbeatable strategy player', function () {
                assert.deepEqual(gameStrategyX, none);
                assert.deepEqual(gameStrategyO, unbeatable);
            });
        });
    });
    describe('easyGame method with "o" argument', function() {
        const easy = easyGame('o');
        describe('when called', function () {
            const gameStrategyX = easy.x;
            const gameStrategyO = easy.o;
            it('should return a new game object with a human player and simple strategy player', function () {
                assert.deepEqual(gameStrategyX, simple);
                assert.deepEqual(gameStrategyO, none);
            });
        });
    });
    describe('unbeatableGame method with "o" argument', function() {
        const unbeatableG = unbeatableGame('o');
        describe('when called', function () {
            const gameStrategyX = unbeatableG.x;
            const gameStrategyO = unbeatableG.o;
            it('should return a new game object with a human player and unbeatable strategy player', function () {
                assert.deepEqual(gameStrategyX, unbeatable);
                assert.deepEqual(gameStrategyO, none);
            });
        });
    });
    describe('easyGame method with "x" argument', function() {
        const easy = easyGame('x');
        describe('when called', function () {
            const gameStrategyX = easy.x;
            const gameStrategyO = easy.o;
            it('should return a new game object with a human player and simple strategy player', function () {
                assert.deepEqual(gameStrategyX, none);
                assert.deepEqual(gameStrategyO, simple);
            });
        });
    });
    describe('unbeatableGame method with "x" argument', function() {
        const unbeatableG = unbeatableGame('x');
        describe('when called', function () {
            const gameStrategyX = unbeatableG.x;
            const gameStrategyO = unbeatableG.o;
            it('should return a new game object with a human player and unbeatable strategy player', function () {
                assert.deepEqual(gameStrategyX, none);
                assert.deepEqual(gameStrategyO, unbeatable);
            });
        });
    });
});
