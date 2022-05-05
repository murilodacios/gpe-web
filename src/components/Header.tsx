import {
    Avatar, Box, Center, Divider, HStack, Stack, Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Link,
    Flex
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuthenticate } from "../hooks/AuthContext";

export function Header() {

    const { signOut, user } = useAuthenticate()

    async function handleSignOut() {
        try {
            await signOut()
        } catch {
            toast.error("Não foi possível realizar esta ação")
        }
    }

    return (
        <>
            <Stack px="6" py="4">
                <HStack justify="flex-start" w="100%" py="4" spacing="4">
            
                    <Menu>
                        <MenuButton>
                            <Avatar name={user?.name} size="md"/>
                        </MenuButton>
                        <MenuList>
                            <MenuItem><Link href="/">Painel</Link></MenuItem>
                            <MenuItem onClick={handleSignOut}><Text>Sair</Text></MenuItem>
                        </MenuList>
                    </Menu>

                    <HStack align="flex-start" spacing="4">

                        <HStack align="flex-start" spacing="4" d={{ base: "none", md: "flex" }}>
                            <Box>
                                <Text fontWeight="bold" fontSize="sm" color="gray.600">{user?.name}</Text>
                                <Text fontSize="xs" color="gray.500">{user?.level === 0 ? "Usuário padrão" : "Administrador geral"}</Text>
                            </Box>

                        </HStack>

                    </HStack>
                </HStack>
                <Divider />
            </Stack>
        </>
    )
}

