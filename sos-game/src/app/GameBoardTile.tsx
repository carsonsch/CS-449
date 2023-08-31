"use client"

import styles from './GameBoard.module.css'
import { useEffect, useState } from 'react'

export default function GameBoardTile(props: { xPos: number, yPos: number }) {
    return (
        <div>{`${props.xPos}, ${props.yPos}`}</div>
    )
}
  