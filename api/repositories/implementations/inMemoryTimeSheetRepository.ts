import { TimeSheet } from "../../entities/TimeSheet";
import { ITimeSheetRepository, IUpdateTimeSheet } from "../ITimeSheetRepository";


interface YearAndMonth {
    year: number;
    month:number
}
export class InMemoryTimeSheetRepository implements ITimeSheetRepository{

    private timeSheets: TimeSheet[] = []


    async save(timeSheet: TimeSheet): Promise<TimeSheet> {
        this.timeSheets.push(timeSheet)
        
        return timeSheet
    }
    async getByUserIdAndDate(userId: string, date: Date): Promise<TimeSheet | null> {
        
        const existentTimeSheet = this.timeSheets.find(timeSheet => {
            if(
                timeSheet.props.userId === userId &&
                timeSheet.props.registeredDay == date.getUTCDate() &&
                timeSheet.props.registeredMonth == date.getUTCMonth() &&
                timeSheet.props.registeredYear == date.getUTCFullYear() 
            ) return true
        })

        return existentTimeSheet || null
    }

    async setClockinById(timeSheetId: string, date: Date): Promise<TimeSheet> {
        const timeSheetIndex = this.timeSheets.findIndex(timeSheet => timeSheet.id === timeSheetId)

        if(timeSheetIndex < 0) throw new Error('Registro de folha de ponto não encontrado')

        if(this.timeSheets[timeSheetIndex].props.clockin.second_entrance) {
            this.timeSheets[timeSheetIndex].props.clockin.second_exit = BigInt(date.getTime())
        }
        if(this.timeSheets[timeSheetIndex].props.clockin.first_exit) {
            this.timeSheets[timeSheetIndex].props.clockin.second_entrance = BigInt(date.getTime())
        }

        this.timeSheets[timeSheetIndex].props.clockin.first_exit = BigInt(date.getTime())

        return this.timeSheets[timeSheetIndex]
    }

    async setMissedByUserIdAndDate(userId: string, date: Date): Promise<TimeSheet> {
        const existentTimeSheetIndex = this.timeSheets.findIndex(timeSheet => {
            if(
                timeSheet.props.userId === userId &&
                timeSheet.props.registeredDay == date.getUTCDate() &&
                timeSheet.props.registeredMonth == date.getUTCMonth() &&
                timeSheet.props.registeredYear == date.getUTCFullYear() 
            ) return true
        })

        if(existentTimeSheetIndex < 0) {
            const timeSheet = new TimeSheet({
                userId,
                registeredDay: date.getUTCDate(),
                registeredMonth: date.getUTCMonth(),
                registeredYear: date.getUTCFullYear(),
                clockin: {
                    missed: true
                }
            })
            return await this.save(timeSheet)
        } else {
            this.timeSheets[existentTimeSheetIndex].props.clockin.missed = true
            return this.timeSheets[existentTimeSheetIndex]
        }
    }
    async UpdateTimeSheetByUserId({
        userId,
        registeredDay,
        registeredMonth,
        registeredYear,
        first_entrance,
        first_exit,
        second_entrance,
        second_exit,
        missed,
        medicalCertificate
    }: IUpdateTimeSheet): Promise<TimeSheet> {
        const existentTimeSheetIndex = this.timeSheets.findIndex(timeSheet => {
            if(
                timeSheet.props.userId === userId &&
                timeSheet.props.registeredDay == registeredDay &&
                timeSheet.props.registeredMonth == registeredMonth &&
                timeSheet.props.registeredYear == registeredYear 
            ) return true
        })
        const timeSheet = new TimeSheet({
            userId,
            registeredDay: registeredDay,
            registeredMonth: registeredMonth,
            registeredYear: registeredYear,
            clockin: {
                first_entrance,
                first_exit,
                second_entrance,
                second_exit,
                missed,
                medicalCertificate
            }
        }, existentTimeSheetIndex >= 0 ? this.timeSheets[existentTimeSheetIndex].id : undefined)

        if(existentTimeSheetIndex < 0) {
            return await this.save(timeSheet)
        } else {

            this.timeSheets[existentTimeSheetIndex] = timeSheet
            return this.timeSheets[existentTimeSheetIndex]
        }
    }

    async getByUserIdAndYearAndMonth(userId: string, year: number, month: number): Promise<TimeSheet[]> {
        return this.timeSheets.filter(timeSheet => timeSheet.props.userId === userId && timeSheet.props.registeredYear == year && timeSheet.props.registeredMonth == month  )
    }

    
    async getMonthsAndYearByUserId(userId: string): Promise<YearAndMonth[]> {

        const monthsAndYears: YearAndMonth[] = []

        this.timeSheets.forEach(timeSheet => {
            if(timeSheet.props.userId === userId) {
                const monthAndYear = {
                    year: timeSheet.props.registeredYear,
                    month: timeSheet.props.registeredMonth
                }

                const exists = monthsAndYears.some(item => {
                    item.year === monthAndYear.year && item.month === monthAndYear.month
                })
                if(!exists) {
                    monthsAndYears.push(monthAndYear)
                }
            }
        })
        return monthsAndYears
    }

    async getLastRegisterByDate({userId, year, month, day}: {userId: string, year: number, month: number, day: number}): Promise<TimeSheet | null> {
        const filteredTimeSheets = this.timeSheets.filter(timeSheet => timeSheet.props.userId === userId && timeSheet.props.registeredDay === day && timeSheet.props.registeredMonth === month && timeSheet.props.registeredYear === year)
        return filteredTimeSheets[0] || null
    }
}