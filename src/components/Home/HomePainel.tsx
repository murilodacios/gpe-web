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
            <Stack w="100%" height="100vh" px="6">
                {/* <Stack spacing="0.5" align="center">
                        <Text fontSize="sm">{new Date().toLocaleDateString("pt-BR", { weekday: 'long' }).toLocaleUpperCase()} - {new Date().toLocaleDateString()}</Text>
                        <Text fontSize="2xl">Bom trabalho, {user?.name.split(" ")[0]}.</Text>
                    </Stack> */}

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">

                    <Stack p="6" border="0.5px solid #eee" borderRadius="5px" h="100%" align="center" justify="center">
                    
                        <Stack spacing="0.5" align="center">
                            <Text fontSize="sm">{new Date().toLocaleDateString("pt-BR", { weekday: 'long' }).toLocaleUpperCase()} - {new Date().toLocaleDateString()}</Text>
                            <Text fontSize="2xl">Bom trabalho, {user?.name.split(" ")[0]}.</Text>
                        </Stack>
                    </Stack>

                    <Stack p="6" border="0.5px solid #eee" borderRadius="5px" h="100%">
                        <HStack fontSize="14">
                            <Icon as={RiEye2Line} />
                            <Text>Controle público e PGM</Text>
                        </HStack>
                        <HStack>
                            <Text fontSize="3xl" fontWeight="bold">{demands.length}</Text>
                            <Text>Demandas  </Text>
                        </HStack>

                        {demands.some(demand => demand.status !== "Respondido") ?
                            <Stack py="2">
                                <HStack color="gray.500">
                                    <Icon as={RiErrorWarningLine} fontSize="18" />
                                    <Text fontSize="sm">{demands.filter(demand => demand.status === null).length} demanda(s) sem resposta</Text>
                                </HStack>
                            </Stack>
                            :
                            ""
                        }

                        <Stack direction={{ base: "column", md: "row" }}>

                            {user && user.level === 1 ?
                                <Link href="/demandas/create">
                                    <a>
                                        <Button w="100%" size="sm" colorScheme="blue">
                                            <HStack spacing="2">
                                                <Icon as={RiAddLine} />
                                                <Text fontWeight="normal">Adicionar demanda</Text>
                                            </HStack>
                                        </Button>
                                    </a>
                                </Link>

                                :

                                ""
                            }

                            <Link href="/demandas">
                                <a>
                                    <Button w="100%" size="sm" bg="blue.50">
                                        <HStack spacing="2">
                                            <Icon as={RiEye2Line} />
                                            <Text fontWeight="normal">Ver demandas</Text>
                                        </HStack>
                                    </Button>
                                </a>
                            </Link>
                        </Stack>
                    </Stack>



                    <Stack p="6" border="0.5px solid #eee" borderRadius="5px" spacing="4" justify="space-between" h="100%">
                        <Stack>
                            <HStack>
                                <Icon as={RiListUnordered} />
                                <Text>Minhas tarefas</Text>
                            </HStack>
                            <Stack>
                                {tasks.slice(0, 3).map((task) => (
                                    <HStack
                                        key={task.id}
                                        p="2"
                                        border="0.5px solid #eee"
                                        borderRadius="5px"
                                        justify="space-between"
                                        textDecoration={task.completed ? "line-through" : "none"}
                                        color={task.completed ? "gray.400" : "gray.700"}
                                    >
                                        <Text fontSize="sm">{task.description}</Text>
                                        <Text fontSize="sm">{task.completed ? "Completa" : "Incompleta"}</Text>
                                    </HStack>
                                ))}
                            </Stack>
                        </Stack>
                        <HStack>
                            <Text>Você tem {tasks.length} tarefa(s) na sua lista diária.</Text>
                        </HStack>
                    </Stack>


                    <Stack p="6" border="0.5px solid #eee" borderRadius="5px" h="100%">
                        <HStack fontSize="14">
                            <Icon as={RiUserLine} />
                            <Text>Sua equipe</Text>
                        </HStack>

                        <HStack spacing="0.2" wrap="wrap">
                            {usersList.length > 0 ? usersList.map((users) => (
                                <Tooltip key={users.id} label={users.name}>
                                    <Avatar border="1px solid #fff" name={users.name} size="xs" key={users.name} />
                                </Tooltip>
                            )) : <Text fontSize="xs" color="gray.500">Nenhuma pessoa na equipe</Text>}
                        </HStack>
                    </Stack>

                </SimpleGrid>

            </Stack>

        </>
    )
}

