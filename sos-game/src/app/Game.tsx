"use client"

import { useState } from 'react';
import TitleScreen from './TitleScreen';
import styles from './TitleScreen.module.css'
import GameBoard from './GameBoard';

export default function Game() {

    const [gameStarted, setGameStarted] = useState<Boolean>(false);

    function startGame(): void {
        setGameStarted(true);
    }

    return (
        (gameStarted
            ? <GameBoard boardSize={3}></GameBoard>
            : <TitleScreen onGameStart={startGame}></TitleScreen>
        )
    )
}
  