import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import './index.css'
import App from './App'
import {router} from './router'
import {theme} from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider theme={theme}>
        <App>
            <RouterProvider router={router}/>
        </App>
    </ChakraProvider>
)
