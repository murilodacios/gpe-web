import { Avatar, Box, Button, HStack, Icon, SimpleGrid, Stack, Text, Tooltip } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { RiAddLine, RiErrorWarningLine, RiEye2Line, RiListUnordered, RiTaskLine, RiUserLine } from "react-icons/ri";
import { useDemands } from "../../hooks/DemandsContext";
import { useTasks } from "../../hooks/tasksContext";
import { useUsers } from "../../hooks/usersContext";

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
})


type User = {
    email: string;
    level: number;
    name: string;
    id: string;
}

interface HomePainelProps {
    user: User | undefined;
}

export function HomePainel({ user }: HomePainelProps) {

    const { demands } = useDemands()
    const { usersList } = useUsers()
    const { tasks } = useTasks()

   
    return (
        <>
            <Stack w="100%" height="100vh" p="6">
                <Stack spacing="0.5" align="center">
                    <Text fontSize="sm">{new Date().toLocaleDateString("pt-BR", { weekday: 'long' }).toLocaleUpperCase()} - {new Date().toLocaleDateString()}</Text>
                    <Text fontSize="2xl">Bom trabalho, {user?.name.split(" ")[0]}.</Text>
                </Stack>

                <SimpleGrid columns={{ base: 1, md: 2 }} pt="8" gap="2">

                    <Box border="0.5px solid #eee">

                        {demands.some(demand => demand.status !== "Respondido") ?

                            <Stack p="2" bg="red.50">
                                <HStack>
                                    <Icon as={RiErrorWarningLine} fontSize="18" color="red.800" />
                                    <Text color="red.700" fontSize="sm">Existem {demands.filter(demand => demand.status === null).length} demanda(s) sem resposta</Text>
                                </HStack>
                            </Stack>

                            :

                            ""
                        }

                        <Stack p="6">
                            <HStack>
                                <Icon as={RiEye2Line} />
                                <Text>Controle público e PGM</Text>
                            </HStack>
                            <HStack>
                                <Text fontSize="3xl" fontWeight="bold">{demands.length}</Text>
                                <Text>Demandas criadas</Text>
                            </HStack>


                            <Stack direction={{ base: "column", md: "row" }}>

                                {user && user.level === 1 ?
                                    <Link href="/demandas/create">
                                        <a>
                                            <Button variant="outline" w="100%">
                                                <HStack spacing="2">
                                                    <Icon as={RiAddLine} />
                                                    <Text>Criar nova demanda</Text>
                                                </HStack>
                                            </Button>
                                        </a>
                                    </Link>

                                    :

                                    ""
                                }

                                <Link href="/demandas">
                                    <a>
                                        <Button variant="outline" w="100%">
                                            <HStack spacing="2">
                                                <Icon as={RiEye2Line} />
                                                <Text>Ver demandas</Text>
                                            </HStack>
                                        </Button>
                                    </a>
                                </Link>
                            </Stack>
                        </Stack>
                    </Box>

                    <Stack border="0.5px solid #eee" p="6">
                        <HStack>
                            <Icon as={RiUserLine} />
                            <Text>Equipe ativa</Text>
                        </HStack>
                        <HStack>
                            <Text fontSize="3xl" fontWeight="bold">{usersList.length}</Text>
                            <Text>Usuários</Text>
                        </HStack>


                        <HStack spacing="-1" wrap="wrap">
                            {usersList.length > 0 ? usersList.map((users) => (
                                <Tooltip key={users.id} label={users.name}>
                                    <Avatar border="1px solid #fff" name={users.name} size="sm" key={users.name} />
                                </Tooltip>
                            )) : <Text fontSize="xs" color="gray.500">Sem pessoas na demanda.</Text>}
                        </HStack>

                    </Stack>


                    <Stack border="0.5px solid #eee" p="6" mb="6">

                        <HStack>
                            <Icon as={RiListUnordered} />
                            <Text>Minhas tarefas</Text>
                        </HStack>
                        <HStack>
                            <Text>Você tem {tasks.length} tarefa(s) na sua lista diária.
                            </Text>
                        </HStack>

                       

                    </Stack>

                </SimpleGrid>

            </Stack>

        </>
    )
}

