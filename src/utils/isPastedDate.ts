import { isPast, parseISO } from "date-fns"

export const isPastedDate = (date: string) => {
    return isPast(parseISO(date))
}