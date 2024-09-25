import { ICoord, ICoordUtils } from "../ICoord";

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (value: number): number => value * Math.PI / 180;

    const R = 6371; // Raio da Terra em km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distância em km
}

function isWithinRadius(lat1: number, lon1: number, lat2: number, lon2: number, radius: number): boolean {
    const distance = haversine(lat1, lon1, lat2, lon2);
    return distance <= radius;
}
export class CoordUtils implements ICoordUtils {
    verifyIfCoordsInRadius(coord1: ICoord, coord2: ICoord, radius: number): boolean {
        return isWithinRadius(coord1.latitude, coord1.longitude, coord2.latitude, coord2.longitude, radius)
    }
}