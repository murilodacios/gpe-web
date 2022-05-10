import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

import { Avatar, Box, Button, Grid, HStack, Icon, Stack, Tag, Text, Tooltip } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { AddAnotationToDemandModal } from '../../components/Demands/Modals/AddAnotationToDemandModal'
import { useAuthenticate } from '../../hooks/AuthContext'
import { useDemands } from '../../hooks/DemandsContext'
import Link from 'next/link'
import { RiCheckLine, RiEyeLine } from 'react-icons/ri'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { AddPeopleToDemand } from '../../components/Demands/AddPeopleToDemand'
import { convertISOtoDate } from '../../utils/convertISOtoDate'
import { isTodayDate } from '../../utils/isTodayDate'
import { isPastedDate } from '../../utils/isPastedDate'
import Head from 'next/head'

export default function Demanda() {

    const router = useRouter()
    const { id } = router.query

    const { demands, handleCheckResponseToDemand } = useDemands()

    const { user } = useAuthenticate()

    async function handleCheckResponse(id: string) {
        await handleCheckResponseToDemand(id)
    }

    return (
        <>
            <Head>
                <title>Única demanda - Gerenciador Público Eletrônico</title>
            </Head>
            <ToastContainer />
            <Grid templateColumns={{ base: '1fr', md: '1fr 4fr' }}>
                <Sidebar user={user} />
                <Box>
                    <Header />

                    {demands && demands?.filter(demandArray => demandArray.id === id).map(demand => (
                        <Stack key={demand?.id} p="6">

                            <HStack py="5">
                                <Icon as={RiEyeLine} color="gray.500" />
                                <Text color="gray.600">
                                    <Link href={`/demandas`}>
                                        <a>
                                            <Text>Voltar à lista</Text>
                                        </a>
                                    </Link>
                                </Text>
                            </HStack>

                            <HStack justify="space-between">
                                <Text fontSize="16">{demand?.tipo} {demand?.numero} - {demand?.assunto}</Text>
                            </HStack>

                            <Stack spacing="4" direction={{ base: "column", md: "row" }}>

                                <Stack spacing="0.5">
                                    <Text fontSize="12" color="gray.500">Setor responsável</Text>
                                    <Text fontSize="14">{demand?.setores}</Text>
                                </Stack>
                                <Stack spacing="0.5">
                                    <Text fontSize="12" color="gray.500">Remetente</Text>
                                    <Text fontSize="14">{demand?.remetente}</Text>
                                </Stack>
                                <Stack spacing="0.5">
                                    <Text fontSize="12" color="gray.500">Orgão origem</Text>
                                    <Text fontSize="14">{demand?.orgao_origem}</Text>
                                </Stack>
                                <Stack spacing="0.5">
                                    <Text fontSize="12" color="gray.500">Criado por</Text>
                                    <Tooltip label={demand?.user.name}>
                                        <Avatar name={demand?.user.name} size="xs" />
                                    </Tooltip>
                                </Stack>

                                <Stack spacing="0.5">
                                    <Text fontSize="12" color="gray.500">Status</Text>
                                    <Text fontSize="14">{isTodayDate(demand.prazo_resposta) && demand.status !== "Respondido" ? <Tag colorScheme="red">Vence hoje</Tag> : demand?.status === null ? isPastedDate(demand.prazo_resposta) ? <Tag colorScheme="orange">Atrasado</Tag> : "Sem status" : <Tag colorScheme="green">{demand?.status}</Tag>}</Text>
                                </Stack>


                            </Stack>

                            <Text fontSize="14" color="gray.500">O prazo para responder esta demanda é até dia {convertISOtoDate(demand.prazo_resposta)}. {isTodayDate(demand.prazo_resposta) ? "E o prazo vence hoje!" : ""}</Text>



                            <Stack justify="space-between" direction={{ base: "column", md: "row" }}>
                                <Stack>
                                    <Text fontSize="14" color="gray.700">Pessoas nesta demanda</Text>
                                    <HStack spacing="-2">
                                        {demand && demand.users.length > 0 ? demand.users.map((demandUsers) => (
                                            <Tooltip key={demandUsers.user.name} label={demandUsers.user.name}>
                                                <Avatar border="1px solid #fff" name={demandUsers.user.name} size="xs" key={demandUsers.user.name} />
                                            </Tooltip>
                                        )) : <Text fontSize="xs" color="gray.500">Sem pessoas na demanda.</Text>}
                                    </HStack>
                                </Stack>

                                <Stack>
                                    <Text fontSize="14" color="gray.700">Visto por</Text>
                                    <HStack spacing="-2">
                                        {demand && demand.seen_users.length > 0 ? demand.seen_users.map((demandUsers) => (
                                            <Tooltip key={demandUsers.user.name} label={demandUsers.user.name}>
                                                <Avatar border="1px solid #fff" name={demandUsers.user.name} size="xs" key={demandUsers.user.name} />
                                            </Tooltip>
                                        )) : <Text fontSize="xs" color="gray.500">Ninguém viu esta demanda</Text>}
                                    </HStack>
                                </Stack>

                                <HStack spacing="6">
                                    <HStack>
                                        <Text fontSize="xs" color="gray.500">Emitida dia {convertISOtoDate(demand.data_emissao)}</Text>
                                    </HStack>

                                    <HStack>
                                        <Text fontSize="xs" color="gray.500">Recebido dia {convertISOtoDate(demand.data_recebimento)}</Text>
                                    </HStack>
                                </HStack>
                            </Stack>

                            <Stack pt="6">
                                <Text>Anotações</Text>
                                <Stack bg="gray.50" p="4">
                                    <Text fontSize="sm">{demand?.anotacao === null ? "Sem anotações" : demand?.anotacao}</Text>
                                </Stack>
                            </Stack>

                            <Stack pt="4">
                                <Text>Resposta - {demand?.data_resposta === null ? "Sem data de resposta" : `Respondido dia ${convertISOtoDate(demand?.data_resposta)}`}</Text>
                                <Stack bg="gray.50" p="4">
                                    <Text fontSize="sm">{demand?.obs_resposta === null ? "Sem observações sobre a resposta" : demand?.obs_resposta}</Text>
                                </Stack>
                            </Stack>

                            <Stack pt="4">
                                <Text>Processos</Text>
                                <Stack bg="gray.50" p="4">
                                    <Text fontSize="sm">{demand?.processos === null ? "Nenhum processo vinculado à esta demanda" : demand?.processos}</Text>
                                </Stack>
                            </Stack>

                            <Stack pt="8" direction={{ base: "column", md: "row" }}>
                                {user && user.level > 0 ?
                                    <Button onClick={() => handleCheckResponse(demand?.id)} colorScheme="green" variant={demand?.data_resposta === null ? "solid" : "outline"}>
                                        <HStack spacing="2">
                                            <Icon as={RiCheckLine} />
                                            {demand.status === "Respondido" ? <Text>Respondido</Text> : <Text>Marcar como respondida</Text>}
                                        </HStack>
                                    </Button>

                                    :

                                    ""
                                }

                                {user && user.level > 0 ?
                                    <AddPeopleToDemand demandId={demand.id} />

                                    :

                                    ""
                                }

                                {user && user.level > 0 ?
                                    <AddAnotationToDemandModal id={demand.id} />

                                    :

                                    ""
                                }
                            </Stack>

                        </Stack>
                    ))}
                </Box>
            </Grid>

        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const cookies = parseCookies(ctx)

    if (!cookies['dashtwo:token']) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}
