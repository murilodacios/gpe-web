import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

import { Box, Grid, GridItem } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { useAuthenticate } from '../../hooks/AuthContext'
import { TableDemands } from '../../components/Demands/TableDemands'
import { CreateDemandForm } from '../../components/Demands/CreateDemandForm'
import Head from 'next/head'


export default function CreateDemand() {

    const { user } = useAuthenticate()

    return (
        <>
            <Head>
                <title>Criar nova demanda - Gerenciador Público Eletrônico</title>
            </Head>
            <Grid templateColumns={{base: '1fr', md: '1fr 4fr'}}>
                <Sidebar user={user} />
                <Box>
                    <Header title="Controle Público e PGM" description="Controle de demandas do Ministério Público e PGM" />
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
