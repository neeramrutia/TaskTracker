import TodoCardButtons from './TodoCardButtons'
import cropLongText from '../utils/cropLongText'
import { Box, Text } from 'dracula-ui'
import { useContext } from 'react'
import { TodoContext } from '../context/TodoContext'

const TodoElement = ({ todo, compactView }) => {
  const { completeTodo } = useContext(TodoContext)

  return (
    <Box 
      onDoubleClick={() => todo.status && completeTodo(todo.id)}
      color={!todo.status && "black"}
      display="flex" p="sm" mb="xs" rounded="lg" as="article">
      <Box display="flex" pr="sm" style={{flexDirection: "column"}}>
        <Text color={todo.status ? "blackSecondary" : "purpleCyan"} style={{wordBreak: "break-all"}}>
          {compactView ? cropLongText(todo.title) : todo.title}
        </Text>
        <Text mt={!compactView && "xs"} color="blackSecondary">
          {!compactView && todo.description}
        </Text>
      </Box>
      <TodoCardButtons todo={todo} />
    </Box>
  )
}

export default TodoElement