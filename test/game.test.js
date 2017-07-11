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
        it('should show state as current player is x', function () {
            expect(game.getState()).to.equal('Current player is x');
        });
    });
    describe('after a turn', function () {
        before(function () {
            game.restart();
            game.turn(0, 0);
        });
        it('should show state as current player is o', function () {
            expect(game.getState()).to.equal('Current player is o');
        });
    });
    describe('after restart', function () {
        before(function () {
            game.restart();
        });
        it('should show state as current player is x', function () {
            expect(game.getState()).to.equal('Current player is x');
        });
    });
    describe('after a full game of moves that ends with no winner', function () {
        before(function () {
            game.restart();
            game.turn(0, 0);
            game.turn(1, 1);
            game.turn(2, 2);
            game.turn(1, 0);
            game.turn(1, 2);
            game.turn(0, 2);
            game.turn(2, 0);
            game.turn(2, 1);
            game.turn(0, 1);
        });
        it('should show state as "Draw"', function () {
            expect(game.getState()).to.equal('Draw');
        });
    });
    describe('when there is a winning board', function() {
        describe('with a row win', function () {
            before(function () {
                game.restart();
                game.turn(1, 0);
                game.turn(0, 1);
                game.turn(1, 1);
                game.turn(2, 2);
                game.turn(1, 2);
            });
            it('should show state as having a winning player', function () {
                expect(game.getState()).to.equal('x is the winner');
            });
        });
        describe('with a column win', function () {
            before(function () {
                game.restart();
                game.turn(0, 1);
                game.turn(0, 0);
                game.turn(1, 1);
                game.turn(1, 0);
                game.turn(2, 1);
            });
            it('should show state as having a winning player', function () {
                expect(game.getState()).to.equal('x is the winner');
            });
        });
        describe('with a diagonal win', function () {
            before(function () {
                game.restart();
                game.turn(0, 0);
                game.turn(0, 1);
                game.turn(1, 1);
                game.turn(0, 2);
                game.turn(2, 2);
            });
            it('should show state as having a winning player', function () {
                expect(game.getState()).to.equal('x is the winner');
            });
        });
    });
});
