'use strict';

import { assert } from 'chai'
import Game from '../game'
import Board from '../board'
import { none, simple, unbeatable } from '../strategies'

function setupGame(board, currentPlayer, player1, player2) {
	const game = new Game(new Board(), player1, player2);
	if (board) game.setBoardSpaces(board);
	if (currentPlayer) game.setCurrentPlayer(currentPlayer);
	return game;
}

function automatedGame(startPlayer, strategy1, strategy2) {
    const game = setupGame(null, startPlayer, strategy1, strategy2);
    while(!game.isGameOver()) {
        game.turn();
    }
    return game.getState();
}

function endInDrawOrXWinner(outcome) {
    return outcome === 'Draw'
        || outcome === 'x is the winner';
}

function endInDraw(outcome) {
    return outcome === 'Draw';
}

describe('Game', function () {
    describe('after initializing with no computer players', function () {
        const game = setupGame(null, null, none, none);
        it('should show state as current player is x', function () {
            assert.equal(game.getState(), 'Current player is x');
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
		describe('after an invalid move', function () {
			before(function () {
                game.restart();
                game.turn(0, 4);
            });
			it('should not make move', function () {
				const emptyBoard = [
	    			[null,null,null],
	    			[null,null,null],
	    			[null,null,null]
	    		];
				assert.deepEqual(game.getBoardSpaces(), emptyBoard);
			});
			it('should show same current player as before', function () {
				assert.equal(game.getState(), 'Current player is x');
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
                    game.setCurrentPlayer('o');
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
    describe('with unbeatable player', function () {
		// NOTE: commented out (long-running) passing tests to make test suite go faster
        describe('when unbeatable is first player', function () {
            const unbeatableOutcome1 = automatedGame(null,unbeatable, simple);
            // const unbeatableOutcome2 = automatedGame(null,unbeatable, simple);
            // const unbeatableOutcome3 = automatedGame(null,unbeatable, simple);
            // const unbeatableOutcome4 = automatedGame(null,unbeatable, simple);
            // const unbeatableOutcome5 = automatedGame(null,unbeatable, simple);
            // const unbeatableOutcome6 = automatedGame(null,unbeatable, simple);
            // const unbeatableOutcome7 = automatedGame(null,unbeatable, simple);
            // const unbeatableOutcome8 = automatedGame(null,unbeatable, simple);
            it('should always end in either a draw or in the unbeatable player winning', function () {
                assert.isTrue(endInDrawOrXWinner(unbeatableOutcome1));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome2));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome3));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome4));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome5));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome6));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome7));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome8));
            });
        });
        describe('when unbeatable is second player', function () {
            const unbeatableOutcome1 = automatedGame('o',unbeatable, simple);
            // const unbeatableOutcome2 = automatedGame('o',unbeatable, simple);
            // const unbeatableOutcome3 = automatedGame('o',unbeatable, simple);
            // const unbeatableOutcome4 = automatedGame('o',unbeatable, simple);
            // const unbeatableOutcome5 = automatedGame('o',unbeatable, simple);
            // const unbeatableOutcome6 = automatedGame('o',unbeatable, simple);
            // const unbeatableOutcome7 = automatedGame('o',unbeatable, simple);
            // const unbeatableOutcome8 = automatedGame('o',unbeatable, simple);
            it('should always end in either a draw or in the unbeatable player winning', function () {
                assert.isTrue(endInDrawOrXWinner(unbeatableOutcome1));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome2));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome3));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome4));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome5));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome6));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome7));
                // assert.isTrue(endInDrawOrXWinner(unbeatableOutcome8));
            });
        });
        describe('when both players are unbeatable', function () {
            const unbeatableOutcome1 = automatedGame(null,unbeatable, unbeatable);
            // const unbeatableOutcome2 = automatedGame(null,unbeatable, unbeatable);
            // const unbeatableOutcome3 = automatedGame(null,unbeatable, unbeatable);
            // const unbeatableOutcome4 = automatedGame(null,unbeatable, unbeatable);
            // const unbeatableOutcome5 = automatedGame(null,unbeatable, unbeatable);
            // const unbeatableOutcome6 = automatedGame(null,unbeatable, unbeatable);
            // const unbeatableOutcome7 = automatedGame(null,unbeatable, unbeatable);
            // const unbeatableOutcome8 = automatedGame(null,unbeatable, unbeatable);
            it('should always end in a draw', function () {
                assert.isTrue(endInDraw(unbeatableOutcome1));
                // assert.isTrue(endInDraw(unbeatableOutcome2));
                // assert.isTrue(endInDraw(unbeatableOutcome3));
                // assert.isTrue(endInDraw(unbeatableOutcome4));
                // assert.isTrue(endInDraw(unbeatableOutcome5));
                // assert.isTrue(endInDraw(unbeatableOutcome6));
                // assert.isTrue(endInDraw(unbeatableOutcome7));
                // assert.isTrue(endInDraw(unbeatableOutcome8));
            });
        });
    });
	describe('isValidMove method', function () {
		describe('when given a valid move', function () {
			const game = setupGame(null, null, none, none);
			const validMove1 = [0,0];
			const validMove2 = [1,0];
			const validMove3 = [2,2];
			it('should return true', function () {
				assert.isTrue(game.isValidMove(validMove1[0], validMove1[1]));
				assert.isTrue(game.isValidMove(validMove2[0], validMove2[1]));
				assert.isTrue(game.isValidMove(validMove3[0], validMove3[1]));
			});
		});
		describe('when given an invalid move', function () {
			const game = setupGame(null, null, none, none);
			game.turn(2,2);
			const invalidMove1 = [3,0];
			const invalidMove2 = [1,'bubble'];
			const invalidMove3 = [2,2];
			it('should return true', function () {
				assert.isFalse(game.isValidMove(invalidMove1[0], invalidMove1[1]));
				assert.isFalse(game.isValidMove(invalidMove2[0], invalidMove2[1]));
				assert.isFalse(game.isValidMove(invalidMove3[0], invalidMove3[1]));
			});
		});
	});
});
