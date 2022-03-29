import { Input, Flex, Button, Stack, Text, Grid, Box, Icon, HStack, FormControl, FormLabel } from '@chakra-ui/react'
import { GetServerSideProps } from 'next';


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
      <ToastContainer />
      <Stack w="100vw" h="100vh" align="center" justify="center">
        <Stack as="form" maxWidth={320} w="100%" spacing={4} onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="email" fontSize="sm" color="gray.500">E-mail</FormLabel>
            <Input type="email" id="email" name="email" colorScheme="teal" onChange={e => setEmail(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password" fontSize="sm" color="gray.500">Sua senha</FormLabel>
            <Input type="password" id="password" name="password" colorScheme="teal" onChange={e => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="teal">Entrar</Button>

        </Stack>
      </Stack>



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