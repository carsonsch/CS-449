import GameBoard from '../app/gameboards/GameBoard';

test("Can create GameBoard of a given size", () => {
    expect(() => {
        new GameBoard(5);
    }).not.toThrow();
});

test("Can set tiles on the board", () => {
    let board = new GameBoard(8);
    board.setTile(3, 1, "S");

    expect(board.getTile(3, 1)).toBe("S");
});

test("Trying to access a tile out of bounds should fail", () => {
    let board = new GameBoard(3);

    expect(() => board.getTile(5, 5)).toThrow();
});

test("Trying to set a tile out of bounds should fail", () => {
    let board = new GameBoard(3);

    expect(() => board.setTile(5, 5, "S")).toThrow();
});
