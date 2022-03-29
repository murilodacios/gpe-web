import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

import { Box, Grid, GridItem } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { useAuthenticate } from '../../hooks/AuthContext'
import { TableDemands } from '../../components/Demands/TableDemands'
import Head from 'next/head'


export default function Demandas() {

    const { user } = useAuthenticate()

    return (
        <>
            <Head>
                <title>Controle público - Sistema Eletrônico de Demandas</title>
            </Head>
            <Grid templateColumns='1fr 4fr'>
                <Sidebar user={user} />
                <Box>
                    <Header title="Controle Público e PGM" description="Controle de demandas do Ministério Público e PGM"/>
                    <TableDemands />
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
