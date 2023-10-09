import Player from "../enums/Player";
import TileContent from "../enums/TileContent";

export default class GameBoard {
    private boardSize: number;
    private boardData: string[][] = [];
    private player1Marker: TileContent = TileContent.S;
    private player2Marker: TileContent = TileContent.O;
    private playerWithNextMove: Player = Player.Player1;

    constructor(boardSize: number) {
        this.boardSize = boardSize;
        this.initializeBoard(boardSize);
    }

    private initializeBoard(boardSize: number) {
        this.boardData = new Array(boardSize).fill(null);

        for (let i = 0; i < boardSize; i++) {
            this.boardData[i] = new Array(boardSize).fill(null);
        }
    }

    public setTile(x: number, y: number, val: TileContent): boolean {
        if (x < 0 || x >= this.boardSize) {
            console.log("x value is not in range of board.");
            return false;
        }

        if (y < 0 || y >= this.boardSize) {
            console.log("y value is not in range of board.");
            return false;
        }

        if (this.boardData[x][y] != null) {
            console.log("Cannot set cell because it already contains a value.");
            return false;
        }

        this.boardData[x][y] = val;
        return true;
    }

    public getTile(x: number, y: number): TileContent {
        if (x < 0 || x >= this.boardSize) {
            throw new Error("x value is not in range of board.");
        }

        if (y < 0 || y >= this.boardSize) {
            throw new Error("y value is not in range of board.");
        }

        return this.boardData[x][y] as TileContent;
    }

    public getBoardSize(): number {
        return this.boardSize;
    }
    
    public setPlayerMarker(player: Player, marker: TileContent): void {
        if (marker === TileContent.BLANK) {
            throw new Error("Cannot set a player's marker to 'BLANK'");
        }

        if (player == Player.Player1) {
            this.player1Marker = marker;
        } else if (player == Player.Player2) {
            this.player2Marker = marker;
        } else {
            throw new Error("Invalid player.");
        }
    }

    public getPlayerWithNextMove(): Player {
        return this.playerWithNextMove;
    }

    public alternatePlayerWithNextMove(): void {
        this.playerWithNextMove = this.playerWithNextMove === Player.Player1 ? Player.Player2 : Player.Player1;
    }

    public getPlayersMarker(player: Player): TileContent {
        if (player === Player.Player1) {
            return this.player1Marker;
        } else if (player === Player.Player2) {
            return this.player2Marker;
        } else {
            throw new Error("Invalid player");
        }
    }

    public isGameComplete(): boolean {
        throw new Error("Not implemented.");
    }

    public makeNextMove(xPos: number, yPos: number): boolean {
        throw new Error("Not implemented");
    }
}