import React from 'react'
import AuthForm from '../components/auth-form'
import MainLayout from '../layouts/main-layout'

const AuthPage = () => {
    return (
        <MainLayout>
            <AuthForm/>
        </MainLayout>
    )
}

export default React.memo(AuthPage)
