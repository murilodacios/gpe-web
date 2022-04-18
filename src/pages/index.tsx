import { Input, Button, Stack, Text, FormControl, SimpleGrid, Image } from '@chakra-ui/react'
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { parseCookies } from 'nookies';
import { FormEvent, useContext, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../hooks/AuthContext';



export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(e: FormEvent) {

    e.preventDefault();

    const data = {
      email,
      password
    }

    await signIn(data)
  }

  return (
    <>
      <Head>
        <title>GPE - Faça seu login</title>
      </Head>
      <ToastContainer />

      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Stack w="100%" h="100vh" align="center" justify="center" p="4">

          <Stack py="8">
            <Image src="/login.jpg" width="100px" height="100px" borderRadius="50%"/>
          </Stack>

          <Stack py="8" fontFamily="Archivo" textAlign="center">
            <Text fontSize="2xl" fontFamily="Montserrat" fontWeight="500">Bem-vindo(a) de volta</Text>
            <Text fontSize="lg" color="gray.600">É muito bom ter você de volta, tenha um ótimo dia de trabalho.</Text>
          </Stack>

          <Stack as="form" maxWidth={520} w="100%" spacing={4} onSubmit={handleSubmit}>
            <FormControl>
              <Input
                type="email"
                borderRadius="4"
                id="email"
                name="email"
                colorScheme="teal"
                onChange={e => setEmail(e.target.value)}
                placeholder="E-mail"
                variant="filled"
                h="12"
              />
            </FormControl>

            <FormControl>
              <Input
                type="password"
                borderRadius="4"
                id="password"
                name="password"
                colorScheme="teal"
                onChange={e => setPassword(e.target.value)}
                placeholder="Sua senha"
                variant="filled"
                h="12"
              />
            </FormControl>

            <Button
              type="submit"
              borderRadius="4"
              colorScheme="blue"
              fontWeight="400"
              h="12"
            >
              Entrar
            </Button>

          </Stack>
        </Stack>

        <Stack w="100%" h="100vh" align="center" justify="center" bg="blue.500" color="#fff" d={{ base: "none", md: "flex" }}>
        <Image src="/cards.png" w="500px"/>
        </Stack>
      </SimpleGrid>



    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const cookies = parseCookies(ctx)

  if (cookies['dashtwo:token']) {
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