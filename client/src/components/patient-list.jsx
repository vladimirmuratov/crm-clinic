import React, {useEffect, useState} from 'react'
import {Box, Input, InputGroup, InputRightElement} from '@chakra-ui/react'
import PatientListItem from './base/base-patient-list-item'
import {Search2Icon} from '@chakra-ui/icons'

const PatientList = ({patients}) => {
    const [searchValue, setSearchValue] = useState('')
    const [searchedPatients, setSearchedPatients] = useState(patients)

    useEffect(() => {
        if(patients.length){
            if(searchValue.length > 2) {
                const foundedPatients = patients.filter(p => (p.name).toLowerCase().includes(searchValue.trim().toLowerCase()))
                setSearchedPatients(foundedPatients)
            }

            if(!searchValue) {
                setSearchedPatients(patients)
            }
        }
    }, [searchValue, patients.length])

    return (
        <Box width="full" height="full" pt="5">
            <InputGroup mb="5">
                <Input
                    type="search"
                    placeholder="Поиск по имени..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <InputRightElement children={<Search2Icon/>}/>
            </InputGroup>
            {searchedPatients.map((patient) => <PatientListItem key={patient._id} patient={patient}/>)}
        </Box>
    )
}

export default React.memo(PatientList)
