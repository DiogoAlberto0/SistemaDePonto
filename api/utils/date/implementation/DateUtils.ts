import { IDateUtils } from "../IDateUtils";


export class DateUtils implements IDateUtils {
    getArrayDatesBetwen(start: Date, end: Date): Date[] {
        
        let currentDate = new Date(start)

        const dates = []
        while(currentDate.getTime() <= end.getTime()) {
            dates.push(new Date(currentDate))

            currentDate.setDate(currentDate.getDate() + 1)
        }

        return dates
    }
}