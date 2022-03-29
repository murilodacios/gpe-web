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
import { useDemands } from "../../hooks/DemandsContext";
import { convertISOtoDate } from "../../utils/convertISOtoDate";
import { isPastedDate } from "../../utils/isPastedDate";
import { isTodayDate } from "../../utils/isTodayDate";

import Router from 'next/router'

export function TableDemands() {

    const { demands, seenDemand } = useDemands()
    const { user } = useAuthenticate()

    const { register, handleSubmit, watch } = useForm();
    const [data, setData] = useState("")

    async function handleSeenAndPushToDemand(demandId: string, userId: string) {
        await seenDemand(userId, demandId)
        Router.push(`/demandas/${demandId}`)
    }

    return (
        <>
            <Stack w="100%" p="6" spacing="3">
                <Text fontSize="16" color="gray.600">Controle Público e PGM - Todas as demandas</Text>

                {user && user.level === 1 ?
                    <HStack py="4">
                        <Link href="/demandas/create">
                            <a>
                                <Button colorScheme="blue" variant="outline">
                                    <HStack spacing="2">
                                        <Icon as={RiAddLine} />
                                        <Text>Criar nova demanda</Text>
                                    </HStack>
                                </Button>
                            </a>
                        </Link>
                    </HStack>

                    :

                    ""
                }



                <HStack d="flex" as="form" onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))} >
                    <Input type='text' placeholder='Busca por assunto' {...register("searchdemand")} />
                </HStack>

                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Assunto</Th>
                            <Th>Status</Th>
                            <Th>Emitido</Th>
                            <Th>Prazo</Th>
                            <Th>Pessoas</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {!watch("searchdemand") ? demands.map((demand) => (
                            <Tr key={demand.id} fontSize="sm">
                                <Td>{demand.tipo} {demand.numero} - {demand.assunto}</Td>
                                <Td>{isTodayDate(demand.prazo_resposta) && demand.status !== "Respondido" ? <Tag colorScheme="red">Vence hoje</Tag> : demand?.status === null ? isPastedDate(demand.prazo_resposta) ? <Tag colorScheme="orange">Atrasado</Tag> : "Sem status" : <Tag colorScheme="green">{demand?.status}</Tag>}</Td>
                                <Td>
                                    {convertISOtoDate(demand.data_emissao)}
                                </Td>
                                <Td>{convertISOtoDate(demand.prazo_resposta)}</Td>
                                <Td>
                                    {demand.users.length > 0 ? demand.users.map((demandUsers) => (
                                        <Tooltip key={demandUsers.user.name} label={demandUsers.user.name}>
                                            <Avatar mr="-3" border="1px solid #fff" name={demandUsers.user.name} size="xs" key={demandUsers.user.name} />
                                        </Tooltip>
                                    )) : <Text fontSize="xs" color="gray.500">Sem pessoas na demanda.</Text>}
                                </Td>
                                <Td>
                                    <Box cursor="pointer" onClick={() => handleSeenAndPushToDemand(demand.id, user.id)}>
                                        <Icon as={RiEyeLine} />
                                    </Box>
                                </Td>
                            </Tr>
                        ))
                            :
                            demands.filter(demand => demand.assunto.toLowerCase().includes(watch("searchdemand").toLowerCase())).map((demand) => (
                                <Tr key={demand.id} fontSize="sm">
                                    <Td>{demand.tipo} {demand.numero} - {demand.assunto}</Td>
                                    <Td>{isTodayDate(demand.prazo_resposta) && demand.status !== "Respondido" ? <Tag colorScheme="red">Vence hoje</Tag> : demand?.status === null ? isPastedDate(demand.prazo_resposta) ? <Tag colorScheme="orange">Atrasado</Tag> : "Sem status" : <Tag colorScheme="green">{demand?.status}</Tag>}</Td>
                                    <Td>
                                        <Tooltip label={demand.user.name}>
                                            <Avatar name={demand.user.name} size="xs" />
                                        </Tooltip>
                                    </Td>
                                    <Td>{convertISOtoDate(demand.prazo_resposta)}</Td>
                                    <Td>
                                        {demand.users.length > 0 ? demand.users.map((demandUsers) => (
                                            <Tooltip key={demandUsers.user.name} label={demandUsers.user.name}>
                                                <Avatar mr="-3" border="1px solid #fff" name={demandUsers.user.name} size="xs" key={demandUsers.user.name} />
                                            </Tooltip>
                                        )) : <Text fontSize="xs" color="gray.500">Sem pessoas na demanda.</Text>}
                                    </Td>
                                    <Td>
                                        <Box cursor="pointer" onClick={() => handleSeenAndPushToDemand(demand.id, user.id)}>
                                            <Icon as={RiEyeLine} />
                                        </Box>
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

