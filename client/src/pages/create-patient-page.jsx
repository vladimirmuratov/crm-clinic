import React from 'react'
import MainLayout from '../layouts/main-layout'
import PatientForm from '../components/patient-form'

const CreatePatientPage = () => {
    return(
        <MainLayout>
            <PatientForm/>
        </MainLayout>
    )
}

export default React.memo(CreatePatientPage)
