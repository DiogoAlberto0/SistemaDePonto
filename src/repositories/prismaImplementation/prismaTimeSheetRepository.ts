import { TimeSheet } from "../../entities/TimeSheet";
import { ITimeSheetRepository, IUpdateTimeSheet } from "../ITimeSheetRepository";
import { prisma } from "./prismaConnection";



export class PrismaTimeSheetRepository implements ITimeSheetRepository {
    async UpdateTimeSheetByUserId(data: IUpdateTimeSheet): Promise<TimeSheet> {
        try {
            const existentTimeSheet = await prisma.timeSheet.findFirst({
                where: {
                    registeredDay: data.date.getDate(),
                    registeredMonth: data.date.getMonth(),
                    registeredYear: data.date.getFullYear(),
                    userId: data.userId
                }
            })

            if (!existentTimeSheet) {
                const timeSheet = new TimeSheet({
                    userId: data.userId,
                    registeredDay: data.date.getDate(),
                    registeredMonth: data.date.getMonth(),
                    registeredYear: data.date.getFullYear(),
                    clockin: {
                        first_entrance: data.first_entrance,
                        second_entrance: data.second_entrance,
                        first_exit: data.first_exit,
                        second_exit: data.second_exit,
                        missed: data.missed,
                        medicalCertificate: data.medicalCertificate
                    }
                })
                await this.save(timeSheet)
                return timeSheet
            } else {
                const timeSheet = new TimeSheet({
                    userId: data.userId,
                    registeredDay: data.date.getDate(),
                    registeredMonth: data.date.getMonth(),
                    registeredYear: data.date.getFullYear(),
                    clockin: {
                        first_entrance: data.first_entrance,
                        second_entrance: data.second_entrance,
                        first_exit: data.first_exit,
                        second_exit: data.second_exit,
                        missed: data.missed,
                        medicalCertificate: data.medicalCertificate
                    }
                }, existentTimeSheet.id)

                await prisma.timeSheet.update({
                    where: {
                        id: timeSheet.id
                    },
                    data: timeSheet.props
                })

                return timeSheet
            }
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }
    async getByUserIdAndDate(userId: string, date: Date): Promise<TimeSheet | null> {
        try {

            const timeSheet = await prisma.timeSheet.findFirst({
                where: {
                    userId,
                    registeredDay: date.getDate(),
                    registeredMonth: date.getMonth(),
                    registeredYear: date.getFullYear(),
                }
            })

            if (!timeSheet) return null

            return new TimeSheet({
                userId: timeSheet.userId,
                registeredDay: timeSheet.registeredDay,
                registeredMonth: timeSheet.registeredMonth,
                registeredYear: timeSheet.registeredYear,
                clockin: {
                    first_entrance: timeSheet.first_entrance || undefined,
                    first_exit: timeSheet.first_exit || undefined,
                    second_entrance: timeSheet.second_entrance || undefined,
                    second_exit: timeSheet.second_exit || undefined,
                }
            }, timeSheet.id)
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }
    async getByUserIdAndYearAndMonth(userId: string, year: number, month: number): Promise<TimeSheet[]> {
        try {
            const timeSheets = await prisma.timeSheet.findMany({
                where: {
                    userId,
                    registeredYear: year,
                    registeredMonth: month
                }
            })

            return timeSheets.map(timeSheet => (
                new TimeSheet({
                    userId: timeSheet.userId,
                    registeredDay: timeSheet.registeredDay,
                    registeredMonth: timeSheet.registeredMonth,
                    registeredYear: timeSheet.registeredYear,
                    clockin: {
                        first_entrance: timeSheet.first_entrance || undefined,
                        first_exit: timeSheet.first_exit || undefined,
                        second_entrance: timeSheet.second_entrance || undefined,
                        second_exit: timeSheet.second_exit || undefined,
                        missed: timeSheet.missed,
                        medicalCertificate: timeSheet.medicalCertificate
                    }
                })
            ))
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }
    async getMonthsAndYearByUserId(userId: string): Promise<{ year: number; month: number; }[]> {
        try {
            const result = await prisma.$queryRaw<{ year: number; month: number; }[]>`
            SELECT DISTINCT
                "registeredYear" AS year,
                "registeredMonth" AS month
            FROM
                "TimeSheet"
            WHERE
                "userId" = ${userId}
            ORDER BY
                year,
                month
        `;

            return result;
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }
    async save(timeSheet: TimeSheet): Promise<TimeSheet> {
        try {
            await prisma.timeSheet.create({
                data: {
                    id: timeSheet.id,
                    registeredDay: timeSheet.props.registeredDay,
                    registeredMonth: timeSheet.props.registeredMonth,
                    registeredYear: timeSheet.props.registeredYear,
                    first_entrance: timeSheet.props.clockin.first_entrance,
                    first_exit: timeSheet.props.clockin.first_exit,
                    second_entrance: timeSheet.props.clockin.second_entrance,
                    second_exit: timeSheet.props.clockin.second_exit,
                    userId: timeSheet.props.userId
                }
            })

            return timeSheet
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }
    async setClockinById(timeSheetId: string, date: Date): Promise<TimeSheet> {
        try {
            const timeSheet = await prisma.timeSheet.findUnique({
                where: {
                    id: timeSheetId
                }
            })

            if (!timeSheet) throw new Error('Folha de ponto não encontrada')

            const updatedTimeSheet = await prisma.timeSheet.update({
                where: {
                    id: timeSheet.id
                },
                data: {
                    first_entrance: timeSheet.first_entrance,
                    first_exit: timeSheet.first_entrance && !timeSheet.first_exit ? date.getTime() : undefined,
                    second_entrance: timeSheet.first_exit && !timeSheet.second_entrance ? date.getTime() : undefined,
                    second_exit: timeSheet.second_entrance && !timeSheet.second_exit ? date.getTime() : undefined
                }
            })

            return new TimeSheet({
                userId: updatedTimeSheet.userId,
                registeredDay: updatedTimeSheet.registeredDay,
                registeredMonth: updatedTimeSheet.registeredMonth,
                registeredYear: updatedTimeSheet.registeredYear,
                clockin: {
                    first_entrance: updatedTimeSheet.first_entrance || undefined,
                    first_exit: updatedTimeSheet.first_exit || undefined,
                    second_entrance: updatedTimeSheet.second_entrance || undefined,
                    second_exit: updatedTimeSheet.second_exit || undefined,
                }
            }, updatedTimeSheet.id)
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }
}