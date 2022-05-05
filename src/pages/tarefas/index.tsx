import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { useAuthenticate } from '../../hooks/AuthContext'

import { Box, Grid } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import Head from 'next/head'
import { TableTasks } from '../../components/Tasks/TableTasks'

export default function Painel() {

    const { user } = useAuthenticate()

    return (
        <>
            <Head>
                <title>Minhas tarefas - Gerenciador Público Eletrônico</title>
            </Head>
            <Grid templateColumns={{base: '1fr', md: '1fr 5fr'}}>
                <Sidebar user={user} />
                <Box>
                    <Header />
                    <TableTasks />
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
