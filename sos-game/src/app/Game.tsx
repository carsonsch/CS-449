"use client"

import { useState } from 'react';
import TitleScreen from './TitleScreen';
import styles from './TitleScreen.module.css'
import GameGui from './GameGui';

export default function Game() {

    const [gameStarted, setGameStarted] = useState<Boolean>(false);

    function startGame(): void {
        setGameStarted(true);
    }

    return (
        (gameStarted
            ? <GameGui></GameGui>
            : <TitleScreen onGameStart={startGame}></TitleScreen>
        )
    )
}
  