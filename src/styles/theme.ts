import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    fonts: {
        heading: "Montserrat",
        body: "Rubik"
    },
    styles: {
        global: {
            body: {
                bg: 'white',
                color: 'gray.800'
            }
        }
    }
})