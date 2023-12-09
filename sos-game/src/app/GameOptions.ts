import PlayerMove from "./PlayerMove";
import GameMode from "./enums/GameModes";

export default interface GameOptions {
    gameMode: GameMode,
    boardSize: number,
    isReplayMode: boolean,
    replayMoves: PlayerMove[] | null
}