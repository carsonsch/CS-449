import TileContent from "./TileContent";

export default class TileClickEvent {
    public tileX: number;
    public tileY: number;
    public marker: TileContent;
    
    constructor(tileX: number, tileY: number, marker: TileContent) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.marker = marker;
    }
}