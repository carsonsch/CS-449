import Coord from "./Coord";
import TileClickEvent from "./TileClickEvent";
import TileContent from "./enums/TileContent";
import GameBoard from "./gameboards/GameBoard";

export abstract class GameboardCpuPlayer {
    public static findNextMove(board: GameBoard): TileClickEvent {
        const almostCompleted = this.findAlmostCompletedSos(board);
        if (almostCompleted !== null) {
            return almostCompleted;
        }

        return this.makeRandomMove(board);
    }

    private static makeRandomMove(board: GameBoard): TileClickEvent {
        const emptyCells: Coord[] = [];
        for (let x = 0; x < board.getBoardSize(); x++) {
            for (let y = 0; y < board.getBoardSize(); y++) {
                if (board.getTile(x, y) === TileContent.BLANK) {
                    emptyCells.push({x, y});
                }
            }
        }

        let movePos = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        let moveMarker = Math.random() < 0.5 ? TileContent.S : TileContent.O;

        return { tileX: movePos.x, tileY: movePos.y, marker: moveMarker };
    }

    private static findAlmostCompletedSos(board: GameBoard): TileClickEvent | null {
        let allowPartial = false;
        for (let i = 0; i < 2; i++) {
            for (let x = 0; x < board.getBoardSize(); x++) {
                for (let y = 0; y < board.getBoardSize(); y++) {
                    if (this.detectAdjacentSPair(board, x, y, allowPartial)) {
                        return { tileX: x, tileY: y, marker: TileContent.O }
                    }
    
                    if (this.detectAdjacentSOPair(board, x, y, allowPartial)) {
                        return { tileX: x, tileY: y, marker: TileContent.S }
                    }
                }
            }
            allowPartial = true;
        }

        return null;
    }

    private static detectAdjacentSPair(board: GameBoard, x: number, y: number, allowPartial: boolean = false): boolean {
        if (board.getTile(x, y) !== TileContent.BLANK) {
            return false;
        }

        const boardSize = board.getBoardSize();

        for (let xOffset = -1; xOffset <= 1; xOffset++) {
            for (let yOffset = -1; yOffset <= 1; yOffset++) {
                const tile1: Coord = {x: x + xOffset, y: y + yOffset};
                const tile2: Coord = {x: x - xOffset, y: y - yOffset};

                if (tile1.x < 0 || tile1.x >= boardSize || tile1.y < 0 || tile1.y >= boardSize ||
                    tile2.x < 0 || tile2.x >= boardSize || tile2.y < 0 || tile2.y >= boardSize) {
                        continue;
                }
                if (allowPartial && (board.getTile(tile1.x, tile1.y) === TileContent.S || board.getTile(tile2.x, tile2.y) === TileContent.S)) {
                    return true;
                }

                if (board.getTile(tile1.x, tile1.y) === TileContent.S && board.getTile(tile2.x, tile2.y) === TileContent.S) {
                    return true
                }
            }
        }

        return false;
    }

    private static detectAdjacentSOPair(board: GameBoard, x: number, y: number, allowPartial: boolean = false): boolean {
        if (board.getTile(x, y) !== TileContent.BLANK) {
            return false;
        }

        const boardSize = board.getBoardSize();

        for (let xOffset = -1; xOffset <= 1; xOffset++) {
            for (let yOffset = -1; yOffset <= 1; yOffset++) {
                const closer: Coord = {x: x + xOffset, y: y + yOffset};
                const further: Coord = {x: x + xOffset * 2, y: y + yOffset * 2};

                if (closer.x < 0 || closer.x >= boardSize || closer.y < 0 || closer.y >= boardSize ||
                    further.x < 0 || further.x >= boardSize || further.y < 0 || further.y >= boardSize) {
                        continue;
                }

                if (allowPartial && board.getTile(closer.x, closer.y) === TileContent.O) {
                    return true;
                }

                if (board.getTile(closer.x, closer.y) === TileContent.O && board.getTile(further.x, further.y) === TileContent.S) {
                    return true
                }
            }
        }

        return false;
    }
}