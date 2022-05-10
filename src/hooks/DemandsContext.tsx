import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { useAuthenticate } from "./AuthContext";

type Users = {
    user: {
        name: string;
    }
}

interface Demand {
    id: string;
    numero: string;
    status: string;
    data_resposta: string;
    obs_resposta: string;
    anotacao: string;
    tipo: string;
    orgao_origem: string;
    remetente: string;
    assunto: string;
    setores: string;
    data_emissao: string;
    data_recebimento: string;
    prazo_resposta: string;
    processos: string;
    user?: {
        name: string;
        level: number;
    }
    users?: Users[];
}

type Demands = {
    id: string;
    numero: string;
    status: string;
    data_resposta: string;
    obs_resposta: string;
    anotacao: string;
    tipo: string;
    orgao_origem: string;
    remetente: string;
    assunto: string;
    setores: string;
    data_emissao: string;
    data_recebimento: string;
    prazo_resposta: string;
    processos: string;
    user: {
        name: string;
        level: number;
    }
    users: Users[];
    seen_users: Users[];
}

type DemandsProviderProps = {
    children: ReactNode
}

type DemandsContextData = {
    demands: Demands[];
    handleCheckResponseToDemand(id: string): Promise<Demand | undefined>;
    addUserToDemand(demandId: string, userId: string): Promise<Demand | undefined>;
    handleCreateNewDemand(data: Demand): Promise<Demand | undefined>;
    handleAddAnotationToDemand(id: string, anotacao: string): Promise<Demand | undefined>;
    seenDemand(demandId: string, userId: string): Promise<Demand | undefined>;
}

export const DemandsContext = createContext({} as DemandsContextData)

export function DemandsProvider({ children }: DemandsProviderProps) {

    const [demands, setDemands] = useState<Demands[]>([])
    const { isAuthenticated, user } = useAuthenticate()

    const cookies = parseCookies()

    useEffect(() => {

        if(cookies["dashtwo:token"]) {
            api.get("/demands").then((response) => {
                const demandData = response.data
    
                setDemands(demandData)
            })
        }

    }, [isAuthenticated])

    async function handleCreateNewDemand(data: Demand): Promise<Demand | undefined> {

        try {
            const response = await api.post("/demands", data)

            const demand = response.data

            setDemands([demand, ...demands])

            toast.success("Demanda criada com sucesso")

            Router.push(`/demandas/${demand.id}`)
        
            return demand
        } catch {
            toast.error("Falha ao criar a demanda")
        }

          

    }


    async function handleAddAnotationToDemand(id: string, anotacao: string): Promise<Demand | undefined> {

        try {
            const responseDemand = await api.put(`/demands/add-anotation/${id}`, {
                anotacao
            })

            const demand = responseDemand.data

            const demandaAtualizada = demands.map((atualDemand) => {
                if(atualDemand.id == demand.id) {
                    atualDemand.anotacao = demand.anotacao
                }

                return atualDemand
            })

            setDemands([...demandaAtualizada])

            toast.success("Anotação adicionada com sucesso!")

            return demand

        } catch {
            toast.error("Falha ao adicionar anotação a demanda")
        }

    }

    async function handleCheckResponseToDemand(id: string): Promise<Demand | undefined> {

        try {
            const responseDemand = await api.put(`/demands/check-response/${id}`, {
                data_resposta: new Date().toISOString()
            })

            const demand = responseDemand.data

            const demandaAtualizada = demands.map((atualDemand) => {
                if (atualDemand.id == demand.id) {
                    atualDemand.status = demand.status,
                        atualDemand.data_resposta = demand.data_resposta
                }

                return atualDemand
            })

            setDemands([...demandaAtualizada])

            toast.success("Resposta marcada com sucesso!")

            return demand

        } catch {
            toast.error("Erro ao marcar resposta")
        }
    }

    async function addUserToDemand(demandId: string, userId: string): Promise<Demand | undefined> {

        try {
            const responseDemand = await api.post(`/demands/add-user/${demandId}`, {
                userId
            })

            const demand = responseDemand.data

            const demandaAtualizada = demands.map((atualDemand) => {
                if (atualDemand.id == demand.id) {
                    atualDemand.users = demand.users
                }

                return atualDemand
            })

            setDemands([...demandaAtualizada])

            toast.success("Usuário adicionado com sucesso!")

            return demand

        } catch {
            toast.error("Erro ao adicionar usuário a demanda")
        }

    }

    async function seenDemand(userId: string, demandId: string): Promise<Demand | undefined> {

        try {
            const responseDemand = await api.put(`/demands/seen/${demandId}`, {
                userId,
                seen_date: new Date().toISOString()
            })

            const demand = responseDemand.data

            const demandaAtualizada = demands.map((atualDemand) => {
                if (atualDemand.id == demand.id) {
                    atualDemand.seen_users = demand.seen_users
                }

                return atualDemand
            })

            setDemands([...demandaAtualizada])

            return demand

        } catch {
            toast.error("Erro ao visualizar a demanda")
        }

    }

    return (
        <DemandsContext.Provider value={{ demands, handleAddAnotationToDemand, handleCheckResponseToDemand, addUserToDemand, handleCreateNewDemand, seenDemand }}>
            {children}
        </DemandsContext.Provider>
    )
}

export const useDemands = () => {
    const context = useContext(DemandsContext);
    return context;
}