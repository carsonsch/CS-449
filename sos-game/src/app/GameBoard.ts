export default class GameBoard {
    private boardSize: number;
    private boardData: string[][] = [];

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

    public setTile(x: number, y: number, val: string): void {
        if (x >= this.boardSize) {
            throw new Error("x value too big.");
        }

        if (y >= this.boardSize) {
            throw new Error("y value too big.");
        }

        this.boardData[x][y] = val;
    }

    public getTile(x: number, y: number): string {
        if (x >= this.boardSize) {
            throw new Error("x value too big.");
        }

        if (y >= this.boardSize) {
            throw new Error("y value too big.");
        }

        return this.boardData[x][y];
    }

    public getBoardSize(): number {
        return this.boardSize;
    }
}