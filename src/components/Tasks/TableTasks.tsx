import {
    Avatar,
    Box,
    HStack,
    Icon,
    Stack,
    Text,
    Tooltip,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Tag,
    Input,
    InputGroup,
    InputLeftAddon,
    Button,
    Checkbox,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiAddLine, RiCheckLine, RiEyeLine, RiSearchLine } from "react-icons/ri";
import { useAuthenticate } from "../../hooks/AuthContext";
import { useTasks } from "../../hooks/tasksContext";
import { useUsers } from "../../hooks/usersContext";
import { convertISOtoDate } from "../../utils/convertISOtoDate";
import { isPastedDate } from "../../utils/isPastedDate";
import { isTodayDate } from "../../utils/isTodayDate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function TableTasks() {

    const { tasks, checkTask } = useTasks()

    async function handleCheckTask(id: string) {
        await checkTask(id)
    }

    return (
        <>
            <ToastContainer />
            <Stack w="100%" p="6" spacing="3">
                <Text fontSize="16" color="gray.600">Suas tarefas do dia</Text>

                <HStack py="4">
                    <Link href="/tarefas/create">
                        <a>
                            <Button colorScheme="blue" variant="outline">
                                <HStack spacing="2">
                                    <Icon as={RiAddLine} />
                                    <Text>Adicionar tarefa</Text>
                                </HStack>
                            </Button>
                        </a>
                    </Link>
                </HStack>


                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Descrição</Th>
                            <Th>Criado em</Th>
                            <Th>Ação</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {tasks.map((task) => (
                            <Tr key={task.id} fontSize="sm" textDecoration={task.completed ? "line-through" : "none"} color={task.completed ? "gray.400" : "gray.700"}>
                                <Td>{task.description}</Td>
                                <Td>{convertISOtoDate(task.created_at)}</Td>
                                <Td>
                                    <Checkbox colorScheme='blue' defaultIsChecked={task.completed ? true : false} onChange={() => handleCheckTask(task.id)}>
                                        Concluir
                                    </Checkbox>
                                </Td>
                            </Tr>
                        ))
                        }
                    </Tbody>
                </Table>

            </Stack>
        </>
    )
}

