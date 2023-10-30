import Player from "../enums/Player";
import TileContent from "../enums/TileContent";
import CompletedSos from "../CompletedSos";
import Coord from "../Coord";


export default class GameBoard {
    private boardSize: number;
    private boardData: (TileContent | null)[][] = [];
    private completedSoses: CompletedSos[] = [];
    private bluePlayerMarker: TileContent = TileContent.S;
    private redPlayerMarker: TileContent = TileContent.O;
    private playerWithNextMove: Player = Player.Blue;

    constructor(boardSize: number) {
        if (boardSize < 3 || boardSize > 12) {
            throw new Error("Board size must be between 3 and 12");
        }

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
            return false;
        }

        if (y < 0 || y >= this.boardSize) {
            return false;
        }

        if (this.boardData[x][y] != null) {
            return false;
        }

        this.boardData[x][y] = val;
        return true;
    }

    public getTile(x: number, y: number): TileContent {
        if (x < 0 || x >= this.boardSize) {
            throw new Error("x value is out of range of board");
        }

        if (y < 0 || y >= this.boardSize) {
            throw new Error("y value is out of range of board");
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

        if (player == Player.Blue) {
            this.bluePlayerMarker = marker;
        } else if (player == Player.Red) {
            this.redPlayerMarker = marker;
        } else {
            throw new Error("Invalid player.");
        }
    }

    public getPlayerWithNextMove(): Player {
        return this.playerWithNextMove;
    }

    public alternatePlayerWithNextMove(): void {
        this.playerWithNextMove = this.playerWithNextMove === Player.Blue ? Player.Red : Player.Blue;
    }

    public getPlayersMarker(player: Player): TileContent {
        if (player === Player.Blue) {
            return this.bluePlayerMarker;
        } else if (player === Player.Red) {
            return this.redPlayerMarker;
        } else {
            throw new Error("Invalid player");
        }
    }

    public isGameComplete(): boolean {
        throw new Error("Not implemented");
    }

    public getGameWinner(): Player | null {
        throw new Error("Not implemented");
    }

    public makeNextMove(xPos: number, yPos: number): boolean {
        throw new Error("Not implemented");
    }

    public getCompletedSoses(): CompletedSos[] {
        return this.completedSoses;
    }

    public isBoardFull(): boolean {
        for (let row of this.boardData) {
            if (row.includes(null)) {
                return false;
            }
        }

        return true;
    }

    private getSosAt(xPos: number, yPos: number, player: Player): CompletedSos | null {
        const initialLetter = this.boardData[xPos][yPos];

        if (initialLetter === TileContent.BLANK) {
            return null;
        }

        const furtherMultiplier = initialLetter === TileContent.S ? 2 : -1;
        const expectedCloser = initialLetter === TileContent.S ? TileContent.O : TileContent.S;
        const expectedFurther = initialLetter === TileContent.S ? TileContent.S : TileContent.S;

        for (let xOffset: number = -1; xOffset <= 1; xOffset++) {
            for (let yOffset: number = -1; yOffset <= 1; yOffset++) {
                const closer = this.boardData[xPos + xOffset]?.[yPos + yOffset];
                const further = this.boardData[xPos + (xOffset * furtherMultiplier)]?.[yPos + (yOffset * furtherMultiplier)];

                if (closer === expectedCloser && further === expectedFurther) {
                    let firstPoint: Coord;
                    let lastPoint: Coord;

                    if (initialLetter === TileContent.S) {
                        firstPoint = {x: xPos + (xOffset * furtherMultiplier), y: yPos + (yOffset * furtherMultiplier)};
                        lastPoint = {x: xPos, y: yPos};
                    } else {
                        firstPoint = {x: xPos + xOffset, y: yPos + yOffset};
                        lastPoint = {x: xPos + (xOffset * furtherMultiplier), y: yPos + (yOffset * furtherMultiplier)};
                    }

                    const completedSos: CompletedSos = {firstPoint, lastPoint, player};
                    return completedSos;
                }
            }
        }

        return null;
    }

    public detectSosForPlayerMove(xPos: number, yPos: number, player: Player): boolean {
        const sos = this.getSosAt(xPos, yPos, player);
        if (sos === null) {
            return false; // there was no sos made on this move
        }

        this.completedSoses.push(sos);
        return true;
    }
}
