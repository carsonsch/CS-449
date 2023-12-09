import GameBoard from "./GameBoard";
import Player from "../enums/Player";
import TileContent from "../enums/TileContent";

export default class GameBoardSimple extends GameBoard {
    private isGameCompleted: boolean = false;
    private gameWinner: Player | null = null;

    constructor(boardSize: number) {
        super(boardSize);
    }

    public makeNextMove(xPos: number, yPos: number, markerOverride: TileContent | null = null): boolean {
        if (this.isGameCompleted) {
            return false;
        }

        const curPlayer: Player = this.getPlayerWithNextMove();
        const marker: TileContent = markerOverride ?? this.getPlayerOptions(curPlayer).marker;
        
        const successfulMove: boolean = this.setTile(xPos, yPos, marker);
        if (!successfulMove) {
            return false;
        }

        this.recordPlayerMove(xPos, yPos, marker, curPlayer);
        const wasSosCreated = this.detectSosForPlayerMove(xPos, yPos, curPlayer);
        if (wasSosCreated) {
            this.isGameCompleted = true;
            this.gameWinner = curPlayer;
            this.callGameStateChangeHandler();
            return true;
        }

        if (this.isBoardFull()) {
            this.isGameCompleted = true;
            this.gameWinner = null;
        }

        this.alternatePlayerWithNextMove();
        this.handleCpuMove();
        this.callGameStateChangeHandler();
        return true;
    }

    public isGameComplete(): boolean {
        return this.isGameCompleted;    
    }

    public getGameWinner(): Player | null {
        return this.gameWinner;   
    }
}