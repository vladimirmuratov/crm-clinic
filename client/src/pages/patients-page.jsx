import React from 'react'
import MainLayout from '../layouts/main-layout'
import {useStore} from '../services/store.service'
import {Center, Heading, Spinner} from '@chakra-ui/react'
import PatientList from '../components/patient-list'

const PatientsPage = () => {
    const {patients, isLoading} = useStore(state => state)

    return (
        <MainLayout>
            {isLoading
                ? <Spinner color="red.500" size='xl'/>
                : patients.length
                    ? <PatientList patients={patients}/>
                    : (<Center>
                        <Heading>Список пациентов пуст</Heading>
                    </Center>)
            }
        </MainLayout>
    )
}

export default React.memo(PatientsPage)
