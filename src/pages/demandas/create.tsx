import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

import { Box, Grid, GridItem } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { useAuthenticate } from '../../hooks/AuthContext'
import { CreateDemandForm } from '../../components/Demands/CreateDemandForm'
import Head from 'next/head'


export default function CreateDemand() {

    const { user } = useAuthenticate()

    return (
        <>
            <Head>
                <title>Criar nova demanda - Gerenciador Público Eletrônico</title>
            </Head>
            <Grid templateColumns={{base: '1fr', md: '1fr 5fr'}}>
                <Sidebar user={user} />
                <Box>
                    <Header />
                    <CreateDemandForm />
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
