
function Board() {
    this.spaces = [
        null,null,null,
        null,null,null,
        null,null,null
    ];
}

Board.prototype.resetBoard = function() {
    this.spaces = [
        null,null,null,
        null,null,null,
        null,null,null
    ];
};

Board.prototype.addMove = function (player, index) {
    if (this.isSpaceOccupied(index)) {
        throw new Error('This space is already occupied!');
    }
    else this.spaces[index] = player;
};

Board.prototype.isFull = function() {
    return this.spaces.indexOf(null) === -1;
};

Board.prototype.isSpaceOccupied = function (index) {
    return (this.spaces[index] !== null);
};

module.exports = Board;