import { Entity } from "./general/Entity";


interface IStationProps {
    name: string;
    cnpj: string;
    coord: {
        latitude: number;
        longitude: number;
    }
}
export class Station extends Entity<IStationProps>{
    
    constructor(props: IStationProps, id?: string ) {
        super(props, id)
    }
}