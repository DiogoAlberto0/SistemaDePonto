import { TimeSheet } from "../entities/TimeSheet";

export interface IUpdateTimeSheet {
    userId: string;
    date: Date;
    first_entrance?: number;
    first_exit?: number;
    second_entrance?: number;
    second_exit?: number;
    missed?: boolean;
    medicalCertificate?: boolean;
}
export interface ITimeSheetRepository {
    save(timeSheet: TimeSheet): Promise<TimeSheet>;
    setClockinById(timeSheetId: string, date: Date): Promise<TimeSheet>;
    getByUserIdAndDate(userId: string, date: Date): Promise<TimeSheet | null>;
    UpdateTimeSheetByUserId(data: IUpdateTimeSheet): Promise<TimeSheet>;
    getByUserIdAndYearAndMonth(userId: string, year: number, month: number): Promise<TimeSheet[]>
    getMonthsAndYearByUserId(userId: string): Promise<{ year: number, month: number}[]>
}