"use client"

import React, { useRef, useState } from 'react';
import styles from './PlayerOptionsSidebar.module.css'
import Player from './Player';
import TileContent from './TileContent';

export default function PlayerOptionsSidebar(props: {isThisPlayersTurn: boolean, player: Player, onMarkerChange: (player: Player, marker: TileContent) => void, playerMarker: TileContent}) {
    const [radioGroupName] = useState(Math.random().toString().slice(2));

    function markerChangeHandler(): void {
        const selected = document.querySelector<HTMLInputElement>(`input[name="${radioGroupName}"]:checked`)?.value ?? "S";

        const marker: TileContent = selected as TileContent;
        props.onMarkerChange(props.player, marker);
    }

    return (
        <div className={styles.playerOptions}>
            <div className={styles.playerHeader}>{props.player}</div>
            <div>
                <span>{props.player} letter:</span>
                <label>
                    <input
                        type="radio"
                        value="S"
                        checked={props.playerMarker === "S"}
                        name={radioGroupName}
                        onChange={markerChangeHandler}
                    />
                    S
                </label>
                <label>
                    <input
                        type="radio"
                        value="O"
                        checked={props.playerMarker === "O"}
                        name={radioGroupName}
                        onChange={markerChangeHandler}
                    />
                    O
                </label>
            </div>
        </div>
    )
}
  