
const expect = require('chai').expect;
const Board = require('../board');

describe('Board', function() {
    
    const board = new Board();
    
    beforeEach(function () {
        board.resetBoard();
    });
    
    describe('when empty', function () {
        it('should return all spaces as null', function () {
            expect(board.spaces).to.have.members([
                null,null,null,
                null,null,null,
                null,null,null
            ]);
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
            board.addMove('x', 0);
            board.addMove('o', 1);
            board.addMove('x', 2);
            board.addMove('o', 3);
            board.addMove('x', 4);
            board.addMove('o', 5);
            board.addMove('x', 6);
            board.addMove('o', 7);
            board.addMove('x', 8);
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
            expect(board.spaces).to.have.members([
                null,null,null,
                null,null,null,
                null,null,null
            ]);
        });
    });
    describe('if a particular space is occupied', function () {
        beforeEach(function () {
            board.addMove('x', 0); 
        });
        it('should know that it is occupied', function() {
            expect(board.isSpaceOccupied(0)).to.be.true;
        });
        it('should throw error if second move added that space', function () {
            expect(function () {board.addMove('x', 0);}).to.throw();
        });
    });
    describe('if a particular space is unoccupied', function () {
        it('should know that it is not occupied', function() {
            expect(board.isSpaceOccupied(0)).to.be.false;
        });
    });
    describe('when there is a winning board', function() {
        describe('with a row win', function () {
            beforeEach(function () {
                board.addMove('x', 3);
                board.addMove('o', 1);
                board.addMove('x', 4);
                board.addMove('o', 8);
                board.addMove('x', 5);
            });
            it('should be able to tell if the winning player is the winner', function () {
                expect(board.isWinner('x')).to.be.true;
            });
            it('should be able to tell if the losing player is NOT the winner', function () {
                expect(board.isWinner('o')).to.be.false;
            });
            it('should be empty after reset', function () {
                board.resetBoard();
                expect(board.spaces).to.have.members([
                    null,null,null,
                    null,null,null,
                    null,null,null
                ]);
            });
        });
        describe('with a column win', function () {
            beforeEach(function () {
                board.addMove('x', 1);
                board.addMove('o', 0);
                board.addMove('x', 4);
                board.addMove('o', 3);
                board.addMove('x', 7);
            });
            it('should be able to tell if the winning player is the winner', function () {
                expect(board.isWinner('x')).to.be.true;
            });
            it('should be able to tell if the losing player is NOT the winner', function () {
                expect(board.isWinner('o')).to.be.false;
            });
            it('should be empty after reset', function () {
                board.resetBoard();
                expect(board.spaces).to.have.members([
                    null,null,null,
                    null,null,null,
                    null,null,null
                ]);
            });
        });
        describe('with a diagonal win', function () {
            beforeEach(function () {
                board.addMove('x', 0);
                board.addMove('o', 1);
                board.addMove('x', 4);
                board.addMove('o', 2);
                board.addMove('x', 8);
            });
            it('should be able to tell if the winning player is the winner', function () {
                expect(board.isWinner('x')).to.be.true;
            });
            it('should be able to tell if the losing player is NOT the winner', function () {
                expect(board.isWinner('o')).to.be.false;
            });
            it('should be empty after reset', function () {
                board.resetBoard();
                expect(board.spaces).to.have.members([
                    null,null,null,
                    null,null,null,
                    null,null,null
                ]);
            });
        });
    });
    describe('when a full board is a draw', function () {
        beforeEach(function () {
            board.addMove('x', 0);
            board.addMove('o', 4);
            board.addMove('x', 8);
            board.addMove('o', 3);
            board.addMove('x', 5);
            board.addMove('o', 2);
            board.addMove('x', 6);
            board.addMove('o', 7);
            board.addMove('x', 1);
        });
        it('should have no winner', function () {
            expect(board.isWinner('x')).to.be.false;
            expect(board.isWinner('o')).to.be.false;
        });
        it('should be empty after reset', function () {
            board.resetBoard();
            expect(board.spaces).to.have.members([
                null,null,null,
                null,null,null,
                null,null,null
            ]);
        });
    });
});