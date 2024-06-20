import { IDateUtils } from "../IDateUtils";


export class DateUtils implements IDateUtils {
    getArrayDatesBetwen(start: Date, end: Date): Date[] {
        
        let currentDate = new Date(start)

        const dates = []
        while(currentDate <= end) {
            dates.push(new Date(currentDate))

            currentDate = new Date(currentDate.getDate() + 1)
        }

        return dates
    }
}