
export interface UpdateTimeSheetDTO {
    userId: string;
    adminId: string;
    date: Date;
    first_entrance?: number;
    first_exit?: number;
    second_entrance?: number;
    second_exit?: number;
    missed?: boolean
}