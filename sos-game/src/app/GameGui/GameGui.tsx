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
import { getDefaultCompilerOptions } from 'typescript'

export default function GameGui(props: {gameOptions: GameOptions}) {
    const [gameBoard, setGameBoard] = useState(new GameBoard(3));
    const [isGameBoardSetup, setIsGameBoardSetup] = useState(false);
    const [isInReplayMode, setIsInReplayMode] = useState(false);

    if (!isGameBoardSetup) {
        let board: GameBoard;
        if (props.gameOptions.gameMode == GameModes.SimpleGame) {
            board = new GameBoardSimple(props.gameOptions.boardSize);
        } else if (props.gameOptions.gameMode == GameModes.GeneralGame) {
            board = new GameBoardGeneral(props.gameOptions.boardSize);
        } else {
            throw new Error("Invalid game mode.");
        }
    
        if (props.gameOptions.isReplayMode && props.gameOptions.replayMoves !== null) {
            board.setReplayMoves(props.gameOptions.replayMoves);
            setIsInReplayMode(true);
        }

        setGameBoard(board);
        setIsGameBoardSetup(true);
    }

    const [currentPlayerWithMove, setCurrentPlayerWithMove] = useState(gameBoard.getPlayerWithNextMove());
    const [bluePlayerOptions, setBluePlayerOptions] = useState(gameBoard.getPlayerOptions(Player.Blue));
    const [redPlayerOptions, setRedPlayerOptions] = useState(gameBoard.getPlayerOptions(Player.Red));
    const [recordingUrl, setRecordingUrl] = useState("");

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
        const dlUrl = createDownloadUrlForString(gameBoard.getGameRecording());
        
        setWinningPlayer(player);
        setRecordingUrl(dlUrl);
        setIsGameOver(true);
    }

    function newGameHandler(): void {
        location.reload();
    }

    function createDownloadUrlForString(text: string): string {
        const blob = new Blob([text], {type: "text/plain"});
        return URL.createObjectURL(blob);
    }

    return (
        <div className={styles.centerContainer}>
            <div className={`${styles.winnerPopover} ${isGameOver ? "" : styles.invisible}`}>
                <h1>
                    {winningPlayer
                        ? <span>{winningPlayer} player won!</span>
                        : <span>The game finished with a draw!</span>
                    }
                </h1>
                <div className={styles.buttonsContainer}>
                    <button onClick={newGameHandler}>New game</button>
                    <a href={recordingUrl} download="GameSave.txt">
                        <button>Save game recording</button>
                    </a>
                </div>            
            </div>

            <div className={`${isGameOver ? styles.faded : ""}`}>
                {isInReplayMode
                    ? <h3>Replay mode</h3>
                    : <></>
                }
            </div>

            <div className={`${styles.gameGuiContainer} ${isGameOver ? styles.faded : ""}`}>
                {isInReplayMode
                    ? <></>
                    : <PlayerOptionsSidebar
                        player={Player.Blue}
                        isThisPlayersTurn={currentPlayerWithMove === Player.Blue}
                        onPlayerOptionsChange={playerOptionsChangeHandler}
                        playerOptions={bluePlayerOptions}
                    />
                }
                <div className={styles.gameBoardContainer}>
                    <GameBoardGui board={gameBoard} onCurrentPlayerChange={currentPlayerChangeHandler} onGameWinnerHandler={gameWinnerHandler}/>
                </div>

                {isInReplayMode
                    ? <></>
                    : <PlayerOptionsSidebar
                        player={Player.Red}
                        isThisPlayersTurn={currentPlayerWithMove === Player.Red}
                        onPlayerOptionsChange={playerOptionsChangeHandler}
                        playerOptions={redPlayerOptions}
                    />
                }
            </div>
            <div className={styles.bottomBar + " " + (isGameOver ? styles.faded : "")}>
                <div>{currentPlayerWithMove}'s turn</div>
                <button onClick={newGameHandler}>New game</button>
            </div>
        </div>
    )
}