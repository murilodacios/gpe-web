import { isToday, parseISO } from "date-fns"

export const isTodayDate = (date: string) => {
    return isToday(parseISO(date))
}