import React from 'react'
import {Box, Heading, Link} from '@chakra-ui/react'
import {NavLink} from 'react-router-dom'
import {HamburgerIcon} from '@chakra-ui/icons'
import {useStore} from "../../services/store.service";

const BaseHeader = ({onOpenMobMenu}) => {
    const {isAuth, logout} = useStore(state => state)

    const activeClass = (isActive) => {
        return {
            backgroundColor: isActive ? '#9e9e9e' : '',
            padding: '10px'
        }
    }

    return (
        <Box
            pos="fixed"
            left="0"
            top="0"
            right="0"
            zIndex="1"
            bg="#757575"
            color="#f5f5f5"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pl="5"
            py={{base: "10px", md: "0"}}
        >
            <Heading size={{base: "md", md: "lg"}}>CRM</Heading>
            {isAuth
                ? <Link display={{base: "none", md: "block"}} to="/login" onClick={logout} pr="5">Выйти</Link>
                : (<Box display={{base: "none", md: "flex"}}>
                    <NavLink to="/login" style={({isActive}) => activeClass(isActive)}>Войти</NavLink>
                    <NavLink to="/register" style={({isActive}) => activeClass(isActive)}>Регистрация</NavLink>
                </Box>)
            }
            <HamburgerIcon display={{base: 'block', md: 'none'}} boxSize="1.5em" mr="5"
                           onClick={onOpenMobMenu}/>
        </Box>
    )
}

export default React.memo(BaseHeader)
