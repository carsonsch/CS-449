"use client"

import styles from './GameBoard.module.css'
import { useEffect, useState } from 'react'
import GameBoardTile from './GameBoardTile';

export default function GameBoard(props: { boardSize: number }) {
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
        <div>
            <div className={styles.boardContainer} style={{gridTemplateColumns: `repeat(${boardSize}, 1fr)`}}>
                {boardTiles}
            </div>
        </div>
    )
}
  