import React from 'react'
import {ListItem, UnorderedList} from '@chakra-ui/react'
import {linksSidebar} from '../../config'
import {NavLink} from 'react-router-dom'

const BaseSidebar = () => {
    const activeClass = (isActive) => {
        return {
            textDecoration: isActive ? 'underline' : ''
        }
    }

    return (
        <UnorderedList style={{listStyleType: 'none', marginLeft: 0}} spacing="2" px="8">
            {linksSidebar.map(({id, label, path}) => (
                <ListItem key={id}>
                    <NavLink to={path} style={({isActive}) => activeClass(isActive)}>{label}</NavLink>
                </ListItem>
            ))}
        </UnorderedList>
    )
}

export default React.memo(BaseSidebar)
