import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

import { Box, Grid } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { useAuthenticate } from '../../hooks/AuthContext'
import { CreateDemandForm } from '../../components/Demands/CreateDemandForm'
import { CreateUserForm } from '../../components/Users/CreateUserForm'
import Head from 'next/head'


export default function CreateUser() {

    const { user } = useAuthenticate()

    return (
        <>
            <Head>
                <title>Criar novo usuário - Sistema Eletrônico de Demandas</title>
            </Head>

            <Grid templateColumns='1fr 4fr'>
                <Sidebar user={user} />
                <Box>
                    <Header title="Usuários" description="Gerencie os usuários do seu setor"/>
                    <CreateUserForm />
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
