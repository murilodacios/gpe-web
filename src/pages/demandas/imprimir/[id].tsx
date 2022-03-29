import { parseCookies } from 'nookies'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { Avatar, Box, Button, Grid, GridItem, HStack, Icon, Stack, Text, Tooltip } from '@chakra-ui/react'

import Link from 'next/link'
import { RiCheckLine, RiEyeLine } from 'react-icons/ri'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { useDemands } from '../../../hooks/DemandsContext'

export default function Imprimir() {

    const router = useRouter()
    const { id } = router.query

    const { demands } = useDemands()



    if (typeof window !== "undefined") {
        window.print()
    }

    return (
        <>
            <ToastContainer />
            <Grid templateColumns='1fr'>
                <Box>
                    {demands && demands?.filter(demand => demand.id === id).map(demand => (
                        <Stack key={demand?.id} p="6" bg="linear-gradient(122.57deg, #FCFCFC -17.82%, rgba(252, 252, 252, 0) 145.47%);">

                            <HStack py="5">
                                <Icon as={RiEyeLine} color="gray.500" />
                                <Text color="gray.500">Visualizando única demanda</Text>
                                <Text color="gray.600">
                                    <Link href={`/demandas`}>
                                        <a>
                                            <Text> - Voltar à lista</Text>
                                        </a>
                                    </Link>
                                </Text>
                            </HStack>

                            <HStack justify="space-between">
                                <Text fontSize="16">{demand?.tipo} {demand?.numero} - {demand?.assunto}</Text>
                            </HStack>

                            <HStack spacing="4">
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
                                    <Text fontSize="14">{demand?.status === null ? "Sem status" : demand?.status}</Text>
                                </Stack>


                            </HStack>

                            <Text fontSize="14" color="gray.500">O prazo para responder esta demanda é até dia 12/02/2022</Text>

                            <Text fontSize="14" color="gray.700">Pessoas nesta demanda</Text>

                            <HStack justify="space-between">
                                <HStack>
                                    {demand && demand.users.length > 0 ? demand.users.map((demandUsers) => (
                                        <Tooltip label={demandUsers.user.name}>
                                            <Avatar mr="-3" border="1px solid #fff" name={demandUsers.user.name} size="xs" key={demandUsers.user.name} />
                                        </Tooltip>
                                    )) : <Text fontSize="xs" color="gray.500">Sem pessoas na demanda.</Text>}
                                </HStack>

                                <HStack spacing="6">
                                    <HStack>
                                        <Text fontSize="xs" color="gray.500">Emitida dia 12/02/2022</Text>
                                    </HStack>

                                    <HStack>
                                        <Text fontSize="xs" color="gray.500">Recebido dia 12/02/2022</Text>
                                    </HStack>
                                </HStack>
                            </HStack>

                            <Stack pt="6">
                                <Text>Anotações</Text>
                                <Stack bg="gray.50" p="4">
                                    <Text fontSize="sm">{demand?.anotacao === null ? "Sem anotações" : demand?.anotacao}</Text>
                                </Stack>
                            </Stack>

                            <Stack pt="4">
                                <Text>Resposta - {demand?.data_resposta === null ? "Sem data de resposta" : `Respondido dia ${demand?.data_resposta}`}</Text>
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
