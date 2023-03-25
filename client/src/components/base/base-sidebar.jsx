import React from 'react'
import {Box, Divider, ListItem, UnorderedList} from '@chakra-ui/react'
import {linksSidebar} from '../../config'
import {NavLink} from 'react-router-dom'
import {useStore} from '../../services/store.service'
import {ExportCSV} from '../export-csv'

const BaseSidebar = () => {
    const {patients} = useStore(state => state)
    const activeClass = (isActive) => {
        return {
            textDecoration: isActive ? 'underline' : ''
        }
    }

    return (
        <Box>
            <UnorderedList style={{listStyleType: 'none', marginLeft: 0, marginBottom: '10px'}} spacing="2" px="8">
                {linksSidebar.map(({id, label, path}) => (
                    <ListItem key={id}>
                        <NavLink to={path} style={({isActive}) => activeClass(isActive)}>{label}</NavLink>
                    </ListItem>
                ))}
            </UnorderedList>
            {patients.length
                ? (<>
                    <Divider/>
                    <Box ml='8' mt='2'>
                        <ExportCSV csvData={patients}/>
                    </Box>
                </>)
                : ''
            }
        </Box>
    )
}

export default React.memo(BaseSidebar)
