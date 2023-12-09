import Player from "./enums/Player";
import TileContent from "./enums/TileContent";

export default class PlayerMove {
    public x: number;
    public y: number;
    public marker: TileContent;
    public player: Player;
    
    constructor(tileX: number, tileY: number, marker: TileContent, player: Player) {
        this.x = tileX;
        this.y = tileY;
        this.marker = marker;
        this.player = player;
    }
}