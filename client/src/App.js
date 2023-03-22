import React, {useEffect} from 'react'
import {Box, useToast} from '@chakra-ui/react'
import {useStore} from './services/store.service'
import {toastDuration} from './config'

function App({children}) {
    const {message, error, clear, init} = useStore(state => state)
    const toast = useToast()

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (message) {
            toast({
                position: 'top',
                description: message,
                duration: toastDuration,
                status: 'success',
                isClosable: true
            })
            clear('message')
        }

        if (error) {
            toast({
                position: 'top',
                description: error,
                duration: toastDuration,
                status: 'error',
                isClosable: true
            })
            clear('error')
        }
    }, [message, error])

    return (
        <Box border="1px solid black" margin="0 auto" height="100vh" maxW="1440px">
            {children}
        </Box>
    );
}

export default React.memo(App)
