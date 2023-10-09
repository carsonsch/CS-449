"use client"

import styles from './GameBoardGui.module.css'
import { useEffect, useState } from 'react'
import GameBoardTile from '../GameBoardTile/GameBoardTile';
import TileClickEvent from '../TileClickEvent';
import GameBoard from '../gameboards/GameBoard';
import TileContent from '../enums/TileContent';
import Player from '../enums/Player';

export default function GameBoardGui(props: { board: GameBoard, onCurrentPlayerChange: (player: Player) => void; }) {
    const [boardTiles, setBoardTiles] = useState<JSX.Element[]>();
    const boardSize: number = props.board.getBoardSize();

    function handleTileClick(e: TileClickEvent): void {
        props.board.makeNextMove(e.tileX, e.tileY);
        rebuildTiles();

        const newCurrentPlayer: Player = props.board.getPlayerWithNextMove();
        props.onCurrentPlayerChange(newCurrentPlayer);
    }

    function rebuildTiles(): void {
        const tiles: Array<JSX.Element> = [];
        for (let i = 0; i < boardSize ** 2; i++) {
            const xPos: number = i % boardSize;
            const yPos: number = Math.floor(i / boardSize);
            const marker: TileContent = props.board.getTile(xPos, yPos);

            tiles.push(
                <GameBoardTile key={i} xPos={xPos} yPos={yPos} onClick={handleTileClick} marker={marker}></GameBoardTile>
            );
        }

        setBoardTiles(tiles);
    }

    useEffect(() => {
        rebuildTiles();
    }, []);
    
    
    return (
        <>
            <div className={styles.boardContainer} style={{gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))`}}>
                {boardTiles}
            </div>
        </>
    )
}
  