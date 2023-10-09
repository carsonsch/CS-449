"use client"

import { useState } from 'react';
import TitleScreen from './TitleScreen/TitleScreen';
import styles from './TitleScreen.module.css'
import GameGui from './GameGui/GameGui';
import GameOptions from './GameOptions';

export default function Game() {

    const [gameStarted, setGameStarted] = useState(false);
    const [gameOptions, setGameOptions] = useState<GameOptions | null>(null);

    function startGame(gameOptions: GameOptions): void {
        setGameOptions(gameOptions);
        setGameStarted(true);
    }

    return (
        (gameStarted && gameOptions != null
            ? <GameGui gameOptions={gameOptions}></GameGui>
            : <TitleScreen onGameStart={startGame}></TitleScreen>
        )
    )
}
  