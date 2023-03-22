import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Divider
} from '@chakra-ui/react'
import {NavLink} from 'react-router-dom'
import {useStore} from '../../services/store.service'
import {linksSidebar} from '../../config'

const BaseMobileMenu = ({onClose, isOpen}) => {
    const {isAuth, logout} = useStore(state => state)

    const activeClass = (isActive) => {
        return {
            textDecoration: isActive ? 'underline' : '',
            marginBottom: '10px'
        }
    }

    const handleLogout = () => {
        onClose()
        logout()
    }

    return (
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader borderBottomWidth='1px'>Меню</DrawerHeader>
                <DrawerBody display="flex" flexDirection="column">
                    {isAuth
                        ? linksSidebar.map(({id, label, path}) => (
                            <NavLink
                                key={id}
                                to={path}
                                style={({isActive}) => activeClass(isActive)}
                                onClick={onClose}
                            >
                                {label}
                            </NavLink>
                        ))
                        : ''
                    }
                    <Divider/>
                    {isAuth
                        ? <p onClick={handleLogout}>Выйти</p>
                        : (<>
                            <NavLink
                                to="/login"
                                style={({isActive}) => activeClass(isActive)}
                                onClick={onClose}
                            >
                                Войти
                            </NavLink>
                            <NavLink
                                to="/register"
                                style={({isActive}) => activeClass(isActive)}
                                onClick={onClose}
                            >
                                Регистрация
                            </NavLink>
                        </>)
                    }
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default React.memo(BaseMobileMenu)
