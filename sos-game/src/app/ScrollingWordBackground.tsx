"use client"

import React, { useRef, useState } from 'react';
import styles from './ScrollingWordBackground.module.css'

export default function ScrollingWordBackground() {
    const canvasRef = useRef(null);
    const wordSpacing = 16;
    const bgText = "SOS";

    function getContextForDrawing(canvas) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.font = "32px serif";
        ctx.fillStyle = "#ffffff";
        ctx.textBaseline = "top";
        ctx.rotate(Math.PI / 4);
        return ctx;
    }

    React.useEffect(() => {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const ctx = getContextForDrawing(canvasRef.current);

        const wordLength = ctx.measureText(bgText).width + wordSpacing;
        console.log(ctx.measureText(bgText));
        ctx.fillText(bgText, 1350, -1350);

        console.log(window.innerWidth * Math.tan(Math.PI / 2));


        const wordPositions = [];

        // let screenDiagLength = Math.sqrt((window.innerWidth ** 2) + (window.innerHeight ** 2));
        // let wordRowsNeeded = Math.ceil((screenDiagLength / wordRect.height) * 1.2);
        // let wordColsNeeded = Math.ceil((screenDiagLength / wordRect.width) * 1.2);
        console.log("rendered", wordLength);



    }, []);


    return (
        <canvas ref={canvasRef} style={{position: "absolute", top: "0px", left: "0px"}}></canvas>
    )
}
  