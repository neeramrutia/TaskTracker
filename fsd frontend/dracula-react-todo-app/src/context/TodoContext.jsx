import { createContext, useState, useEffect, useCallback } from "react"
import toast from 'react-hot-toast'
import createId from '../utils/createId'
import axios from "axios"
export const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
  const firstTodo = { id: 1, title: "Hello! Add your first todo!", status: false, description: new Date().toISOString().slice(0,10) , userId : localStorage.getItem("Id")}
  const [ todos, setTodos ] = useState([{}])
  const getTodoFromBackend = useCallback(async()=>{
    const getTodo = await axios.get(`http://localhost:8080/api/task/all/${localStorage.getItem("Id")}` ,{
      headers : {
        Authorization : `Token ${localStorage.getItem("Token")}`
      }
    } )
    setTodos(getTodo.data)
  } , [todos])
  useEffect(() => {
   getTodoFromBackend()
  }, [])

  const addTodo = (text) => {
    const currentDate = new Date().toISOString().slice(0,10)
    const newTodo = { id: createId(), text: text, isCompleted: false, date: currentDate }
    setTodos([ ...todos, newTodo ])
    toast.success("Added")
  }

  const completeTodo = (id) => {
    const newTodos = [ ...todos ]
    const todo = newTodos.find(todo => todo.id === id)
    todo.status = !todo.status
    setTodos(newTodos)
    todo.status 
      ? toast.success("Completed", {iconTheme: {primary: "#8aff80", secondary: "#21222c"}, style: {color: "#8aff80"}})
      : toast.success("Restored", {iconTheme: {primary: "#ffff80", secondary: "#21222c"}, style: {color: "#ffff80"}})
  }

  const deleteTodo = (id) => {
    const newTodos = [ ...todos ]
    setTodos(newTodos.filter(todo => todo.id !== id))
    toast.error("Deleted")
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, completeTodo, deleteTodo }}>
      { children }
    </TodoContext.Provider>
  )
}