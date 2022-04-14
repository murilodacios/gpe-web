import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { useAuthenticate } from './AuthContext'

interface Task {
    id: string;
    description: string;
    completed: boolean;
    created_at: string;
    userId: string;
}

type TasksProviderProps = {
    children: ReactNode
}

type TasksContextData = {
    tasks: Task[];
    handleCreateNewTask(description: string): Promise<Task | undefined>;
    checkTask(id: string): Promise<void>;
}

export const TasksContext = createContext({} as TasksContextData)

export function TasksProvider({ children }: TasksProviderProps) {

    const [tasks, setTasks] = useState<Task[]>([])

    const { isAuthenticated, user } = useAuthenticate()

    const cookies = parseCookies()

    useEffect(() => {

        if (cookies['dashtwo:token'] && user) {
            api.get(`/tasks/${user?.id}`).then((response) => {
                const tasksData = response.data

                setTasks(tasksData)
            })
        }

    }, [isAuthenticated])

    async function handleCreateNewTask(description: string): Promise<Task | undefined> {

        try {

            const response = await api.post(`/tasks/${user?.id}`, {
                description
            })

            const taskResponse = response.data

            setTasks([taskResponse, ...tasks])

            toast.success("Tarefa criada com sucesso")

            Router.push(`/tarefas`)

            return taskResponse


        } catch (err) {
            console.log(err)
            toast.error("Falha ao criar nova tarefa")
        }

    }

    async function checkTask(id: string): Promise<void> {
        try {
            const response = await api.put(`/tasks/check/${id}`)

            const taskResponse = response.data

            const updatedTask = tasks.map((atualTask) => {
                if (atualTask.id == taskResponse.id) {
                    atualTask.completed = taskResponse.completed
                }

                return atualTask
            })

            toast.success("Ação realizada com sucesso")

            setTasks([...updatedTask])


        } catch {
            toast.error("Não foi possível marcar a tarefa como concluída.")
        }
    }




    return (
        <TasksContext.Provider value={{ tasks, handleCreateNewTask, checkTask }}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => {
    const context = useContext(TasksContext);
    return context;
}