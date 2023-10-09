import TileContent from '../app/enums/TileContent';
import GameBoard from '../app/gameboards/GameBoard';
import Player from '../app/enums/Player';


test("Can create GameBoard of a given size", () => {
    expect(() => {
        new GameBoard(5);
    }).not.toThrow();
});

test("Can set tiles on the board", () => {
    let board = new GameBoard(8);
    board.setTile(3, 1, TileContent.S);

    expect(board.getTile(3, 1)).toBe(TileContent.S);
});

test("Trying to access a tile out of bounds should fail", () => {
    let board = new GameBoard(3);

    expect(() => board.getTile(5, 5)).toThrow();
});

test("Trying to set a tile out of bounds should fail", () => {
    let board = new GameBoard(3);

    expect(board.setTile(5, 5, TileContent.S)).toBe(false);
});

test("Trying to create a board size too small should fail", () => {
    expect(() => new GameBoard(2)).toThrow();
});

test("Trying to create a board size too large should fail", () => {
    expect(() => new GameBoard(13)).toThrow();
});

test("When creating a new board, player 1 should have the first move", () => {
    let board = new GameBoard(3);

    expect(board.getPlayerWithNextMove()).toBe(Player.Player1)
});

