import TileContent from '../app/enums/TileContent';
import GameBoard from '../app/gameboards/GameBoard';
import Player from '../app/enums/Player';
import GameBoardSimple from '../app/gameboards/GameBoardSimple';
import { GameboardCpuPlayer } from '../app/GameboardCpuPlayer';
import GameBoardGeneral from '../app/gameboards/GameBoardGeneral';


test("CPU will complete an SOS if possible (place S to complete)", () => {
    const board = new GameBoardSimple(3);
    board.makeNextMove(0, 0, TileContent.S);
    board.makeNextMove(0, 1, TileContent.O);

    const cpuMove = GameboardCpuPlayer.findNextMove(board);

    expect(cpuMove.tileX).toBe(0);
    expect(cpuMove.tileY).toBe(2);
    expect(cpuMove.marker).toBe(TileContent.S);
    expect(board.getTile(cpuMove.tileX, cpuMove.tileY)).toBe(TileContent.BLANK);
});

test("CPU will complete an SOS if possible (place O to complete)", () => {
    const board = new GameBoardGeneral(5);
    board.makeNextMove(1, 1, TileContent.S);
    board.makeNextMove(3, 3, TileContent.S);

    const cpuMove = GameboardCpuPlayer.findNextMove(board);

    expect(cpuMove.tileX).toBe(2);
    expect(cpuMove.tileY).toBe(2);
    expect(cpuMove.marker).toBe(TileContent.O);
    expect(board.getTile(cpuMove.tileX, cpuMove.tileY)).toBe(TileContent.BLANK);
});

test("CPU will extend an existing S if there isn't any SOS to complete", () => {
    const board = new GameBoardGeneral(3);
    board.makeNextMove(0, 2, TileContent.S);
    board.makeNextMove(1, 2, TileContent.O);
    board.makeNextMove(2, 2, TileContent.S);

    const cpuMove = GameboardCpuPlayer.findNextMove(board);

    expect(cpuMove.tileX).toBe(0);
    expect(cpuMove.tileY).toBe(1);
    expect(cpuMove.marker).toBe(TileContent.O);
    expect(board.getTile(cpuMove.tileX, cpuMove.tileY)).toBe(TileContent.BLANK);
});

test("CPU will extend an existing O if there isn't any SOS to complete", () => {
    const board = new GameBoardSimple(3);
    board.makeNextMove(1, 2, TileContent.O);

    const cpuMove = GameboardCpuPlayer.findNextMove(board);

    expect(cpuMove.tileX).toBe(0);
    expect(cpuMove.tileY).toBe(2);
    expect(cpuMove.marker).toBe(TileContent.S);
    expect(board.getTile(cpuMove.tileX, cpuMove.tileY)).toBe(TileContent.BLANK);
});

test("CPU will make a random move if there is no existing markers to extend", () => {
    const board = new GameBoardSimple(3);

    const cpuMove = GameboardCpuPlayer.findNextMove(board);
    expect(cpuMove).not.toBe(null);
    expect(board.getTile(cpuMove.tileX, cpuMove.tileY)).toBe(TileContent.BLANK);
});