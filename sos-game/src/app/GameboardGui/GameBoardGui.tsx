"use client"

import styles from './GameBoardGui.module.css'
import { useEffect, useRef, useState } from 'react'
import GameBoardTile from '../GameBoardTile/GameBoardTile';
import TileClickEvent from '../TileClickEvent';
import GameBoard from '../gameboards/GameBoard';
import TileContent from '../enums/TileContent';
import Player from '../enums/Player';
import Coord from '../Coord';

export default function GameBoardGui(props: { board: GameBoard, onCurrentPlayerChange: (player: Player) => void; onGameWinnerHandler: (player: Player | null) => void;}) {
    const [boardTiles, setBoardTiles] = useState<JSX.Element[]>();
    const [boardLines, setBoardLines] = useState<JSX.Element[]>();
    const gameBoardRef = useRef<HTMLDivElement>(null);

    props.board.setGamestateChangeHandler(handleGameStateChange);
    const boardSize: number = props.board.getBoardSize();

    function handleTileClick(e: TileClickEvent): void {
        const playerWithNextMove = props.board.getPlayerWithNextMove();
        if (props.board.getPlayerOptions(playerWithNextMove).cpuPlaying) {
            return;
        }

        props.board.makeNextMove(e.tileX, e.tileY);
        console.log(`board.makeNextMove(${e.tileX}, ${e.tileY});`);
    }

    function handleGameStateChange(): void {
        rebuildTiles();
        rebuildLines();

        if (props.board.isGameComplete()) {
            const winner = props.board.getGameWinner();
            props.onGameWinnerHandler(winner);
            return;
        }

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
                <GameBoardTile key={i}
                               xPos={xPos}
                               yPos={yPos}
                               onClick={handleTileClick}
                               marker={marker}
                               />
            );
        }

        setBoardTiles(tiles);
    }

    function rebuildLines(): void {
        const completedSoes = props.board.getCompletedSoses();
        const lines: Array<JSX.Element> = [];

        for (let i: number = 0; i < completedSoes.length; i++) {
            const sos = completedSoes[i];
            const centerOfFirst = getCenterOfTile(sos.firstPoint.x, sos.firstPoint.y);
            const centerOfLast = getCenterOfTile(sos.lastPoint.x, sos.lastPoint.y);

            lines.push(
                <line
                    x2={centerOfFirst.x}
                    y2={centerOfFirst.y}
                    x1={centerOfLast.x}
                    y1={centerOfLast.y}
                    stroke={sos.player}
                    strokeWidth="8px"
                    key={i}
                    />
            );
        }

        setBoardLines(lines);
    }

    function getCenterOfTile(xPos: number, yPos: number): Coord {
        const elem = document.querySelector(`[data-tile='${xPos},${yPos}']`);
        if (!elem || !gameBoardRef.current) {
            throw new Error("Invalid tile coordinates");
        }

        const board = gameBoardRef.current.getBoundingClientRect();
        const tile = elem.getBoundingClientRect();
        const coord: Coord = {
            x: (tile.left - board.left) + (tile.width / 2),
            y: (tile.top - board.top) + (tile.height / 2)
        };
        return coord;
    }

    useEffect(() => {
        rebuildTiles();
        rebuildLines();
    }, []);
    
    
    return (
        <>
            <svg className={styles.lineContainer} width="400" height="400">
                {boardLines}
            </svg>
            <div className={styles.boardContainer}
                 style={{gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))`}}
                 ref={gameBoardRef}
            >
                {boardTiles}
            </div>
        </>
    )
}
  