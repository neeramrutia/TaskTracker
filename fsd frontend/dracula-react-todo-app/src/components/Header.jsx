import { Heading, Box, Switch, Button } from "dracula-ui"
import { useContext } from "react"
import { TodoContext } from "../context/TodoContext"

const Header = ({ setCompactView }) => {
  const { todos } = useContext(TodoContext)
  const incompleteTodos = todos.filter((todo) => todo.status==false)
  const handleCompactView = () => setCompactView(prev => !prev)
  const SignOut = () =>{
    localStorage.clear();
    window.location.href = "/"
  }

  return (
    <Box as="header" display="flex" style={{justifyContent: "space-between", alignItems: "center"}}>
      <div>
      <Heading color="purpleCyan">
        You have {incompleteTodos.length || "no"} open {incompleteTodos.length === 1 ? "task" : "tasks"}.
      </Heading>
      </div>
      <div  style={{display:"flex" , minWidth:"30%" , justifyContent:"space-evenly" , alignItems: "center"}}>
        <Switch onClick={handleCompactView} color="purple" defaultChecked="yes" />
        <Button onClick={()=>{ SignOut() }} size="md"  color="cyan" variant="ghost">Sign Out</Button>
        </div>
    </Box>
  )
}

export default Header