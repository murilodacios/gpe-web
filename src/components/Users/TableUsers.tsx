import {
    HStack,
    Icon,
    Stack,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";
import { useAuthenticate } from "../../hooks/AuthContext";
import { useUsers } from "../../hooks/usersContext";

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
                            <Tr key={user.id} fontSize="sm" color={user.level > 0 ? "yellow.600" : ""}>
                                <Td>{user.name}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.level > 0 ? "Administrador" : "Padrão"}</Td>
                            </Tr>
                        ))
                        }
                    </Tbody>
                </Table>

            </Stack>
        </>
    )
}

