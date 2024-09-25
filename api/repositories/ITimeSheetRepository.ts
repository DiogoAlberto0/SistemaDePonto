import { TimeSheet } from "../entities/TimeSheet";

export interface IUpdateTimeSheet {
    userId: string;
    registeredDay: number;
    registeredMonth: number;
    registeredYear: number;
    first_entrance?: bigint;
    first_exit?: bigint;
    second_entrance?: bigint;
    second_exit?: bigint;
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
    getLastRegisterByDate({ userId, day, month, year } : {userId: string, day: number, month: number, year: number}): Promise<TimeSheet | null>
}