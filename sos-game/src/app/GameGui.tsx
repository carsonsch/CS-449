"use client"

import GameBoardGui from '@/app/GameBoardGui'
import styles from './GameGui.module.css'
import { useEffect, useState } from 'react'
import GameBoardSimple from './GameBoardSimple'
import GameOptions from './GameOptions'
import GameModes from './GameModes'
import GameBoard from './GameBoard'
import GameBoardGeneral from './GameBoardGeneral'
import PlayerOptionsSidebar from './PlayerOptionsSidebar'
import Player from './Player'
import TileContent from './TileContent'

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
    const [currentPlayerWithMove, setCurrentPlayerWithMove] = useState(board.getPlayerWithNextMove());
    const [player1Marker, setPlayer1Marker] = useState(board.getPlayersMarker(Player.Player1));
    const [player2Marker, setPlayer2Marker] = useState(board.getPlayersMarker(Player.Player2));


    function currentPlayerChangeHandler(player: Player): void {
        setCurrentPlayerWithMove(player);
    }

    function markerChangeHandler(player: Player, marker: TileContent): void {
        gameBoard.setPlayerMarker(player, marker);
        
        if (player === Player.Player1) {
            setPlayer1Marker(marker);
        } else if (player === Player.Player2) {
            setPlayer2Marker(marker);
        } else {
            throw new Error("Invalid player");
        }
    }

    return (
        <div className={styles.centerContainer}>
            <div className={styles.gameGuiContainer}>
                <PlayerOptionsSidebar
                    player={Player.Player1}
                    isThisPlayersTurn={currentPlayerWithMove === Player.Player1}
                    onMarkerChange={markerChangeHandler}
                    playerMarker={player1Marker}
                />
                <div className={styles.gameBoardContainer}>
                    <GameBoardGui board={gameBoard} onCurrentPlayerChange={currentPlayerChangeHandler}></GameBoardGui>
                </div>

                <PlayerOptionsSidebar
                    player={Player.Player2}
                    isThisPlayersTurn={currentPlayerWithMove === Player.Player2}
                    onMarkerChange={markerChangeHandler}
                    playerMarker={player2Marker}
                />
            </div>
            <div>{currentPlayerWithMove}'s turn</div>
        </div>
    )
}