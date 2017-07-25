
const expect = require('chai').expect;
const assert = require('chai').assert;
const TicTacToe = require('../index');

const twoPlayer = TicTacToe.twoPlayerGame;
const easy = 
const unbeatableGame = 


describe('TicTacToe', function () {
    describe('#twoPlayerGame', function() {
        describe('after a completed game where x wins', function() {
			const twoP = twoPlayer();
			twoP.turn(0,0);
            twoP.turn(0,1);
            twoP.turn(0,2);
            twoP.turn(1,0);
            twoP.turn(1,1);
            twoP.turn(1,2);
            twoP.turn(2,0);
            it('should show x is the winner', function() {
                expect(twoP.getState()).to.equal('x is the winner');
            });
        });
        describe('after a completed game where no one wins', function() {
			const twoP = twoPlayer();
			ttt.turn(0, 0);
            ttt.turn(1, 1);
            ttt.turn(2, 2);
            ttt.turn(1, 0);
            ttt.turn(1, 2);
            ttt.turn(0, 2);
            ttt.turn(2, 0);
            ttt.turn(2, 1);
            ttt.turn(0, 1);
            it('should be over', function() {
                expect(ttt.isGameOver()).to.equal(true);
            });
            it('should not have a winner', function() {
                expect(ttt.getState()).to.equal('Draw');
            });
        });
        describe('during an unfinished game', function() {
			let ttt;
			before(function () {
				ttt = twoPlayerGame('no','no');
				ttt.turn(0,0);
	            ttt.turn(1,1);
	            ttt.turn(2,2);
	            ttt.turn(1,0);
	            ttt.turn(1,2);
	            ttt.turn(2,1);
	            ttt.turn(0,1);
			});
            it('should not be over', function() {
                expect(ttt.isGameOver()).to.equal(false);
            });
            it('should show that it is o\'s turn', function() {
                expect(ttt.getState()).to.equal('Current player is o');
            });
        });
    });
});
