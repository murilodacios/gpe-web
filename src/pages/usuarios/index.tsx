import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { useAuthenticate } from '../../hooks/AuthContext'

import { Box, Grid } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { HomePainel } from '../../components/Home/HomePainel'
import { TableUsers } from '../../components/Users/TableUsers'
import Head from 'next/head'

export default function Usuarios() {

    const { user } = useAuthenticate()

    return (
        <>
            <Head>
                <title>Usuários - Gerenciador Público Eletrônico</title>
            </Head>

            <Grid templateColumns='1fr 4fr'>
                <Sidebar user={user} />
                <Box>
                    <Header />

                    <TableUsers />
                    
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

    const level = cookies["lev"];

    if (Number(level) < 1) {
        return {
            redirect: {
                destination: '/painel',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}
