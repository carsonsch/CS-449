"use client"

import styles from './GameBoardGui.module.css'
import { useEffect, useState } from 'react'
import GameBoardTile from './GameBoardTile';

export default function GameBoardGui(props: { boardSize: number }) {
    const [boardSize, setBoardSize] = useState<number>(props.boardSize);
    const [boardTiles, setBoardTiles] = useState<JSX.Element[]>();

    useEffect(() => {
        const tiles: Array<JSX.Element> = [];
        for (let i = 0; i < boardSize ** 2; i++) {
            const xPos: number = i % boardSize;
            const yPos: number = Math.floor(i / boardSize);

            tiles.push(
                <GameBoardTile key={i} xPos={xPos} yPos={yPos}></GameBoardTile>
            );
        }

        setBoardTiles(tiles);
    }, []);
    
    
    return (
        <>
            <div className={styles.boardContainer} style={{gridTemplateColumns: `repeat(${boardSize}, 1fr)`}}>
                {boardTiles}
            </div>
            <div className={styles.boardLine}></div>
        </>
    )
}
  