import {createBrowserRouter} from 'react-router-dom'
import AuthPage from './pages/auth-page'
import MainPage from './pages/main-page'
import ProtectedRoute from './components/protected-route'
import PatientsPage from './pages/patients-page'
import PatientPage from './pages/patient-page'
import CreatePatientPage from './pages/create-patient-page'

export const router = createBrowserRouter([
    {path: '/', element: <ProtectedRoute><MainPage/></ProtectedRoute>},
    {path: '/patient', element: <ProtectedRoute><PatientsPage/></ProtectedRoute>},
    {path: '/new', element: <ProtectedRoute><CreatePatientPage/></ProtectedRoute>},
    {path: '/patient/:id', element: <ProtectedRoute><PatientPage/></ProtectedRoute>},
    {path: '/login', element: <AuthPage/>},
    {path: '/register', element: <AuthPage/>},
])
