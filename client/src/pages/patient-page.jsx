import React from 'react'
import MainLayout from '../layouts/main-layout'
import {useParams} from 'react-router-dom'
import {useStore} from '../services/store.service'
import PatientForm from '../components/patient-form'

const PatientPage = () => {
    const {id} = useParams()
    const {patients} = useStore(state => state)
    const foundPatient = patients.find(p => p._id === id)

    return (
        <MainLayout>
            <PatientForm patient={foundPatient}/>
        </MainLayout>
    )
}

export default React.memo(PatientPage)
