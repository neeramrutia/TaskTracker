import { Box } from 'dracula-ui'
import { useState } from 'react'
import Header from './HeaderForAuth'
import { Input, Button } from "dracula-ui"
import NavTabsForAuth from './NavTabsForAuth'
export default function LandingPage(){
    const [ compactView, setCompactView ] = useState(false)
  const [ showAll, setShowAll ] = useState(false)
  const [ filterCompleted, setFilterCompleted ] = useState(false)
    return(
        <Box className='container'>
        <Header setCompactView={setCompactView} />
        <NavTabsForAuth />
        
        
      </Box>
    )
}