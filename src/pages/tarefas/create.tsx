import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

import { Box, Grid } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { useAuthenticate } from '../../hooks/AuthContext'
import Head from 'next/head'
import { CreateTaskForm } from '../../components/Tasks/CreateTaskForm'


export default function CreateTask() {

    const { user } = useAuthenticate()

    return (
        <>
            <Head>
                <title>Criar nova tarefa - Gerenciador Público Eletrônico</title>
            </Head>

            <Grid templateColumns='1fr 4fr'>
                <Sidebar user={user} />
                <Box>
                    <Header title="Criar tarefa" description="Crie metas diárias em formato de tarefas"/>
                    <CreateTaskForm />
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
