import 'dracula-ui/styles/dracula-ui.css'
import { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../context/TodoContext'
import { Box } from 'dracula-ui'
import Header from '../components/Header'
import NavTabs from '../components/NavTabs'
import TodoCard from '../components/TodoCard'
import Form from '../components/Form'
import Notification from '../components/Notification'



const Home = () => {
  const [ compactView, setCompactView ] = useState(false)
  const [ showAll, setShowAll ] = useState(false)
  const [ filterCompleted, setFilterCompleted ] = useState(false)

  const { todos } = useContext(TodoContext)
  useEffect(()=>{
    if(localStorage.getItem("Token") == null){
      window.location.href = "/"
    }
  })
  
  return (
    <Box className='container'>
      <Header setCompactView={setCompactView} />
      <NavTabs setShowAll={setShowAll} setFilterCompleted={setFilterCompleted} />
      <Box as='main' mt='xs'>
        {todos
        .filter(todo => showAll || todo.status==filterCompleted)
        .map(todo => 
          <TodoCard key={todo.id} todo={todo} compactView={compactView} />)}
      </Box>
      <Form />
      <Notification />
    </Box>


  )
}

export default Home