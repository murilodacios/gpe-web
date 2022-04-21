import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { useAuthenticate } from "./AuthContext";

type Month = {
    id: string;
    name: string;
    numeric_month: number;
}

type Secretary = {
    id: string;
    name: string;
}

interface Payment {
    id: string;
    empresa: string
    processo: string
    assunto: string
    fonte: string
    referencia: string
    valor: any
    pago: string
    month_id: string
    secretary_id: string
    month: Month
    secretary: Secretary
}


type PaymentsProviderProps = {
    children: ReactNode
}

type PaymentsContextData = {
    payments: Payment[];
    months: Month[];
    secretaries: Secretary[];
    selectMonth(month_id: string): void;
    createPayment(data: Payment): Promise<Payment | undefined>;
}

export const PaymentsContext = createContext({} as PaymentsContextData)

export function PaymentsProvider({ children }: PaymentsProviderProps) {

    const [payments, setPayments] = useState<Payment[]>([])
    const [months, setMonths] = useState<Month[]>([])
    const [secretaries, setSecretaries] = useState<Secretary[]>([])

    const [month_id, setSelectedMonth] = useState("")

    const { isAuthenticated } = useAuthenticate()

    const cookies = parseCookies()

    useEffect(() => {

        if (cookies["dashtwo:token"]) {
            api.get(`/payments${month_id ? `?month_id=${month_id}` : ""}`).then((response) => {
                const paymentData = response.data

                setPayments(paymentData)
            })
        }

    }, [isAuthenticated, month_id])

    useEffect(() => {

        if (cookies["dashtwo:token"]) {
            api.get(`/payments/months`).then((response) => {
                const monthsData = response.data

                setMonths(monthsData)
            })
        }

    }, [isAuthenticated])

    useEffect(() => {

        if (cookies["dashtwo:token"]) {
            api.get(`/payments/secretaries`).then((response) => {
                const secretariesData = response.data

                setSecretaries(secretariesData)
            })
        }

    }, [isAuthenticated])

    function selectMonth(month_id: string): void {
        setSelectedMonth(month_id)
    }

    async function createPayment(data: Payment): Promise<Payment | undefined> {

        const { assunto, empresa, fonte, month_id, pago, processo, referencia, secretary_id, valor } = data

        let valorParsed = parseFloat(valor)

        try {
            const payment = await api.post("/payments", { assunto, empresa, fonte, month_id, pago, processo, referencia, secretary_id, valor: valorParsed })

            const paymentData = payment.data

            setPayments([paymentData, ...payments])

            Router.push(`/pagamentos`)

            return paymentData

        } catch (err) {
            console.log(err)
            toast.error("Não foi possível criar o pagamento")
        }

        
    }


    return (
        <PaymentsContext.Provider value={{ payments, selectMonth, months, secretaries, createPayment }}>
            {children}
        </PaymentsContext.Provider>
    )
}

export const usePayments = () => {
    const context = useContext(PaymentsContext);
    return context;
}