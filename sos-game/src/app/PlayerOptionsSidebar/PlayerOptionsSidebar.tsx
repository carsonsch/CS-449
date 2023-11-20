"use client"

import React, { useRef, useState } from 'react';
import styles from './PlayerOptionsSidebar.module.css'
import Player from '../enums/Player';
import TileContent from '../enums/TileContent';
import PlayerOptions from '../PlayerOptions';

export default function PlayerOptionsSidebar(props: {isThisPlayersTurn: boolean, player: Player, onPlayerOptionsChange: (player: Player, options: PlayerOptions) => void, playerOptions: PlayerOptions}) {
    const [radioGroupName] = useState(Math.random().toString().slice(2));
    const cpuPlayingCheckbox = useRef<HTMLInputElement>(null);
    
    function optionsChangeHandler(): void {
        const selectedMarker = document.querySelector<HTMLInputElement>(`input[name="${radioGroupName}"]:checked`)?.value ?? "S";
        const marker: TileContent = selectedMarker as TileContent;
        const cpuPlaying = cpuPlayingCheckbox.current?.checked ?? false;

        const opts: PlayerOptions = { cpuPlaying, marker };
        props.onPlayerOptionsChange(props.player, opts);
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
                        checked={props.playerOptions.marker === "S"}
                        name={radioGroupName}
                        onChange={optionsChangeHandler}
                    />
                    S
                </label>
                <label>
                    <input
                        type="radio"
                        value="O"
                        checked={props.playerOptions.marker === "O"}
                        name={radioGroupName}
                        onChange={optionsChangeHandler}
                    />
                    O
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={props.playerOptions.cpuPlaying}
                        onChange={optionsChangeHandler}
                        ref={cpuPlayingCheckbox}
                    />
                    Computer
                </label>
            </div>
        </div>
    )
}
  