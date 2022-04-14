import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Stack,
    Text,

} from "@chakra-ui/react";
import Link from "next/link";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";

import { useTasks } from "../../hooks/tasksContext";


export function CreateTaskForm() {

    const { handleCreateNewTask } = useTasks()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        await handleCreateNewTask(data.description)
    }

    return (
        <>
            <ToastContainer />
            <Stack w="100%" p="6" spacing="3" h="100vh">
                <Text fontSize="16" color="gray.600">Criar nova tarefa - <Link href="/tarefas"><a>Voltar à listagem</a></Link></Text>

        
                <Stack as="form" pt="2" onSubmit={handleSubmit(onSubmit)}>
                    <HStack align="center" py="4">
                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='description'>Descrição</FormLabel>
                            <Input id='description' type='text' {...register("description")} required />
                        </FormControl>
                    </HStack>

                    <HStack py="6">
                        <Button type='submit'>Criar tarefa</Button>
                    </HStack>
                </Stack>


            </Stack>
        </>
    )
}

