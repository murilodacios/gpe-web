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
    Tr,
    Th,
    Td,
    Tag,
    Input,
    Button,
    Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiAddLine, RiEyeLine } from "react-icons/ri";
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

    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = Math.ceil(demands.length / itensPerPage);

    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;

    const currentItens = demands.slice(startIndex, endIndex);

    async function handleSeenAndPushToDemand(demandId: string, userId: string) {
        await seenDemand(userId, demandId)
        Router.push(`/demandas/${demandId}`)
    }

    return (
        <>
            <Stack w="100%" p="6" spacing="3">

                <HStack d="flex" as="form" onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))} >
                    <Input variant="flushed" type='text' placeholder='Busca por assunto' {...register("searchdemand")} />
                </HStack>

                {user && user.level > 0 ?
                    <HStack py="4">
                        <Link href="/demandas/create">
                            <a>
                                <Button w="100%" size="sm" colorScheme="blue">
                                    <HStack spacing="2">
                                        <Icon as={RiAddLine} />
                                        <Text fontWeight="normal">Criar demanda</Text>
                                    </HStack>
                                </Button>
                            </a>
                        </Link>
                    </HStack>

                    :
                    ""
                }

                <Stack d={{ base: "flex", md: "none" }}>
                    {!watch("searchdemand") ? currentItens.map((demand) => (
                        <Stack border="1px solid #eee" p="4" key={demand.id}>
                            <Text><Text fontWeight="bold">{demand.tipo} {demand.numero}</Text>{demand.assunto}</Text>
                            <Text>{isTodayDate(demand.prazo_resposta) && demand.status !== "Respondido" ? <Tag colorScheme="red">Vence hoje</Tag> : demand?.status === null ? isPastedDate(demand.prazo_resposta) ? <Tag colorScheme="orange">Atrasado</Tag> : "Sem status" : <Tag colorScheme="green">{demand?.status}</Tag>}</Text>
                            <Text fontSize="sm">O prazo para responder esta demanda é {convertISOtoDate(demand.prazo_resposta)}</Text>
                            <Text color="gray.500">Pessoas na demanda</Text>
                            <Box>
                                {demand.users.length > 0 ? demand.users.map((demandUsers) => (
                                    <Tooltip key={demandUsers.user.name} label={demandUsers.user.name}>
                                        <Avatar mr="-3" border="1px solid #fff" name={demandUsers.user.name} size="xs" key={demandUsers.user.name} />
                                    </Tooltip>
                                )) : <Text fontSize="xs" color="gray.500">Sem pessoas na demanda.</Text>}
                            </Box>
                            <Divider />
                            <HStack color="gray.500" cursor="pointer" onClick={() => handleSeenAndPushToDemand(demand.id, user!.id)}>
                                <Icon as={RiEyeLine} />
                                <Text>Abrir demanda</Text>
                            </HStack>
                        </Stack>
                    )) :

                        demands.filter(demand => demand.assunto.toLowerCase().includes(watch("searchdemand").toLowerCase())).map((demand) => (
                            <Stack border="1px solid #eee" p="4" key={demand.id}>
                                <Text><Text fontWeight="bold">{demand.tipo} {demand.numero}</Text>{demand.assunto}</Text>
                                <Text>{isTodayDate(demand.prazo_resposta) && demand.status !== "Respondido" ? <Tag colorScheme="red">Vence hoje</Tag> : demand?.status === null ? isPastedDate(demand.prazo_resposta) ? <Tag colorScheme="orange">Atrasado</Tag> : "Sem status" : <Tag colorScheme="green">{demand?.status}</Tag>}</Text>
                                <Text fontSize="sm">O prazo para responder esta demanda é {convertISOtoDate(demand.prazo_resposta)}</Text>
                                <Text color="gray.500">Pessoas na demanda</Text>
                                <Box>
                                    {demand.users.length > 0 ? demand.users.map((demandUsers) => (
                                        <Tooltip key={demandUsers.user.name} label={demandUsers.user.name}>
                                            <Avatar mr="-3" border="1px solid #fff" name={demandUsers.user.name} size="xs" key={demandUsers.user.name} />
                                        </Tooltip>
                                    )) : <Text fontSize="xs" color="gray.500">Sem pessoas na demanda.</Text>}
                                </Box>
                                <Divider />
                                <HStack color="gray.500" cursor="pointer" onClick={() => handleSeenAndPushToDemand(demand.id, user!.id)}>
                                    <Icon as={RiEyeLine} />
                                    <Text>Abrir demanda</Text>
                                </HStack>
                            </Stack>
                        ))

                    }
                </Stack>

                <Table variant='simple' d={{ base: "none", md: "table" }} w="100%">
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

                        {!watch("searchdemand") ? currentItens.map((demand) => (
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
                                    <Box cursor="pointer" onClick={() => handleSeenAndPushToDemand(demand.id, user!.id)}>
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
                                        <Box cursor="pointer" onClick={() => handleSeenAndPushToDemand(demand.id, user!.id)}>
                                            <Icon as={RiEyeLine} />
                                        </Box>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>

                <HStack align="center" justify="center">
                    {Array.from(Array(pages), (item, index) => {
                        return <Button bg={index === currentPage ? "blue.200" : ""} size="xs" value={index} onClick={(e) => setCurrentPage(Number(index))}>{index + 1}</Button>
                    })}
                </HStack>

            </Stack>

        </>
    )
}

