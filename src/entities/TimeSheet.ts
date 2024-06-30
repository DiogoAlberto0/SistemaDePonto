import { Entity } from "./general/Entity";


interface ITimeSheetProps {
    userId: string;
    registeredDay: number;
    registeredMonth: number;
    registeredYear: number;
    clockin: {
        first_entrance?: bigint | undefined;
        first_exit?: bigint | undefined;
        second_entrance?: bigint | undefined;
        second_exit?: bigint | undefined;
        missed?: boolean;
        medicalCertificate?: boolean;
    }
}


export class TimeSheet extends Entity<ITimeSheetProps> {
    constructor(props: ITimeSheetProps, id?: string) {
        super(props, id)
        this.props = {
            userId: props.userId,
            registeredDay: props.registeredDay,
            registeredMonth: props.registeredMonth,
            registeredYear: props.registeredYear,
            clockin: {
                first_entrance: props.clockin.first_entrance || undefined,
                first_exit: props.clockin.first_exit || undefined,
                second_entrance: props.clockin.second_entrance || undefined,
                second_exit: props.clockin.second_exit || undefined,
                missed: props.clockin.missed || false,
                medicalCertificate: props.clockin.medicalCertificate || false
            }
        }
    }
}