import React, {useState} from 'react'
import {Box} from '@chakra-ui/react'
import Sidebar from '../components/base/base-sidebar'
import MobileMenu from '../components/base/base-mobile-menu'
import BaseHeader from '../components/base/base-header'

const MainLayout = ({children}) => {
    const [isOpenMobMenu, setOpenMobMenu] = useState(false)

    const onOpenMobMenu = () => setOpenMobMenu(true)

    const onCloseMobMenu = () => setOpenMobMenu(false)

    return (
        <>
            <MobileMenu onClose={onCloseMobMenu} isOpen={isOpenMobMenu}/>
            <Box height="full" display="flex" flexDirection="column" pt="36px" overflowY="scroll">
                <BaseHeader onOpenMobMenu={onOpenMobMenu}/>
                <Box display="flex" flexGrow="1">
                    <Box display={{base: 'none', md: 'block'}} pt="5" borderRight="2px solid #e0e0e0">
                        <Sidebar/>
                    </Box>
                    <Box
                        flexGrow="1"
                        display="flex"
                        justifyContent="center"
                        // alignItems="center"
                        px={{base: "10px", md: "20px"}}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default React.memo(MainLayout)
