"use client"

import ScrollingWordBackground from './ScrollingWordBackground'
import styles from './TitleScreen.module.css'

export default function TitleScreen(props: { onGameStart: () => void; }) {

    console.log("these are props:", props);

    return (
        <div>
            <div className={styles.titleScreen}>
                <div className={styles.banner}>
                    <span className={styles.titleText}>SOS Game</span>
                    <button className={styles.startButton} onClick={() => props.onGameStart()}>Start</button>
                </div>
            </div>
        </div>
    )
}
  