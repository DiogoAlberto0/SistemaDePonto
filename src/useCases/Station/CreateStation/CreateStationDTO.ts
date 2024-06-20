

export interface ICreateStationDTO {
    name: string;
    cnpj: string;
    coords: {
        latitude: number;
        longitude: number;
    }
}