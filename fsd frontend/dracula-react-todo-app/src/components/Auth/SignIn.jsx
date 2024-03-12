import { Box, Button, Input } from "dracula-ui"
import { useState } from "react"
export default function SignIn() {
    const [email , setEmail]  = useState("")
    const [pass , setPass]  = useState("")

    const submitForm = () =>{
        console.log(email)
        console.log(pass)
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