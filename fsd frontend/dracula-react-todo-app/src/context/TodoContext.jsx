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

  const addTodo = async(title) => {
    const currentDate = new Date().toISOString().slice(0,10)
    const newTodo =await axios.post("http://localhost:8080/api/task" , {
      title , 
      description : currentDate , 
      status : false,
      userId : localStorage.getItem("Id")
    } , {
      headers : {
        Authorization : `Token ${localStorage.getItem("Token")}`
      }
    })
    if(newTodo.status == 201){
      toast.success("Added")
      getTodoFromBackend();
    }else{
      toast.error("Server Error")
    }
  }

  const completeTodo = async(id , title , description , status ) => {
    const todo = await axios.post("http://localhost:8080/api/task" , {
      id , 
      userId : localStorage.getItem("Id"),
      title,
      description,
      status
    } , {
      headers : {
        Authorization : `Token ${localStorage.getItem("Token")}`
      }
    })
    if(todo.status == 201){
      todo.data.status 
      ? toast.success("Completed", {iconTheme: {primary: "#8aff80", secondary: "#21222c"}, style: {color: "#8aff80"}})
      : toast.success("Restored", {iconTheme: {primary: "#ffff80", secondary: "#21222c"}, style: {color: "#ffff80"}})

      getTodoFromBackend()
    }else{
      toast.error("Server Error")
    }
      }

  const deleteTodo = async(id ) => {
    const todo = await axios.delete(`http://localhost:8080/api/task/${id}` , {
      headers : {
        Authorization : `Token ${localStorage.getItem("Token")}`
      }
    })
    if(todo.status == 200){
      toast.error("Deleted");
      getTodoFromBackend();
    }else{
      toast.error("server error")
    }
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, completeTodo, deleteTodo }}>
      { children }
    </TodoContext.Provider>
  )
}