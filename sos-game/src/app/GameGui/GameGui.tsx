"use client"

import GameBoardGui from '@/app/GameboardGui/GameBoardGui'
import styles from './GameGui.module.css'
import { useEffect, useState } from 'react'
import GameBoardSimple from '../gameboards/GameBoardSimple'
import GameOptions from '../GameOptions'
import GameModes from '../enums/GameModes'
import GameBoard from '../gameboards/GameBoard'
import GameBoardGeneral from '../gameboards/GameBoardGeneral'
import PlayerOptionsSidebar from '../PlayerOptionsSidebar/PlayerOptionsSidebar'
import Player from '../enums/Player'
import TileContent from '../enums/TileContent'
import PlayerOptions from '../PlayerOptions'

export default function GameGui(props: {gameOptions: GameOptions}) {
    let board: GameBoard;
    if (props.gameOptions.gameMode == GameModes.SimpleGame) {
        board = new GameBoardSimple(props.gameOptions.boardSize);
    } else if (props.gameOptions.gameMode == GameModes.GeneralGame) {
        board = new GameBoardGeneral(props.gameOptions.boardSize);
    } else {
        throw new Error("Invalid game mode.");
    }

    const [gameBoard, setGameBoard] = useState(board);
    const [currentPlayerWithMove, setCurrentPlayerWithMove] = useState(gameBoard.getPlayerWithNextMove());
    const [bluePlayerOptions, setBluePlayerOptions] = useState(gameBoard.getPlayerOptions(Player.Blue));
    const [redPlayerOptions, setRedPlayerOptions] = useState(gameBoard.getPlayerOptions(Player.Red));

    const [isGameOver, setIsGameOver] = useState(false);
    const [winningPlayer, setWinningPlayer] = useState<Player | null>(null);

    function currentPlayerChangeHandler(player: Player): void {
        setCurrentPlayerWithMove(player);
    }

    function playerOptionsChangeHandler(player: Player, opts: PlayerOptions): void {  
        gameBoard.setPlayerOptions(player, opts);

        setBluePlayerOptions(gameBoard.getPlayerOptions(Player.Blue));
        setRedPlayerOptions(gameBoard.getPlayerOptions(Player.Red));
    }

    function gameWinnerHandler(player: Player | null): void {
        setWinningPlayer(player);
        setIsGameOver(true);
    }

    function newGameHandler(): void {
        location.reload();
    }

    return (
        <div className={styles.centerContainer}>
            <div className={styles.winnerPopover + " " + (isGameOver ? "" : styles.invisible)}>
                <h1>
                    {winningPlayer
                        ? <span>{winningPlayer} player won!</span>
                        : <span>The game finished with a draw!</span>
                    }
                </h1>
                <button onClick={newGameHandler}>New game</button>
            </div>

            <div className={styles.gameGuiContainer + " " + (isGameOver ? styles.faded : "")}>
                <PlayerOptionsSidebar
                    player={Player.Blue}
                    isThisPlayersTurn={currentPlayerWithMove === Player.Blue}
                    onPlayerOptionsChange={playerOptionsChangeHandler}
                    playerOptions={bluePlayerOptions}
                />
                <div className={styles.gameBoardContainer}>
                    <GameBoardGui board={gameBoard} onCurrentPlayerChange={currentPlayerChangeHandler} onGameWinnerHandler={gameWinnerHandler}/>
                </div>

                <PlayerOptionsSidebar
                    player={Player.Red}
                    isThisPlayersTurn={currentPlayerWithMove === Player.Red}
                    onPlayerOptionsChange={playerOptionsChangeHandler}
                    playerOptions={redPlayerOptions}
                />
            </div>
            <div className={styles.bottomBar + " " + (isGameOver ? styles.faded : "")}>
                <div>{currentPlayerWithMove}'s turn</div>
                <button onClick={newGameHandler}>New game</button>
            </div>
        </div>
    )
}