import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { useAuthenticate } from '../../hooks/AuthContext'

import { Box, Grid } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import Head from 'next/head'


import { SignPdf } from '../../components/Assinatura/SignPdf'

export default function Assinar() {

    const { user } = useAuthenticate()

    return (
        <>
            <Head>
                <title>Painel - Gerenciador Público Eletrônico</title>
            </Head>
           
            <Grid templateColumns={{ base: '1fr', md: '1fr 4fr' }}>
                <Sidebar user={user} />
                <Box>
                    <Header title="Assinar documentos" description="Assine documentos com sua assinatura digital" />

                    <SignPdf />

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
