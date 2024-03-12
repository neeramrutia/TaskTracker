import { Box } from 'dracula-ui'
import { useEffect, useState } from 'react'
import Header from './HeaderForAuth'
import { Input, Button } from "dracula-ui"
import NavTabsForAuth from './NavTabsForAuth'
import Notification from '../../components/Notification'

export default function LandingPage(){
    const [ compactView, setCompactView ] = useState(false)
    useEffect(()=>{
      if(localStorage.getItem("Token") != null){
        window.location.href = "/home"
      }
    } , [])
    return(
        <Box className='container'>
        <Header setCompactView={setCompactView} />
        <NavTabsForAuth />
        <Notification/>
        
      </Box>
    )
}