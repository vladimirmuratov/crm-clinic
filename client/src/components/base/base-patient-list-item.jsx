import React from 'react'
import {Box, Text} from '@chakra-ui/react'
import {ExternalLinkIcon} from '@chakra-ui/icons'
import {useNavigate} from 'react-router-dom'
import moment from 'moment'

const BasePatientListItem = ({patient}) => {
    const navigate = useNavigate()
    const date = moment(patient.date).format('DD.MM.YYYY')
    return (
        <Box
            pos="relative"
            boxShadow='base'
            bgColor="#e0f7fa"
            mb="5"
            px="5"
            py="3"
            display="flex"
            flexDirection={{base: 'column', md: 'row'}}
            alignItems={{base: 'start', md: 'center'}}
            justifyContent={{base: 'center', md: 'start'}}
            gap={{base: "0", sm: "5"}}
            flexWrap="wrap"
        >
            <Text w={{base: '100%', md: '50%'}}>{patient.name}</Text>
            <Text>{patient.amount?.toLocaleString()}&nbsp;руб.</Text>
            <Text>{date}</Text>
            <ExternalLinkIcon
                pos="absolute"
                right="5"
                boxSize="1.5em"
                onClick={() => navigate(`/patient/${patient._id}`)}
            />
        </Box>
    )
}

export default React.memo(BasePatientListItem)
