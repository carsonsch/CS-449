"use client"

import TileClickEvent from '../TileClickEvent';
import TileContent from '../enums/TileContent'
import styles from './GameBoardTile.module.css'

export default function GameBoardTile(props: { xPos: number, yPos: number, marker: TileContent, onClick: (e: TileClickEvent) => void; }) {
    function sendClickEvent(): void {
        const e: TileClickEvent = new TileClickEvent(props.xPos, props.yPos, props.marker);
        props.onClick(e);
    }
    
    return (
        <div className={styles.tile} onClick={() => sendClickEvent()} data-tile={props.xPos + "," + props.yPos}>
            <span>{props.marker}</span>
        </div>
    )
}
  