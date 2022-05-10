import { HStack, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { RiCheckboxLine, RiEye2Line, RiHome2Line, RiListCheck, RiMoneyDollarCircleLine, RiPencilLine, RiUserLine } from 'react-icons/ri'
import { ActiveLink } from "./ActiveLink";

type User = {
    email: string;
    level: number;
    name: string;
    id: string;
}

interface SidebarProps {
    user: User | undefined;
}

export function Sidebar({ user }: SidebarProps) {

    return (
        <>
            <Stack w="100%" borderRight="0.5px solid #eee" height="100%" d={{ base: "none", md: "flex" }}>
                <Stack spacing="4" px="4" py="8" w="100%">
                    <Image src="/logo.png" w="60px" borderRadius="5px" />
                </Stack>

                <Stack align="flex-start" spacing="2" mt="16">

                    <HStack px="4" py="2" spacing="6" w="100%">
                        <Text fontSize="12" fontWeight="bold" color="gray.500">
                            PAINEL
                        </Text>
                    </HStack>

                    <HStack px="4" py="2" spacing="6" _hover={{ bg: "gray.50" }} w="100%">

                        <Text fontSize="17">
                            <ActiveLink href="/painel">
                                <HStack>
                                    <Icon as={RiHome2Line} fontSize="20" />
                                    <Text fontSize="14">Página Inicial</Text>
                                </HStack>
                            </ActiveLink>
                        </Text>
                    </HStack>

                    <HStack px="4" py="2" spacing="6" _hover={{ bg: "gray.50" }} w="100%">
                        <Text fontSize="17">
                            <ActiveLink href="/tarefas">
                                <HStack>
                                    <Icon as={RiCheckboxLine} fontSize="20" />
                                    <Text fontSize="14">Minhas tarefas</Text>
                                </HStack>
                            </ActiveLink>
                        </Text>
                    </HStack>

                    <HStack px="4" py="2" spacing="6" w="100%">
                        <Text fontSize="12" fontWeight="bold" color="gray.500">
                            ÁREA DE TRABALHO
                        </Text>
                    </HStack>

                    <HStack px="4" py="2" spacing="6" _hover={{ bg: "gray.50" }} w="100%">
                        <Text fontSize="17">
                            <ActiveLink href="/demandas">
                                <HStack>
                                    <Icon as={RiEye2Line} fontSize="20" />
                                    <Text fontSize="14">Controle público</Text>
                                </HStack>
                            </ActiveLink>
                        </Text>
                    </HStack>

                    {Number(user?.level) > 0 ?

                        <HStack px="4" py="2" spacing="6" _hover={{ bg: "gray.50" }} w="100%">
                            <Text fontSize="17">
                                <ActiveLink href="/pagamentos">
                                    <HStack>
                                        <Icon as={RiMoneyDollarCircleLine} fontSize="20" />
                                        <Text fontSize="14">Pagamentos</Text>
                                    </HStack>
                                </ActiveLink>
                            </Text>
                        </HStack>
                        :

                        ""
                    }

                    {user?.level === 2 ?

                        <>
                            <HStack px="4" py="2" spacing="6" w="100%">
                                <Text fontSize="12" fontWeight="bold" color="gray.500">
                                    ADMINISTRAÇÃO
                                </Text>
                            </HStack>

                            <HStack px="4" py="2" spacing="6" _hover={{ bg: "gray.50" }} w="100%">
                                <Text fontSize="17">
                                    <ActiveLink href="/usuarios">
                                        <HStack>
                                            <Icon as={RiUserLine} fontSize="20" />
                                            <Text fontSize="14">Usuários</Text>
                                        </HStack>
                                    </ActiveLink>
                                </Text>
                            </HStack>
                        </>

                        :

                        ""
                    }
                </Stack>
            </Stack>

        </>
    )
}

