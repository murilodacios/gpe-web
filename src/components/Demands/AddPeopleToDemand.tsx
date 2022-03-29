import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Avatar,
    HStack,
    Text,
} from '@chakra-ui/react'
import { RiArrowDownLine } from 'react-icons/ri';
import { useDemands } from '../../hooks/DemandsContext';
import { useUsers } from '../../hooks/usersContext';

type Users = {
    name: string;
}

interface AddPeopleProps {
    demandId: string;
}

export function AddPeopleToDemand({ demandId }: AddPeopleProps) {

    const { usersList } = useUsers()
    const { addUserToDemand } = useDemands()

    async function handleAddPeopleToDemand(userId: string) {
        await addUserToDemand(demandId, userId)
    }

    return (
        <>
            <Menu>
                <MenuButton as={Button} rightIcon={<RiArrowDownLine />}>
                    Adicionar pessoas
                </MenuButton>
                <MenuList>
                    {usersList && usersList.map((user) => (
                        <MenuItem key={user.id} onClick={() => handleAddPeopleToDemand(user.id)}>
                            <HStack>
                                <Avatar name={user.name} size="xs" />
                                <Text>{user.name}</Text>
                            </HStack>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    )
}

