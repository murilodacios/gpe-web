import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { useAuthenticate } from "./AuthContext";

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
    month: string
    secretary: string
    year: string
}


type PaymentsProviderProps = {
    children: ReactNode
}

type PaymentsContextData = {
    payments: Payment[];
    selectMonth(month: string): void;
    selectYear(year: string): void;
    createPayment(data: Payment): Promise<Payment | undefined>;
    setTakesLoadingPayments(value: number): void;
    reportAllPayments(): Promise<Payment[] | undefined>;
}

export const PaymentsContext = createContext({} as PaymentsContextData)

export function PaymentsProvider({ children }: PaymentsProviderProps) {

    const [takes, setTakes] = useState(10)

    const [payments, setPayments] = useState<Payment[]>([])

    const [month, setSelectedMonth] = useState("")
    const [year, setSelectedYear] = useState("")

    const { isAuthenticated, user } = useAuthenticate()

    const cookies = parseCookies()

    useEffect(() => {

        if (cookies["dashtwo:token"]) {
            api.get(`/payments${month ? `?month=${month}&takes=${takes}` : `?takes=${takes}`}${year && month ? `&year=${year}` : ""}${year && !month ? `?year=${year}` : ""}`).then((response) => {
                const paymentData = response.data

                setPayments(paymentData)
            })
        }

    }, [isAuthenticated, month, year, takes])

    async function reportAllPayments(): Promise<Payment[] | undefined> {

        try {
            const payments = await api.get(`/payments/report${month ? `?month=${month}` : ``}${year && month ? `&year=${year}` : ""}${year && !month ? `?year=${year}` : ""}`)

            const paymentData = payments.data

            return paymentData

        } catch {
            console.log("Não foi possível gerar o relatório de pagamentos")

        }
    }

    function selectMonth(month: string): void {
        setSelectedMonth(month)
        setTakes(10)
    }

    function selectYear(year: string): void {
        setSelectedYear(year)
        setTakes(10)
    }

    function setTakesLoadingPayments(value: number) {

        let loadingTakes = takes + value

        setTakes(loadingTakes)
    }

    async function createPayment(data: Payment): Promise<Payment | undefined> {

        const { assunto, empresa, fonte, month, pago, processo, referencia, secretary, valor } = data

        let valorParsed = parseFloat(valor)

        try {
            const payment = await api.post("/payments", { assunto, empresa, fonte, month, pago, processo, referencia, secretary, valor: valorParsed })

            const paymentData = payment.data

            setPayments([paymentData, ...payments])

            toast.success("Pagamento criado com sucesso")

            return paymentData

        } catch (err) {
            console.log(err)
            toast.error("Não foi possível criar o pagamento")
        }


    }


    return (
        <PaymentsContext.Provider value={{ reportAllPayments, payments, selectMonth, createPayment, selectYear, setTakesLoadingPayments }}>
            {children}
        </PaymentsContext.Provider>
    )
}

export const usePayments = () => {
    const context = useContext(PaymentsContext);
    return context;
}