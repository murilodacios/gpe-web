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
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiAddLine, RiCheckLine, RiEyeLine, RiSearchLine } from "react-icons/ri";
import { useAuthenticate } from "../../hooks/AuthContext";
import { useUsers } from "../../hooks/usersContext";
import { convertISOtoDate } from "../../utils/convertISOtoDate";
import { isPastedDate } from "../../utils/isPastedDate";
import { isTodayDate } from "../../utils/isTodayDate";


export function TableUsers() {

    const { user } = useAuthenticate()
    const { usersList } = useUsers()

    return (
        <>
            <Stack w="100%" p="6" spacing="3">
                <Text fontSize="16" color="gray.600">Controle de usuários</Text>

                {user && user.level === 1 ?
                    <HStack py="4">
                        <Link href="/usuarios/create">
                            <a>
                                <Button colorScheme="blue" variant="outline">
                                    <HStack spacing="2">
                                        <Icon as={RiAddLine} />
                                        <Text>Criar novo usuário</Text>
                                    </HStack>
                                </Button>
                            </a>
                        </Link>
                    </HStack>

                    :

                    ""
                }


                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>Email</Th>
                            <Th>Nível</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {usersList.map((user) => (
                            <Tr key={user.id} fontSize="sm" color={user.level === 1 ? "yellow.600" : ""}>
                                <Td>{user.name}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.level === 1 ? "Administrador" : "Padrão"}</Td>
                            </Tr>
                        ))
                        }
                    </Tbody>
                </Table>

            </Stack>
        </>
    )
}

