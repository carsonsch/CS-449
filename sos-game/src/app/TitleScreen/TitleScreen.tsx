"use client"

import { useEffect, useRef, useState } from 'react';
import ScrollingWordBackground from '../ScrollingWordBackground/ScrollingWordBackground'
import styles from './TitleScreen.module.css'
import GameOptions from '../GameOptions';
import GameModes from '../enums/GameModes';
import { ReplayParser } from '../ReplayParser';

export default function TitleScreen(props: { onGameStart: (gameOptions: GameOptions) => void; }) {
    const [boardSize, setBoardSize] = useState(3);
    const [selectedGameMode, setSelectedGameMode] = useState(GameModes.SimpleGame);
    const replayFileSelectorRef = useRef<HTMLInputElement>(null);

    const boardSizeMin = 3;
    const boardSizeMax = 12;

    function gameModeChangeHandler(): void {
        const gameModeStr: string = document.querySelector<HTMLInputElement>('input[name="gameMode"]:checked')?.value ?? GameModes.SimpleGame.toString();
        const gameMode: GameModes = gameModeStr as GameModes;

        console.log("Changing game mode", gameModeStr);

        setSelectedGameMode(gameMode);
    }

    function startGame(gameOptions: GameOptions | null = null): void {
        if (gameOptions !== null) {
            props.onGameStart(gameOptions);
            return;
        }

        const options: GameOptions = {
            gameMode: selectedGameMode,
            boardSize: boardSize,
            isReplayMode: false,
            replayMoves: null
        };

        props.onGameStart(options);
    }

    async function replayFileSelected(): Promise<void> {
        const fileCount = replayFileSelectorRef.current?.files?.length;
        if (fileCount === null || fileCount === 0) {
            return;
        }

        const file = replayFileSelectorRef.current?.files?.item(0);
        const replayFile = await file?.text() ?? "";
        
        let gameOptions: GameOptions;
        try {
            gameOptions = ReplayParser.parseReplayFile(replayFile);
        } catch {
            alert("Invalid replay file. Try again.");
            return;
        }

        if (replayFileSelectorRef.current !== null) {
            replayFileSelectorRef.current.value = "";
        }

        startGame(gameOptions);
    }

    return (
        <div>
            <div className={styles.titleScreen}>
                <div className={styles.banner}>
                    <span className={styles.titleText}>SOS Game</span>
                    <div className={styles.gameOptions}>
                        <span>Board size:</span>
                        <input
                            type="range"
                            min={boardSizeMin}
                            max={boardSizeMax}
                            value={boardSize}
                            onChange={(e) => setBoardSize(parseInt(e.currentTarget.value))}
                        />
                        <span>{boardSize}</span>
                    </div>
                    <div className={styles.gameOptions}>
                        <span>Game mode:</span>
                        <label>
                            <input
                                type="radio"
                                value="GENERAL_GAME"
                                name="gameMode"
                                checked={selectedGameMode === "GENERAL_GAME"}
                                onChange={gameModeChangeHandler}
                            />
                            General Game
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="SIMPLE_GAME"
                                name="gameMode"
                                checked={selectedGameMode === "SIMPLE_GAME"}
                                onChange={gameModeChangeHandler}
                            />
                            Simple Game
                        </label>
                    </div>
                    <div>
                        <button>
                            <label htmlFor="replayFileSelector">
                                Replay game from recording
                            </label>
                        </button>

                        <input
                            id="replayFileSelector"
                            type="file"
                            ref={replayFileSelectorRef}
                            accept="text/plain"
                            onChange={replayFileSelected}
                            style={{display: "none"}}
                        />
                    </div>
                    <button className={styles.startButton} onClick={() => startGame()}>Start</button>
                </div>
            </div>
        </div>
    )
}
  