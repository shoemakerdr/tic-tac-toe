'use strict';

const expect = require('chai').expect;
const Board = require('../board');
const board = new Board();

function expectEmptyBoard() {
    for (let row = 0; row < 3; row++) {
        expect(board.spaces[row]).to.have.ordered.members([null,null,null]);
    }
}

function expectedAvailableSpaces(expectedArray) {
    const len = expectedArray.length;
    for (let pair = 0; pair < len; pair++) {
        expect(board.availableSpaces()[pair]).to.have.ordered.members(expectedArray[pair]);
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
        it('should show that all spaces are available', function () {
            expectedAvailableSpaces([
                [0,0],[0,1],[0,2],
                [1,0],[1,1],[1,2],
                [2,0],[2,1],[2,2]
            ]);
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
        it('should be empty after reset', function () {
            board.resetBoard();
            expectEmptyBoard();
        });
        it('should show that no spaces are available', function () {
            expectedAvailableSpaces([]);
        })
    });
    describe('if a particular space is occupied', function () {
        beforeEach(function () {
            board.addMove('x', 0, 0);
        });
        it('should know that it is occupied', function() {
            expect(board.isSpaceOccupied(0, 0)).to.be.true;
        });
    });
    describe('if a particular space is unoccupied', function () {
        it('should know that it is not occupied', function() {
            expect(board.isSpaceOccupied(0, 0)).to.be.false;
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
        it('should be empty after reset', function () {
            board.resetBoard();
            expectEmptyBoard();
        });
    });
});
