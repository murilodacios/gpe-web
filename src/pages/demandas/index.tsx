import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

import { Box, Grid } from '@chakra-ui/react'
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
                <title>Controle público - Gerenciador Público Eletrônico</title>
            </Head>
            <Grid templateColumns={{base: '1fr', md: '1fr 5fr'}}>
                <Sidebar user={user} />
                <Box>
                    <Header />
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
