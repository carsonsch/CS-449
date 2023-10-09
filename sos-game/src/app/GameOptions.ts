import GameMode from "./enums/GameModes";

export default interface GameOptions {
    gameMode: GameMode,
    boardSize: number
}