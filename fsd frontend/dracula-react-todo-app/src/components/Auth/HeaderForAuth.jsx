import { Heading, Box, Switch } from "dracula-ui"
import { useContext } from "react"
import { TodoContext } from "../../context/TodoContext"

const Header = ({ setCompactView }) => {
  const { todos } = useContext(TodoContext)
  const incompleteTodos = todos.filter((todo) => todo.isCompleted==false)
  const handleCompactView = () => setCompactView(prev => !prev)

  return (
    <Box as="header" display="flex" style={{justifyContent: "center", alignItems: "center"}}>
      <Heading color="purpleCyan">
        Task Tracker
      </Heading>
      {/* <Switch onClick={handleCompactView} color="purple" defaultChecked="yes" /> */}
    </Box>
  )
}

export default Header