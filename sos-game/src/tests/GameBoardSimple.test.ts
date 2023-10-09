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
    board.setPlayerMarker(Player.Player1, TileContent.O);

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

    expect(board.getPlayerWithNextMove()).toBe(Player.Player1);
    board.makeNextMove(1, 1);
    expect(board.getPlayerWithNextMove()).toBe(Player.Player2);
    board.makeNextMove(2, 2);
    expect(board.getPlayerWithNextMove()).toBe(Player.Player1);
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
    board.setPlayerMarker(Player.Player1, TileContent.O);
    board.makeNextMove(2, 2);
    expect(board.getTile(2, 2)).toBe(TileContent.O);
});