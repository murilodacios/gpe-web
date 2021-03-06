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
    removeTask(id: string): Promise<void>;
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

    }, [user])

    async function handleCreateNewTask(description: string): Promise<Task | undefined> {

        try {

            const response = await api.post(`/tasks/${user?.id}`, {
                description
            })

            const taskResponse = response.data

            setTasks([taskResponse, ...tasks])

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

            setTasks([...updatedTask])

        } catch {
            toast.error("N??o foi poss??vel marcar a tarefa como conclu??da.")
        }
    }

    async function removeTask(id: string): Promise<void> {
        try {
            await api.delete(`/tasks/delete/${id}`)

            const updatedTasks = tasks.filter(task => task.id !== id) 
            
            setTasks([...updatedTasks])
        } catch {
            toast.error("N??o foi poss??vel deletar a tarefa")
        }
    }


    return (
        <TasksContext.Provider value={{ tasks, handleCreateNewTask, checkTask, removeTask }}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => {
    const context = useContext(TasksContext);
    return context;
}