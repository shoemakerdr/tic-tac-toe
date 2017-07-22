'use strict';

const assert = require('chai').assert;
const Game = require('../game');
const Board = require('../board');
const strategies = require('../strategies');

const board = new Board();
const noStrategy = strategies['no'];
const simpleStrategy = strategies['simple'];
const smartStrategy = strategies['smart'];
let game;

function setupGame(board, currentPlayer, player1, player2) {
	const game = new Game(new Board(), player1, player2);
	if (board) game.setBoardSpaces(board);
	if (currentPlayer) game.setCurrentPlayer(currentPlayer);
	return game;
}

function expectEmptyBoard() {
    for (let row = 0; row < 3; row++) {
        expect(game.board.spaces[row]).to.have.ordered.members([null,null,null]);
    }
}

describe('Game', function () {
    before(function () {
        game = new Game(board, noStrategy, noStrategy);
    });
    describe('after initializing with no players', function () {
        it('should show state as current player is x', function () {
            assert.equal(game.getState(), 'Current player is x');
        });
    });
    describe('after a turn', function () {
        before(function () {
            game.restart();
            game.turn(0, 0);
        });
        it('should show state as current player is o', function () {
            assert.equal(game.getState(), 'Current player is o');
        });
    });
    describe('after restart', function () {
        before(function () {
            game.restart();
        });
        it('should show state as current player is x', function () {
            assert.equal(game.getState(), 'Current player is x');
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
            assert.equal(game.getState(), 'Draw');
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
                assert.equal(game.getState(), 'x is the winner');
            });
        });
        describe('with a column win', function () {
            before(function () {
                game.restart();
                game.setCurrentPlayer('o')
                game.turn(0, 1);
                game.turn(0, 0);
                game.turn(1, 1);
                game.turn(1, 0);
                game.turn(2, 1);
            });
            it('should show state as having a winning player', function () {
                assert.equal(game.getState(), 'o is the winner');
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
                assert.equal(game.getState(), 'x is the winner');
            });
        });
    });
    describe('dummyGame method', function () {
    	describe('when given an empty game', function () {
    		const emptyGame = setupGame();
    		const emptyBoard = emptyGame.getBoardSpaces();
    		const dummy = emptyGame.dummyGame();
    		it('should return a copy of the game with "x" as the current player and an empty board', function () {
    			assert.deepEqual(dummy.getCurrentPlayer(), 'x');
    			assert.deepEqual(dummy.getBoardSpaces(), emptyBoard);
    		});
    		it('should not return the same board instance, only a copy', function () {
    			assert.isFalse(dummy.board === emptyGame.board, 'the dummy board should not be the same reference as the incoming board');
    		});
    	});
    	describe('when given a game with one move made', function () {
    		const oneMoveBoard = [
    			[null,null,null],
    			[null,null,null],
    			[null,null,'x']
    		];
    		const oneMoveGame = setupGame(oneMoveBoard, 'o');
    		const dummy = oneMoveGame.dummyGame();
    		it('should return a copy of the game with "o" as the current player and the same board configuration', function () {
    			assert.deepEqual(dummy.getCurrentPlayer(), 'o');
    			assert.deepEqual(dummy.getBoardSpaces(), oneMoveBoard);
    		});
    		it('should not return the same board instance, only a copy', function () {
    			assert.isFalse(dummy.board === oneMoveGame.board, 'the dummy board should not be the same reference as the incoming board');
    		});
    	});
    	describe('when given a game with two moves made', function () {
    		const twoMoveBoard = [
    			[null,null,null],
    			[null,'o',null],
    			[null,null,'x']
    		];
    		const twoMoveGame = setupGame(twoMoveBoard, 'x');
    		const dummy = twoMoveGame.dummyGame();
    		it('should return a copy of the game with "x" as the current player and the same board configuration', function () {
    			assert.deepEqual(dummy.getCurrentPlayer(), 'x');
    			assert.deepEqual(dummy.getBoardSpaces(), twoMoveBoard);
    		});
    		it('should not return the same board, only a copy', function () {
    			const dummyBoard = dummy.getBoardSpaces();
    			assert.isFalse(dummyBoard === twoMoveBoard, 'the dummy board should not be the same reference as the incoming board');
    		});
    	});
    });
});
