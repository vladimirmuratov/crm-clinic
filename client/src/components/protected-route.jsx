import React from 'react'
import {Navigate} from 'react-router-dom'
import {useStore} from '../services/store.service'

const ProtectedRoute = ({children}) => {
    const {isAuth} = useStore(state => state)

    if(!isAuth){
        return <Navigate to="/login"/>
    } else {
        return children
    }
}

export default React.memo(ProtectedRoute)
