import { Box, Input, Button } from "dracula-ui"
import { useState } from "react"
import axios from "axios"
import toast from 'react-hot-toast'
export default function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const Signup = async() =>{
        toast.success("user created successfully")
        console.log(name)
        console.log(email)
        console.log(pass)
        const res = await axios.post("http://localhost:8080/register" , {
            email,
            password : pass,
            name
        })
        if(res.status == 200){
            toast.success("user created successfully")
        }
    } 

    return (
        <>
            <Box as='main' mt='xs'>
                <form style={{ display: "flex", flexDirection: "column" }} >
                    <Input borderSize="sm" mt="sm"  size="md" color="cyan" type="email" placeholder="Add Email"
                      value={email}  onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <Input borderSize="sm" mt="sm"    size="md" color="cyan" type="text" placeholder="Add Name"
                       value={name} onChange={(e) => { setName(e.target.value) }}
                    />
                    <Input borderSize="sm" mt="sm" mb="sm"   size="md" color="cyan" type="password" placeholder="Add Password"
                       value={pass} onChange={(e) => { setPass(e.target.value) }}
                    />
                    <Button onClick={(e)=>{e.preventDefault(); Signup() }} size="md"  color="cyan" variant="ghost">Get Started</Button>
                </form>
            </Box>
        </>
    )
}