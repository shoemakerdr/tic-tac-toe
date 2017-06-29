'use strict';

const expect = require('chai').expect;
const Game = require('../game');
const Board = require('../board');

const board = new Board();
let game;

function expectEmptyBoard() {
    for (let row = 0; row < 3; row++) {
        expect(game.board.spaces[row]).to.have.ordered.members([null,null,null]);
    }
}

describe('Game', function () {
    before(function () {
        game = new Game(board);
    });
    describe('after initializing', function () {
        it('should have an empty board', function () {
            expectEmptyBoard();
        });
        it('should have the current player as "x"', function () {
            expect(game.currentPlayer).to.equal('x');
        });
    });
    describe('after a turn', function () {
        before(function () {
            game.restart();
            game.turn(0, 0);
        });
        it('should set the requested move', function () {
            expect(game.board.spaces[0][0]).to.equal('x');
        });
        it('should set the current player to the other player', function () {
            expect(game.currentPlayer).to.equal('o');
        });
    });
    describe('after restart', function () {
        before(function () {
            game.restart();
        });
        it('should have an empty board', function () {
            expectEmptyBoard();
        });
        it('should have the current player as "x"', function () {
            expect(game.currentPlayer).to.equal('x');
        });
    });
});