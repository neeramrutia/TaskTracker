import 'dracula-ui/styles/dracula-ui.css'
import { useContext, useState } from 'react'
import { TodoContext } from './context/TodoContext'
import { Box } from 'dracula-ui'
import Header from './components/Header'
import NavTabs from './components/NavTabs'
import TodoCard from './components/TodoCard'
import Form from './components/Form'
import Notification from './components/Notification'


import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './components/home'
import LandingPage from './components/Auth/landingPage'

const App = () => {
 
  return (
    <Router>
      <Routes>
        <Route exact path='/home' element = {<Home/>}/>
        <Route exact path='/' element = {<LandingPage/>}/>
      </Routes>
    </Router>
  )
}

export default App