import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { AuthProvider } from '../hooks/AuthContext'
import { DemandsProvider } from '../hooks/DemandsContext'
import { UsersProvider } from '../hooks/usersContext'


function MyApp({ Component, pageProps }: AppProps) {
  return (

    <AuthProvider>
      <UsersProvider>
        <DemandsProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </DemandsProvider>
      </UsersProvider>
    </AuthProvider>

  )
}

export default MyApp
