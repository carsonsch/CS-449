import Player from "../enums/Player";
import TileContent from "../enums/TileContent";
import CompletedSos from "../CompletedSos";
import Coord from "../Coord";
import PlayerOptions from "../PlayerOptions";
import { GameboardCpuPlayer } from "../GameboardCpuPlayer";
import TileClickEvent from "../TileClickEvent";
import PlayerMove from "../PlayerMove";


export default class GameBoard {
    private boardSize: number;
    private boardData: (TileContent)[][] = [];
    private completedSoses: CompletedSos[] = [];
    private bluePlayerOptions: PlayerOptions = { marker: TileContent.S, cpuPlaying: false }
    private redPlayerOptions: PlayerOptions = { marker: TileContent.O, cpuPlaying: false }
    private playerWithNextMove: Player = Player.Blue;
    private gameStateChangeHandler: (() => void) | null = null;
    private cpuMoveIds = {Red: -1, Blue: -1};
    private gameRecording: string = "";

    constructor(boardSize: number) {
        if (boardSize < 3 || boardSize > 12) {
            throw new Error("Board size must be between 3 and 12");
        }

        this.boardSize = boardSize;
        this.initializeBoard(boardSize);
    }

    private initializeBoard(boardSize: number) {
        this.boardData = new Array(boardSize).fill(TileContent.BLANK);

        for (let i = 0; i < boardSize; i++) {
            this.boardData[i] = new Array(boardSize).fill(TileContent.BLANK);
        }
    }

    public setTile(x: number, y: number, val: TileContent): boolean {
        if (x < 0 || x >= this.boardSize) {
            return false;
        }

        if (y < 0 || y >= this.boardSize) {
            return false;
        }

        if (this.boardData[x][y] != TileContent.BLANK) {
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

        const opts = this.getPlayerOptions(player);
        opts.marker = marker;

        this.setPlayerOptions(player, opts);
    }

    public setPlayerOptions(player: Player, options: PlayerOptions): void {
        const optsCopy = structuredClone(options);

        if (player === Player.Blue) {
            this.bluePlayerOptions = optsCopy;
        } else if (player === Player.Red) {
            this.redPlayerOptions = optsCopy;
        } else {
            throw new Error("Invalid player.");
        }

        const curPlayer = this.getPlayerWithNextMove();
        if (curPlayer === player && options.cpuPlaying) {
            console.log("will set move for player");
            this.handleCpuMove();
        }

        if (!options.cpuPlaying) {
            clearTimeout(this.cpuMoveIds[player]);
        }
    }

    public getPlayerWithNextMove(): Player {
        return this.playerWithNextMove;
    }

    public alternatePlayerWithNextMove(): void {
        this.playerWithNextMove = this.playerWithNextMove === Player.Blue ? Player.Red : Player.Blue;
    }

    public getPlayerOptions(player: Player): PlayerOptions {
        if (player === Player.Blue) {
            return this.bluePlayerOptions;
        } else if (player === Player.Red) {
            return this.redPlayerOptions;
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

    public makeNextMove(xPos: number, yPos: number, markerOverride: TileContent | null = null): boolean {
        throw new Error("Not implemented");
    }

    public getCompletedSoses(): CompletedSos[] {
        return this.completedSoses;
    }

    public isBoardFull(): boolean {
        for (let row of this.boardData) {
            if (row.includes(TileContent.BLANK)) {
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

    public handleCpuMove() {
        const curPlayer = this.getPlayerWithNextMove();
        const opts = this.getPlayerOptions(curPlayer);

        if (!opts.cpuPlaying) {
            return;
        }
        console.log("setting up cpu move");

        let timeoutId = setTimeout(() => {
            const cpuMove = GameboardCpuPlayer.findNextMove(this);

            // If the player turns off the CPU player while the timeout is running
            // we need to check again so we don't accidentally play for them.
            const latestOps = this.getPlayerOptions(curPlayer);
            if (!latestOps.cpuPlaying) {
                return;
            }

            console.log("making move at", cpuMove.tileX, cpuMove.tileY, cpuMove.marker);
            this.makeNextMove(cpuMove.tileX, cpuMove.tileY, cpuMove.marker);
            console.log("done making move");
        }, 2000);

        clearTimeout(this.cpuMoveIds[curPlayer]);
        this.cpuMoveIds[curPlayer] = Number(timeoutId);
    }

    public setGamestateChangeHandler(handler: (() => void) | null) {
        this.gameStateChangeHandler = handler;
    }

    public callGameStateChangeHandler(): void {
        if (this.gameStateChangeHandler) {
            this.gameStateChangeHandler();
        }
    }

    public recordPlayerMove(x: number, y: number, marker: TileContent, player: Player): void {
        this.gameRecording += `${player},${marker},${x},${y}\n`;
    }

    public getGameRecording(): string {
        return this.gameRecording;
    }
}
