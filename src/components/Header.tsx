import {
    Avatar, Box, Center, Divider, HStack, Stack, Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Link
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuthenticate } from "../hooks/AuthContext";

interface HeaderProps {
    title: string;
    description: string;
}

export function Header({ title, description }: HeaderProps) {

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
            <HStack justify="space-between" w="100%" borderRight="0.5px solid #eee" p="6" spacing="0.5" borderBottom="0.5px solid #eee">
                <Stack>
                    <Text fontSize={{base: "14",md:"20"}} fontWeight="bold">{title}</Text>
                    <Text fontSize={{base: "12",md:"16"}} color="gray.500">{description}</Text>
                </Stack>

                <HStack align="flex-start" spacing="4">

                    <HStack align="flex-start" spacing="4" d={{base: "none", md: "flex"}}>
                        <Box>
                            <Text fontWeight="bold" fontSize="sm">{user?.name}</Text>
                            <Text fontSize="xs">{user?.level === 0 ? "Usuário padrão" : "Administrador geral"}</Text>
                        </Box>
                        <Center height='40px'>
                            <Divider orientation='vertical' />
                        </Center>

                    </HStack>



                    <Menu>
                        <MenuButton>
                            <Avatar name={user?.name} size="sm" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={handleSignOut}><Link href="/">Painel</Link></MenuItem>
                            <MenuItem onClick={handleSignOut}><Text>Sair</Text></MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </HStack>
        </>
    )
}

