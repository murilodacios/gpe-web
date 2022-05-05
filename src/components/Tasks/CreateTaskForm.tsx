import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    Input,
    Stack,
    Text,

} from "@chakra-ui/react";
import Link from "next/link";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";

import { useTasks } from "../../hooks/tasksContext";
import { RiAddLine } from "react-icons/ri";


export function CreateTaskForm() {

    const { handleCreateNewTask } = useTasks()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        await handleCreateNewTask(data.description)
    }

    return (
        <>
            <HStack as="form" onSubmit={handleSubmit(onSubmit)} align="center" justify="center">

                <FormControl>
                    <Input variant="flushed" id='description' type='text' {...register("description")} required placeholder="O que deseja fazer hoje?" fontSize="sm"/>
                </FormControl>

                <Button colorScheme="blue" type="submit" px="8">
                    <HStack spacing="2">
                        <Icon as={RiAddLine} />
                        <Text fontWeight="normal">Adicionar tarefa</Text>
                    </HStack>
                </Button>

            </HStack>

        </>
    )
}

