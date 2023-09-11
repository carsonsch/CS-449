"use client"

import GameBoard from '@/app/GameBoard'
import styles from './GameGui.module.css'
import { useEffect, useState } from 'react'

export default function GameGui() {

    return (
        <div className={styles.centerContainer}>
            <div className={styles.gameGuiContainer}>
                <div className={styles.playerOptions}>
                    <div className={styles.playerHeader}>Player 1:</div>
                    <div>
                        <span>Player 1 letter:</span>
                        <label>
                            <input type="radio"></input>
                            S
                        </label>
                        <label>
                            <input type="radio"></input>
                            O
                        </label>
                    </div>
                    <div style={{marginTop: "330px"}}>
                        <span>Record game:</span>
                        <input type="checkbox"></input>
                    </div>
                </div>
                
                <div className={styles.gameBoardContainer}>
                    <GameBoard boardSize={8}></GameBoard>
                </div>

                <div className={styles.playerOptions}>
                    <div className={styles.playerHeader}>Player 2:</div>
                    <div>
                        <span>Player 2 letter:</span>
                        <label>
                            <input type="radio"></input>
                            S
                        </label>
                        <label>
                            <input type="radio"></input>
                            O
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}