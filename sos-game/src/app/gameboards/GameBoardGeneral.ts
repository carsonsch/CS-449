import GameBoard from "./GameBoard";
import Player from "../enums/Player";
import TileContent from "../enums/TileContent";
import GameModes from "../enums/GameModes";

export default class GameBoardGeneral extends GameBoard {
    private isGameCompleted: boolean = false;
    private gameWinner: Player | null = null;

    constructor(boardSize: number) {
        super(boardSize);
        this.addGameRecordingHeader(GameModes.GeneralGame);
    }

    // Handles when a player clicks on the board. This detects whether their move was valid,
    // and if they created any SOSes.
    public makeNextMove(xPos: number, yPos: number, markerOverride: TileContent | null = null): boolean {
        const curPlayer: Player = this.getPlayerWithNextMove();
        const marker: TileContent = markerOverride ?? this.getPlayerOptions(curPlayer).marker;

        const successfulMove: boolean = this.setTile(xPos, yPos, marker);
        if (!successfulMove) {
            return false;
        }

        this.recordPlayerMove(xPos, yPos, marker, curPlayer);
        const wasSosCreated = this.detectSosForPlayerMove(xPos, yPos, curPlayer);

        if (this.isBoardFull()) {
            this.isGameCompleted = true;
            this.gameWinner = this.getPlayerWithMostSoses();
            this.callGameStateChangeHandler();
            return true;
        }

        if (!wasSosCreated) {
            this.alternatePlayerWithNextMove();
        }

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

    // Returns which player has created the largest
    // number of SOSes on the board. Returns null if the players have made the same
    // number of SOSes.
    private getPlayerWithMostSoses(): Player | null {
        const soses = this.getCompletedSoses();
        let bluePlayerCount = 0;
        let redPlayerCount = 0;

        for (const sos of soses) {
            if (sos.player === Player.Blue) {
                bluePlayerCount++;
            } else if (sos.player === Player.Red) {
                redPlayerCount++;
            }
        }

        if (bluePlayerCount > redPlayerCount) {
            return Player.Blue;
        } else if (redPlayerCount > bluePlayerCount) {
            return Player.Red;
        } else {
            return null;
        }
    }
}