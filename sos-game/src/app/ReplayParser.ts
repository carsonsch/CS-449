import GameOptions from "./GameOptions";
import PlayerMove from "./PlayerMove";
import GameModes from "./enums/GameModes";
import Player from "./enums/Player";
import TileContent from "./enums/TileContent";

export abstract class ReplayParser {
    public static parseReplayFile(replayText: string): GameOptions {
        // boardSize,gameMode
        // player,marker,x,y

        let gameMode: GameModes | null = null;
        let boardSize: number | null = null;
        let replayMoves: PlayerMove[] = [];

        const lines = replayText.split("\n").map(line => line.split(","));
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (i === 0) {
                boardSize = parseInt(line[0]);
                gameMode = line[1] as GameModes;
                continue;
            }

            if (line.length <= 1) {
                continue;
            }

            const curMove: PlayerMove = {
                player: line[0] as Player,
                marker: line[1] as TileContent,
                x: parseInt(line[2]),
                y: parseInt(line[3])
            };
            replayMoves.push(curMove);
        }

        if (gameMode === null || boardSize === null || replayMoves.length === 0) {
            throw new Error("Unable to parse replay file.");
        }

        return {
            gameMode,
            boardSize,
            replayMoves,
            isReplayMode: true
        }
    }
}