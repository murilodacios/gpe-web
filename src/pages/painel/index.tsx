import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { useAuthenticate } from '../../hooks/AuthContext'

import { Box, Grid } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { HomePainel } from '../../components/Home/HomePainel'
import Head from 'next/head'

export default function Painel() {

    const { user } = useAuthenticate()

    return (
        <>
            <Head>
                <title>Painel - Gerenciador Público Eletrônico</title>
            </Head>
            <Grid templateColumns={{base: '1fr', md: '1fr 5fr'}}>
                <Sidebar user={user} />
                <Box>
                    <Header />
                    <HomePainel user={user}/>
                    
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
