'use strict';

const expect = require('chai').expect;
const Board = require('../board');
const board = new Board();

function expectEmptyBoard() {
    for (let row = 0; row < 3; row++) {
        expect(board.spaces[row]).to.have.ordered.members([null,null,null]);
    }
}

describe('Board', function() {
    
    beforeEach(function () {
        board.resetBoard();
    });
    
    describe('when empty', function () {
        it('should return all spaces as null', function () {
            expectEmptyBoard();    
                
        });
        it('should know that it is not full', function () {
            expect(board.isFull()).to.be.false;
        });
        it('should not have a winner', function () {
            expect(board.isWinner('x')).to.be.false;
            expect(board.isWinner('o')).to.be.false;
        });
    });
    describe('when full', function () {
        beforeEach(function () {
            board.addMove('x', 0, 0);
            board.addMove('o', 0, 1);
            board.addMove('x', 0, 2);
            board.addMove('o', 1, 0);
            board.addMove('x', 1, 1);
            board.addMove('o', 1, 2);
            board.addMove('x', 2, 0);
            board.addMove('o', 2, 1);
            board.addMove('x', 2, 2);
        });
        it('should know that it is full', function () {
            expect(board.isFull()).to.be.true;
        });
        it('should be able to tell if a particular player is a winner', function () {
            expect(board.isWinner('x')).to.be.true;
        });
        it('should be able to tell if a particular player is NOT a winner', function () {
            expect(board.isWinner('o')).to.be.false;
        });
        it('should be empty after reset', function () {
            board.resetBoard();
            expectEmptyBoard();
        });
    });
    describe('if a particular space is occupied', function () {
        beforeEach(function () {
            board.addMove('x', 0, 0); 
        });
        it('should know that it is occupied', function() {
            expect(board.isSpaceOccupied(0, 0)).to.be.true;
        });
        it('should throw error if second move added that space', function () {
            expect(function () {board.addMove('x', 0, 0);}).to.throw();
        });
    });
    describe('if a particular space is unoccupied', function () {
        it('should know that it is not occupied', function() {
            expect(board.isSpaceOccupied(0, 0)).to.be.false;
        });
    });
    describe('when there is a winning board', function() {
        describe('with a row win', function () {
            beforeEach(function () {
                board.addMove('x', 1, 0);
                board.addMove('o', 0, 1);
                board.addMove('x', 1, 1);
                board.addMove('o', 2, 2);
                board.addMove('x', 1, 2);
            });
            it('should be able to tell if the winning player is the winner', function () {
                expect(board.isWinner('x')).to.be.true;
            });
            it('should be able to tell if the losing player is NOT the winner', function () {
                expect(board.isWinner('o')).to.be.false;
            });
            it('should be empty after reset', function () {
                board.resetBoard();
                expectEmptyBoard();
            });
        });
        describe('with a column win', function () {
            beforeEach(function () {
                board.addMove('x', 0, 1);
                board.addMove('o', 0, 0);
                board.addMove('x', 1, 1);
                board.addMove('o', 1, 0);
                board.addMove('x', 2, 1);
            });
            it('should be able to tell if the winning player is the winner', function () {
                expect(board.isWinner('x')).to.be.true;
            });
            it('should be able to tell if the losing player is NOT the winner', function () {
                expect(board.isWinner('o')).to.be.false;
            });
            it('should be empty after reset', function () {
                board.resetBoard();
                expectEmptyBoard();
            });
        });
        describe('with a diagonal win', function () {
            beforeEach(function () {
                board.addMove('x', 0, 0);
                board.addMove('o', 0, 1);
                board.addMove('x', 1, 1);
                board.addMove('o', 0, 2);
                board.addMove('x', 2, 2);
            });
            it('should be able to tell if the winning player is the winner', function () {
                expect(board.isWinner('x')).to.be.true;
            });
            it('should be able to tell if the losing player is NOT the winner', function () {
                expect(board.isWinner('o')).to.be.false;
            });
            it('should be empty after reset', function () {
                board.resetBoard();
                expectEmptyBoard();
            });
        });
    });
    describe('when a full board is a draw', function () {
        beforeEach(function () {
            board.addMove('x', 0, 0);
            board.addMove('o', 1, 1);
            board.addMove('x', 2, 2);
            board.addMove('o', 1, 0);
            board.addMove('x', 1, 2);
            board.addMove('o', 0, 2);
            board.addMove('x', 2, 0);
            board.addMove('o', 2, 1);
            board.addMove('x', 0, 1);
        });
        it('should have no winner', function () {
            expect(board.isWinner('x')).to.be.false;
            expect(board.isWinner('o')).to.be.false;
        });
        it('should be empty after reset', function () {
            board.resetBoard();
            expectEmptyBoard();
        });
    });
});