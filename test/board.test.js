
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
        describe('isFull method', function () {
            it('should return false', function () {
                expect(board.isFull()).to.be.false;
            });
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
        describe('isFull method', function () {
            it('should return true', function () {
                expect(board.isFull()).to.be.true;
            });
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
    describe('if a particular space is occupied', function () {
        it('should know that it is not occupied', function() {
            expect(board.isSpaceOccupied(0)).to.be.false;
        });
    });
});