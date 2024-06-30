import { TimeSheet } from "../../entities/TimeSheet";
import { ITimeSheetRepository, IUpdateTimeSheet } from "../ITimeSheetRepository";
import { prisma } from "./prismaConnection";



export class PrismaTimeSheetRepository implements ITimeSheetRepository {

    async UpdateTimeSheetByUserId(data: IUpdateTimeSheet): Promise<TimeSheet> {
        try {
            const { registeredDay, registeredMonth, registeredYear, userId, first_entrance, first_exit, second_entrance, second_exit, missed, medicalCertificate } = data;

            // Buscar folha de ponto existente
            const existentTimeSheet = await prisma.timeSheet.findFirst({
                where: {
                    registeredDay,
                    registeredMonth,
                    registeredYear,
                    userId: userId
                }
            });

            // Dados para atualização ou criação
            const timeSheetData = {
                userId: userId,
                registeredDay,
                registeredMonth,
                registeredYear,
                first_entrance: first_entrance,
                first_exit: first_exit,
                second_entrance: second_entrance,
                second_exit: second_exit,
                missed: missed || false,
                medicalCertificate: medicalCertificate || false,
            };

            let timeSheet: TimeSheet;

            if (!existentTimeSheet) {
                // Criação de nova folha de ponto
                const createdTimeSheet = await prisma.timeSheet.create({ data: timeSheetData });
                timeSheet = new TimeSheet({
                    userId: createdTimeSheet.userId,
                    registeredDay: createdTimeSheet.registeredDay,
                    registeredMonth: createdTimeSheet.registeredMonth,
                    registeredYear: createdTimeSheet.registeredYear,
                    clockin: {
                        first_entrance: createdTimeSheet.first_entrance || undefined,
                        first_exit: createdTimeSheet.first_exit || undefined,
                        second_entrance: createdTimeSheet.second_entrance || undefined,
                        second_exit: createdTimeSheet.second_exit || undefined,
                        missed: createdTimeSheet.missed,
                        medicalCertificate: createdTimeSheet.medicalCertificate
                    }
                }, createdTimeSheet.id);
            } else {
                // Atualização de folha de ponto existente
                const updatedTimeSheet = await prisma.timeSheet.update({
                    where: { id: existentTimeSheet.id },
                    data: timeSheetData
                });
                timeSheet = new TimeSheet({
                    userId: updatedTimeSheet.userId,
                    registeredDay: updatedTimeSheet.registeredDay,
                    registeredMonth: updatedTimeSheet.registeredMonth,
                    registeredYear: updatedTimeSheet.registeredYear,
                    clockin: {
                        first_entrance: updatedTimeSheet.first_entrance || undefined,
                        first_exit: updatedTimeSheet.first_exit || undefined,
                        second_entrance: updatedTimeSheet.second_entrance || undefined,
                        second_exit: updatedTimeSheet.second_exit || undefined,
                        missed: updatedTimeSheet.missed,
                        medicalCertificate: updatedTimeSheet.medicalCertificate
                    }
                }, updatedTimeSheet.id);
            }

            return timeSheet;
        } catch (error: any) {
            throw new Error(error.message || 'Internal server error');
        }
    }

    async getByUserIdAndDate(userId: string, date: Date): Promise<TimeSheet | null> {
        try {

            const timeSheet = await prisma.timeSheet.findFirst({
                where: {
                    userId,
                    registeredDay: date.getUTCDate(),
                    registeredMonth: date.getUTCMonth(),
                    registeredYear: date.getUTCFullYear(),
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
            throw new Error(error.message || 'Internala server error')
        }
    }
    async getByUserIdAndYearAndMonth(userId: string, year: number, month: number): Promise<TimeSheet[]> {
        try {
            const timeSheets = await prisma.timeSheet.findMany({
                where: {
                    userId,
                    registeredYear: year,
                    registeredMonth: month
                },
                orderBy: [
                    { registeredYear: 'asc' },
                    { registeredMonth: 'asc' },
                    { registeredDay: 'asc' },
                ]
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
                }, timeSheet.id)
            ))
        } catch (error: any) {
            throw new Error(error.message || 'Internal server error')
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
            throw new Error(error.message || 'Internal server error')
        }
    }
    async save(timeSheet: TimeSheet): Promise<TimeSheet> {

        await prisma.timeSheet.create({
            data: {
                id: timeSheet.id,
                registeredDay: timeSheet.props.registeredDay,
                registeredMonth: timeSheet.props.registeredMonth,
                registeredYear: timeSheet.props.registeredYear,
                first_entrance: timeSheet.props.clockin.first_entrance,
                userId: timeSheet.props.userId,
                missed: false,
                medicalCertificate: false
            }
        })

        return timeSheet

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
            throw new Error(error.message || 'Internal server error')
        }
    }

    async getLastRegisterByDate({userId, year, month, day}:{userId: string, year: number, month: number, day: number}): Promise<TimeSheet | null> {
        try {
            const lastRegister = await prisma.timeSheet.findFirst({
                where: {
                    userId,
                    registeredDay: day,
                    registeredMonth: month,
                    registeredYear: year,
                },
                orderBy: [
                    {
                        registeredYear: 'desc' 
                    },
                    {
                        registeredMonth: 'desc'
                    },
                    {
                        registeredDay: 'desc'
                    }
                ]
            })

            if(!lastRegister) return null

            const { 
                id,
                registeredDay,
                registeredMonth,
                registeredYear,
                missed,
                medicalCertificate,
                first_entrance,
                first_exit,
                second_exit,
                second_entrance,
            } = lastRegister
            return new TimeSheet({
                registeredDay,
                registeredMonth,
                registeredYear,
                userId,
                clockin: {
                    first_entrance: first_entrance || undefined,
                    first_exit: first_exit || undefined,
                    second_entrance: second_entrance || undefined,
                    second_exit: second_exit || undefined,
                    missed,
                    medicalCertificate
                }
            }, id)
        } catch (error: any) {
            throw new Error(error.message || 'Internal server error')
        }
    }
}