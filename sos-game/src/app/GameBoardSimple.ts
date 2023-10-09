import GameBoard from "./GameBoard";
import Player from "./Player";
import TileContent from "./TileContent";

export default class GameBoardSimple extends GameBoard {
    private isGameCompleted: boolean = false;

    constructor(boardSize: number) {
        super(boardSize);
    }

    public makeNextMove(xPos: number, yPos: number): boolean {
        const curPlayer: Player = this.getPlayerWithNextMove();
        const marker: TileContent = this.getPlayersMarker(curPlayer);
        
        const successfulMove: boolean = this.setTile(xPos, yPos, marker);
        if (!successfulMove) {
            return false;
        }

        this.alternatePlayerWithNextMove();
        return true;
    }
}