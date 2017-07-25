
const expect = require('chai').expect;
const assert = require('chai').assert;
const TicTacToe = require('../index');
const strategies = require('../strategies');

const noStrategy = strategies['none'];
const simpleStrategy = strategies['simple'];
const unbeatableStrategy = strategies['unbeatable'];
const twoPlayerGame = TicTacToe.twoPlayerGame;
const easyGame = TicTacToe.easyGame;
const unbeatableGame = TicTacToe.unbeatableGame;


describe('TicTacToe', function () {
    describe('twoPlayerGame method', function() {
        const twoPlayer = twoPlayerGame();
        describe('when called', function () {
            const gameStrategyX = twoPlayer.x;
            const gameStrategyO = twoPlayer.o;
            it('should return a new game object with two human players', function () {
                assert.deepEqual(gameStrategyX, noStrategy);
                assert.deepEqual(gameStrategyO, noStrategy);
            });
        });
    });
    describe('easyGame method', function() {
        const easy = easyGame();
        describe('when called', function () {
            const gameStrategyX = easy.x;
            const gameStrategyO = easy.o;
            it('should return a new game object with a human player and simple strategy player', function () {
                assert.deepEqual(gameStrategyX, noStrategy);
                assert.deepEqual(gameStrategyO, simpleStrategy);
            });
        });
    });
    describe('unbeatableGame method', function() {
        const unbeatable = unbeatableGame();
        describe('when called', function () {
            const gameStrategyX = unbeatable.x;
            const gameStrategyO = unbeatable.o;
            it('should return a new game object with a human player and unbeatable strategy player', function () {
                assert.deepEqual(gameStrategyX, noStrategy);
                assert.deepEqual(gameStrategyO, unbeatableStrategy);
            });
        });
    });
});
