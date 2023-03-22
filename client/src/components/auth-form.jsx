import React, {useEffect, useState} from 'react'
import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Text
} from '@chakra-ui/react'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import {useLocation, useNavigate, Navigate} from 'react-router-dom'
import {useForm} from "react-hook-form"

import FormFooter from './base/base-form-footer'
import {useStore} from '../services/store.service'

const AuthForm = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {sighUp, signIn, isLoading, message, isAuth} = useStore(state => state)
    const isLoginPage = location.pathname === '/login'

    const [isShowPass, setShowPass] = useState(false)
    const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm({
        defaultValues: {
            login: '',
            password: ''
        }
    })

    const title = isLoginPage ? 'Вход' : 'Регистрация'
    const btnTitle = isLoginPage ? 'Войти' : 'Submit'

    useEffect(() => {
        if (message && !isAuth) {
            reset()
            navigate('/login')
        }

        if (message && isAuth) {
            reset()
            navigate('/')
        }
    }, [message, isAuth])

    const onToggle = () => setShowPass(!isShowPass)

    const onSubmit = (data) => {
        if (isValid) {
            const payload = {
                login: data.login.trim(),
                password: data.password.trim()
            }
            if (isLoginPage) {
                signIn(payload)
            } else {
                sighUp(payload)
            }
        }
    }

    if (isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <form style={{width: "100%", marginTop: "40px"}} onSubmit={handleSubmit(onSubmit)}>
            <Center mb="5">
                <Heading size="lg">{title}</Heading>
            </Center>
            <FormControl mb="5">
                <FormLabel>Логин</FormLabel>
                <Input
                    type="text"
                    {...register('login', {
                    required: {value: true, message: 'Введите логин'},
                    minLength: {value: 4, message: 'Логин не менее 4 символов'}
                })}
                    style={{borderColor: errors.login?.message ? 'red' : ''}}
                />
                <Text fontSize="sm" color="red">{errors.login?.message}</Text>
            </FormControl>
            <FormControl>
                <FormLabel>Пароль</FormLabel>
                <InputGroup>
                    <Input
                        type={isShowPass ? "text" : "password"}
                        {...register('password', {
                            required: {value: true, message: 'Введите пароль'},
                            minLength: {value: 6, message: 'Пароль не менее 6 символов'}
                        })}
                        style={{borderColor: errors.password?.message ? 'red' : ''}}
                    />
                    <InputRightElement children={isShowPass
                        ? <ViewOffIcon boxSize="1.5em" color="#757575" onClick={onToggle}/>
                        : <ViewIcon boxSize="1.5em" color="#757575" onClick={onToggle}/>}
                    />
                </InputGroup>
                <Text fontSize="sm" color="red">{errors.password?.message}</Text>
            </FormControl>
            <Button
                mt={4}
                colorScheme="teal"
                isLoading={isLoading}
                type="submit"
                width={{base: "full", md: "20"}}
            >
                {btnTitle}
            </Button>
            <FormFooter isLoginPage={isLoginPage}/>
        </form>
    )
}

export default React.memo(AuthForm)
