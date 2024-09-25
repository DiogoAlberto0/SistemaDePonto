export interface ICoord {
    latitude: number;
    longitude: number;
}

export interface ICoordUtils {
    verifyIfCoordsInRadius(coord1: ICoord, coord2: ICoord, radius: number): boolean
}