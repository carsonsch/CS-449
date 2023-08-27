"use client"

import React, { useRef, useState } from 'react';
import styles from './ScrollingWordBackground.module.css'

export default function ScrollingWordBackground() {
    const measureElemRef = useRef(null);
    
    const [wordColumnsNeeded, setWordColumnsNeeded] = useState(0);
    const [wordWidthPx, setWordWidthPx] = useState(0);
    const [sosWords, setSosWords] = useState([]);

    React.useEffect(() => {

        const wordRect = measureElemRef.current.getBoundingClientRect();

        let screenDiagLength = Math.sqrt((window.innerWidth ** 2) + (window.innerHeight ** 2));
        let wordRowsNeeded = Math.ceil((screenDiagLength / wordRect.height) * 1.2);
        let wordColsNeeded = Math.ceil((screenDiagLength / wordRect.width) * 1.2);
        setWordColumnsNeeded(wordColsNeeded);
        setWordWidthPx(wordRect.width);


        setSosWords(new Array(wordRowsNeeded * wordColsNeeded).fill(null).map(() => <span className={styles.backgroundText}>SOS</span>));

        console.log(wordRowsNeeded, wordColumnsNeeded);
    }, []);


    return (
        <>
        <span ref={measureElemRef} className={styles.backgroundText} style={{visibility: "hidden", position: "absolute", left: "-1000px"}}>SOS</span>
        <div className={styles.backgroundTextContainer} style={{display: "grid", gridTemplateColumns: `repeat(${wordColumnsNeeded}, ${wordWidthPx}px)`}}>
            {sosWords}
        </div>
        </>

    )
}
  