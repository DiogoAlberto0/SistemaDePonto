import { Entity } from "./general/Entity";

interface IPositionProps {
    office: string;
    privillegeLevel: number;
}

export class Position extends Entity<IPositionProps> {

    constructor(props: IPositionProps, id?: string){
        super(props, id)

        this.props.office = props.office.toUpperCase()
    }
}