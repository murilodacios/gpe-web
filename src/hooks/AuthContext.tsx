import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";

type User = {
    email: string;
    level: number;
    name: string;
    id: string;
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): Promise<void>;
    isAuthenticated: boolean;
    user: User | undefined;
    loadingLogin: boolean;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>()

    const [loadingLogin, setLoadingLogin] = useState(false)

    const isAuthenticated = !!user

    useEffect(() => {

        const { 'dashtwo:token': token, 'dashtwo:user': userEmail } = parseCookies()

        if (token) {

            try {

                //@ts-ignore
                api.defaults.headers.Authorization = `Bearer ${token}`;
                api.get(`/users/me/${userEmail}`).then(response => {

                    const { email, name, level, id } = response.data

                    setUser({ email, name, level, id })

                    setLoadingLogin(false)

                })


            } catch (err) {
                console.log(err)
            }

        }

    }, [])

    async function signOut(): Promise<void> {
        destroyCookie(undefined, "dashtwo:token");
        destroyCookie(undefined, "dashtwo:user");
        Router.push('/')
    }

    async function signIn({ email, password }: SignInCredentials) {

        setLoadingLogin(true)

        try {

            const session = await api.post('/sessions', {
                email,
                password
            })

            const { token, user } = session.data

            setCookie(undefined, 'dashtwo:token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })

            setCookie(undefined, 'dashtwo:user', email, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })

            //@ts-ignore
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            setUser(user)

            window.location.href = `${window.location.href}/painel`

        } catch (err) {

            toast.error('E-mail ou senha incorretos', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setLoadingLogin(false)

        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user, signOut, loadingLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthenticate = () => {
    const context = useContext(AuthContext);
    return context;
}