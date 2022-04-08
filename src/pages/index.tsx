import { Input, Flex, Button, Stack, Text, Grid, Box, Icon, HStack, FormControl, FormLabel, SimpleGrid } from '@chakra-ui/react'
import { GetServerSideProps } from 'next';
import Head from 'next/head';


import Link from 'next/link'
import { destroyCookie, parseCookies } from 'nookies';
import { FormEvent, useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../hooks/AuthContext';
import { api } from '../services/api';


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
          <Stack as="form" maxWidth={520} w="100%" spacing={4} onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="email" fontSize="sm" color="gray.500">E-mail</FormLabel>
              <Input type="email" borderRadius="2" id="email" name="email" colorScheme="teal" onChange={e => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" fontSize="sm" color="gray.500">Sua senha</FormLabel>
              <Input type="password" borderRadius="2" id="password" name="password" colorScheme="teal" onChange={e => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" borderRadius="2" colorScheme="teal">Entrar</Button>

          </Stack>
        </Stack>

        <Stack w="100%" h="100vh" align="center" justify="center" bg="teal" color="#fff" d={{ base: "none", md: "flex" }}>
          {/* <Text>oi</Text> */}
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