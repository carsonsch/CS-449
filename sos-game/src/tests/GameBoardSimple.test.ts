import TileContent from '../app/enums/TileContent';
import Player from '../app/enums/Player';
import GameBoardSimple from '../app/gameboards/GameBoardSimple';

test("When creating a new board, we should be able to place S in an empty cell", () => {
    let board = new GameBoardSimple(3);

    expect(board.makeNextMove(1, 1)).toBe(true);
    expect(board.getTile(1, 1)).toBe(TileContent.S);
});

test("When creating a new board, we should be able to place O in an empty cell", () => {
    let board = new GameBoardSimple(3);
    board.setPlayerMarker(Player.Blue, TileContent.O);

    expect(board.makeNextMove(1, 1)).toBe(true);
    expect(board.getTile(1, 1)).toBe(TileContent.O);
});

test("Don't allow placing a marker in a full cell", () => {
    let board = new GameBoardSimple(3);

    board.makeNextMove(1, 1);
    expect(board.makeNextMove(1, 1)).toBe(false);
});

test("Player turns should alternate", () => {
    let board = new GameBoardSimple(3);

    expect(board.getPlayerWithNextMove()).toBe(Player.Blue);
    board.makeNextMove(1, 1);
    expect(board.getPlayerWithNextMove()).toBe(Player.Red);
    board.makeNextMove(2, 2);
    expect(board.getPlayerWithNextMove()).toBe(Player.Blue);
});

test("You cannot make an move in an invalid row", () => {
    let board = new GameBoardSimple(3);

    expect(board.makeNextMove(5, 1)).toBe(false);
});

test("You cannot make an move in an invalid column", () => {
    let board = new GameBoardSimple(3);

    expect(board.makeNextMove(1, 5)).toBe(false);
});

test("When a player changes their letter, it should be reflected when they make a move", () => {
    let board = new GameBoardSimple(3);
    board.setPlayerMarker(Player.Blue, TileContent.O);
    board.makeNextMove(2, 2);
    expect(board.getTile(2, 2)).toBe(TileContent.O);
});

test("If blue is first to make an SOS, they should win", () => {
    let board = new GameBoardSimple(3);
    board.makeNextMove(0, 0);
    board.makeNextMove(1, 1);
    board.makeNextMove(2, 2);

    expect(board.getGameWinner()).toBe(Player.Blue);
});

test("If red is first to make an SOS, they should win", () => {
    let board = new GameBoardSimple(3);
    board.makeNextMove(0, 1);
    board.makeNextMove(1, 2);
    board.makeNextMove(2, 1);
    board.makeNextMove(1, 1);

    expect(board.getGameWinner()).toBe(Player.Red);
});

test("If the board fills without either player making an SOS, they should draw", () => {
    let board = new GameBoardSimple(3);
    board.makeNextMove(0, 0);
    board.makeNextMove(2, 2);
    board.makeNextMove(1, 1);
    board.makeNextMove(2, 1);
    board.makeNextMove(1, 0);
    board.makeNextMove(2, 0);
    board.makeNextMove(0, 2);
    board.makeNextMove(1, 2);
    board.makeNextMove(0, 1);

    expect(board.getGameWinner()).toBe(null);
});