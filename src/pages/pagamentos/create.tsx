import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

import { Box, Grid } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { useAuthenticate } from '../../hooks/AuthContext'
import Head from 'next/head'
import { CreatePaymentForm } from '../../components/Payments/CreatePaymentForm'


export default function CreatePayment() {

    const { user } = useAuthenticate()

    return (
        <>
            <Head>
                <title>Criar novo pagamento - Gerenciador Público Eletrônico</title>
            </Head>
            <Grid templateColumns={{base: '1fr', md: '1fr 4fr'}}>
                <Sidebar user={user} />
                <Box>
                    <Header title="Crie um novo pagamento" description="Controle de pagamento de fornecedores" />
                    <CreatePaymentForm />
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
