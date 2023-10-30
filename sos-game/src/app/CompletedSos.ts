import Coord from "./Coord";
import Player from "./enums/Player";

export default interface CompletedSos {
    player: Player,
    firstPoint: Coord,
    lastPoint: Coord
}