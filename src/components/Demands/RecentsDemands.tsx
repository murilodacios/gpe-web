import { Avatar, Box, HStack, Icon, Stack, Tag, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { RiEyeLine } from "react-icons/ri";
import { useDemands } from "../../hooks/DemandsContext";
import { convertISOtoDate } from "../../utils/convertISOtoDate";
import { isPastedDate } from "../../utils/isPastedDate";
import { isTodayDate } from "../../utils/isTodayDate";

export function RecentsDemands() {

    const { demands } = useDemands()

    return (
        <>
            <Stack w="100%" p="6" spacing="3">
                <Text fontSize="16" color="gray.600">Controle Público e PGM - Demandas recentes</Text>

                {demands.map((demand) => (
                    <Stack key={demand.id} p="6" border="0.8px solid #eee" bg="linear-gradient(122.57deg, #FCFCFC -17.82%, rgba(252, 252, 252, 0) 145.47%);">
                        <HStack justify="space-between">
                            <Text fontSize="16">{demand.tipo} {demand.numero} - {demand.assunto}</Text>
                            <Link href={`/demandas/${demand.id}`}>
                                <a>
                                    <Icon as={RiEyeLine} />
                                </a>
                            </Link>
                        </HStack>

                        <HStack spacing="4">
                            <Stack spacing="0.5">
                                <Text fontSize="12" color="gray.500">Setor responsável</Text>
                                <Text fontSize="14">{demand.setores}</Text>
                            </Stack>
                            <Stack spacing="0.5">
                                <Text fontSize="12" color="gray.500">Remetente</Text>
                                <Text fontSize="14">{demand.remetente}</Text>
                            </Stack>
                            <Stack spacing="0.5">
                                <Text fontSize="12" color="gray.500">Orgão origem</Text>
                                <Text fontSize="14">{demand.orgao_origem}</Text>
                            </Stack>
                            <Stack spacing="0.5">
                                <Text fontSize="12" color="gray.500">Criado por</Text>
                                <Tooltip label={demand.user.name}>
                                    <Avatar name={demand.user.name} size="xs" />
                                </Tooltip>
                            </Stack>

                            <Stack spacing="0.5">
                                <Text fontSize="12" color="gray.500">Status</Text>
                                <Text fontSize="14">{isTodayDate(demand.prazo_resposta) && demand.status !== "Respondido" ? <Tag colorScheme="red">Vence hoje</Tag> : demand?.status === null ? isPastedDate(demand.prazo_resposta) ? <Tag colorScheme="orange">Atrasado</Tag> : "Sem status" : <Tag colorScheme="green">{demand?.status}</Tag>}</Text>
                            </Stack>


                        </HStack>

                        <Text fontSize="14" color="gray.500">O prazo para responder esta demanda é até dia {convertISOtoDate(demand.prazo_resposta)}</Text>

                        <Text fontSize="14" color="gray.700">Pessoas nesta demanda</Text>

                        <HStack justify="space-between">
                            <HStack>
                                {demand.users.length > 0 ? demand.users.map((demandUsers) => (
                                    <Tooltip label={demandUsers.user.name}>
                                        <Avatar mr="-1" border="1px solid #fff" name={demandUsers.user.name} size="xs" key={demandUsers.user.name} />
                                    </Tooltip>
                                )) : <Text fontSize="xs" color="gray.500">Sem pessoas na demanda.</Text>}
                            </HStack>

                            <HStack spacing="6">
                                <HStack>
                                    <Text fontSize="xs" color="gray.500">Emitida dia {convertISOtoDate(demand.data_emissao)}</Text>
                                </HStack>

                                <HStack>
                                    <Text fontSize="xs" color="gray.500">Recebido dia {convertISOtoDate(demand.data_recebimento)}</Text>
                                </HStack>
                            </HStack>
                        </HStack>
                    </Stack>
                ))}
            </Stack>
        </>
    )
}

