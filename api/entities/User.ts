import { Entity } from './general/Entity';
import { cleanPhoneNumber } from '../validators/phone.clear'

interface IUserProps {
    name: string;
    phone: string;
    hash: string;
    positionId: string;
    stationId: string;
}

export class User extends Entity<IUserProps>{

    constructor(props: IUserProps, id?: string) {
        super(props, id)
        this.props.phone = cleanPhoneNumber(props.phone)
    }
}