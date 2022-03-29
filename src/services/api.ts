import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies } from "nookies";

const cookies = parseCookies()

export const api = axios.create({
    baseURL: "http://localhost:3333/",
    headers: {
        Authorization: `Bearer ${cookies['dashtwo:token']}`
    }
})

api.interceptors.response.use(response => {
    return response
})