import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { AuthProvider } from '../hooks/AuthContext'
import { DemandsProvider } from '../hooks/DemandsContext'
import { UsersProvider } from '../hooks/usersContext'
import { TasksProvider } from '../hooks/tasksContext'
import { PaymentsProvider } from '../hooks/PaymentsContext'


function MyApp({ Component, pageProps }: AppProps) {
  return (

    <AuthProvider>
      <UsersProvider>
        <DemandsProvider>
          <TasksProvider>
            <PaymentsProvider>
              <ChakraProvider theme={theme}>
                <Component {...pageProps} />
              </ChakraProvider>
            </PaymentsProvider>
          </TasksProvider>
        </DemandsProvider>
      </UsersProvider>
    </AuthProvider>

  )
}

export default MyApp
