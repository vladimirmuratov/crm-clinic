import React from 'react'
import {Box, Center, Text} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

const BaseFormFooter = ({isLoginPage}) => {
    const linkStyles = {
        color: '#2962ff',
        textDecoration: 'underline'
    }

    return(
        <Center mt="2">
            {isLoginPage
                ? <Box display="flex" alignItems="center" flexDirection={{base: 'column', md: 'row'}} gap={{base: '0', md: '1'}}><Text fontSize='md'>Не зарегистрированы?</Text><Link to="/register" style={linkStyles}>Регистрация</Link></Box>
                : <Box display="flex" alignItems="center" flexDirection={{base: 'column', md: 'row'}} gap={{base: '0', md: '1'}}><Text fontSize='md'>Уже зарегистрированы?</Text><Link to="/login" style={linkStyles}>Войти</Link></Box>
            }
        </Center>
    )
}

export default React.memo(BaseFormFooter)
