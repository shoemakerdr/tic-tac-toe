
// const expect = require('chai').expect;
// const TicTacToe = require('../index');

// const twoPlayerGame = TicTacToe.twoPlayerGame;

// describe('TicTacToe', function () {
//     describe('#twoPlayerGame', function() {
//         const ttt = twoPlayerGame();
//         ttt.start();
//         describe('after a completed game with a winner', function() {
//             ttt.turn(0);
//             ttt.turn(1);
//             ttt.turn(2);
//             ttt.turn(3);
//             ttt.turn(4);
//             ttt.turn(5);
//             ttt.turn(6);
//             it('should be over', function() {
//                 expect(ttt.isGameOver()).to.equal(true);
//             });
//             it('should have a winner', function() {
//                 expect(ttt.winner()).to.equal('x');
//             });
//         });
//         describe('after a completed game where no one wins', function() {
//             ttt.turn(0);
//             ttt.turn(4);
//             ttt.turn(8);
//             ttt.turn(3);
//             ttt.turn(5);
//             ttt.turn(7);
//             ttt.turn(1);
//             ttt.turn(2);
//             ttt.turn(8);
//             it('should be over', function() {
//                 expect(ttt.isGameOver()).to.equal(true);
//             });
//             it('should not have a winner', function() {
//                 expect(ttt.winner()).to.equal(false);
//             });
//         });
//         describe('during an unfinished game', function() {
//             ttt.turn(0);
//             ttt.turn(4);
//             ttt.turn(8);
//             ttt.turn(3);
//             ttt.turn(5);
//             ttt.turn(7);
//             ttt.turn(1);
//             it('should not be over', function() {
//                 expect(ttt.isGameOver()).to.equal(false);
//             });
//             it('should not have a winner', function() {
//                 expect(ttt.winner()).to.equal(false);
//             });
//         });
//     }); 
// });