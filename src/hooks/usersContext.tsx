import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { useAuthenticate } from './AuthContext'

interface User {
    id: string;
    email: string;
    name: string;
    level: number;
}

type UsersProviderProps = {
    children: ReactNode
}

type UsersContextData = {
    usersList: User[]
    handleCreateNewUser(data: User): Promise<User | undefined>;
}

export const UsersContext = createContext({} as UsersContextData)

export function UsersProvider({ children }: UsersProviderProps) {

    const [usersList, setUsersList] = useState<User[]>([])

    const cookies = parseCookies()

    useEffect(() => {

        if (cookies['dashtwo:token']) {
            api.get("/users").then((response) => {
                const usersData = response.data

                setUsersList(usersData)
            })
        }

    }, [])

    async function handleCreateNewUser(data: User): Promise<User | undefined> {

        try {
            const response = await api.post("/users", data)

            const user = response.data

            setUsersList([user, ...usersList])

            toast.success("Usuários criado com sucesso")

            Router.push(`/usuarios`)

            return user
        } catch {
            toast.error("Falha ao criar usuário ou usuário já existe!")
        }



    }


    return (
        <UsersContext.Provider value={{ usersList, handleCreateNewUser }}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsers = () => {
    const context = useContext(UsersContext);
    return context;
}