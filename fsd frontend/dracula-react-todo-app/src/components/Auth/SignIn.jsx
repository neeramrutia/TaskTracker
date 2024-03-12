import { Box, Button, Input } from "dracula-ui"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from 'react-hot-toast'
export default function SignIn() {
    const [email , setEmail]  = useState("")
    const [pass , setPass]  = useState("")
    useEffect(()=>{
        if(localStorage.getItem("Token")!=null){
            window.location.href = "/home"
        }
    } , [])
    const submitForm = async() =>{
        console.log(email)
        console.log(pass)
        try {
            const signin = await axios.post("http://localhost:8080/loginuser" , {
            email,
            password : pass
        })
        if(signin.status == 200){
            console.log(signin.data)
            localStorage.setItem("Token" , signin.data.token)
            localStorage.setItem("Id" , signin.data.id)
            setEmail("")
            setPass("")
            toast.success("Signed In successfully")
            setTimeout(()=>{window.location.href = "/home"} , 2000)
        }else{
            toast.error("Server Error")
        }
        } catch (error) {
            toast.error("Incorrect Cred")
        }
        
    }

    return (
        <Box as='main' mt='xs'>
            <form style={{ display: "flex", flexDirection: "column" }} >
                <Input mb="sm"  borderSize="sm" size="md" color="cyan" type="text" placeholder="Enter Email"
                   value={email} onChange={(e) => { setEmail(e.target.value) }}
                />
                <Input mb="sm"  borderSize="sm" size="md" color="cyan" type="password" placeholder="Enter Pass"
                   value={pass} onChange={(e) => { setPass(e.target.value) }}
                />
                <Button onClick={(e)=>{e.preventDefault();submitForm()}} size="md" color="cyan" variant="ghost">Sign In</Button>
            </form>
        </Box>
    )
}