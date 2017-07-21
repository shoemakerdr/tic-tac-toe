
const expect = require('chai').expect;
const TicTacToe = require('../index');

const twoPlayerGame = TicTacToe.twoPlayerGame;


describe('TicTacToe', function () {
    describe('#twoPlayerGame', function() {
        describe('after a completed game where x wins', function() {
			let ttt;
			before(function () {
				ttt = twoPlayerGame('no','no');
				ttt.turn(0,0);
	            ttt.turn(0,1);
	            ttt.turn(0,2);
	            ttt.turn(1,0);
	            ttt.turn(1,1);
	            ttt.turn(1,2);
	            ttt.turn(2,0);
			});
            it('should be over', function() {
                expect(ttt.isGameOver()).to.equal(true);
            });
            it('should show x is the winner', function() {
                expect(ttt.getState()).to.equal('x is the winner');
            });
        });
        describe('after a completed game where no one wins', function() {
			let ttt;
			before(function () {
				ttt = twoPlayerGame('no','no');
				ttt.turn(0, 0);
	            ttt.turn(1, 1);
	            ttt.turn(2, 2);
	            ttt.turn(1, 0);
	            ttt.turn(1, 2);
	            ttt.turn(0, 2);
	            ttt.turn(2, 0);
	            ttt.turn(2, 1);
	            ttt.turn(0, 1);
			});
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
