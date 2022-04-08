import { Avatar, Box, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import Router from "next/router";
import { RiEye2Line, RiHome2Line, RiUserLine } from 'react-icons/ri'
import { toast } from "react-toastify";
import { useAuthenticate } from "../hooks/AuthContext";
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
            <Stack w="100%" borderRight="0.5px solid #eee" height="100%" d={{base: "none", md: "flex"}}>
                <Stack spacing="4" p="8" align="center" bg="blue.500" w="100%" color="white">
                   <Text fontWeight="medium">Gerenciador Público Eletrônico</Text>
                </Stack>

                <Stack align="flex-start" spacing="2" py="6">
                    <HStack px="6" py="2" spacing="6" _hover={{bg: "gray.50"}} w="100%">

                        <Text fontSize="17">
                            <ActiveLink href="/painel">
                                <HStack>
                                    <Icon as={RiHome2Line} fontSize="20" />
                                    <Text>Pagina Inicial</Text>
                                </HStack>
                            </ActiveLink>
                        </Text>
                    </HStack>

                    <HStack px="6" py="2" spacing="6" _hover={{bg: "gray.50"}} w="100%">
                        <Text fontSize="17">
                            <ActiveLink href="/demandas">
                                <HStack>
                                    <Icon as={RiEye2Line} fontSize="20" />
                                    <Text>Controle público</Text>
                                </HStack>
                            </ActiveLink>
                        </Text>
                    </HStack>

                    <HStack px="6" py="2" spacing="6" _hover={{bg: "gray.50"}} w="100%">
                        <Text fontSize="17">
                            <ActiveLink href="/usuarios">
                                <HStack>
                                    <Icon as={RiUserLine} fontSize="20" />
                                    <Text>Usuários</Text>
                                </HStack>
                            </ActiveLink>
                        </Text>
                    </HStack>
                </Stack>
            </Stack>

        </>
    )
}

