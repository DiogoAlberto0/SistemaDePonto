
export interface UpdateTimeSheetDTO {
    userId: string;
    adminId: string;
    registeredDay: number;
    registeredMonth: number;
    registeredYear: number;
    first_entrance?: bigint;
    first_exit?: bigint;
    second_entrance?: bigint;
    second_exit?: bigint;
    missed?: boolean
}