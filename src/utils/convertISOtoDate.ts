import { format, parseISO } from "date-fns"

export const convertISOtoDate = (date: string) => {
    return format(parseISO(date), 'dd/MM/yyyy')
}