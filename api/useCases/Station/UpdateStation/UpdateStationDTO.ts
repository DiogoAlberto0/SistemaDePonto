

export interface IUpdateStationDTO {
    id: string;
    name: string;
    cnpj: string;
    coord: {
        latitude: number;
        longitude: number;
    }
}