import { useState } from "react"
import { Input } from "../components/Input"

export function Register () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")

    return (
        <div className={`h-screen flex gap-10 items-center justify-between`}>
            <div className="p-10">
               <h1>Register</h1>
               <form action="">
                  <Input id="full-name" label="Nome completo:" type="text" value={fullName} handleChange={(ev) => setFullName(ev.target.value)}/>  
                  <Input id="email" label="Email:" type="email" value={email} handleChange={(ev) => setEmail(ev.target.value)}  />
                  <Input id="password" label="Senha:" type="password" value={password} handleChange={(ev) => setPassword(ev.target.value)}/>
                  <button>Criar</button>  
               </form>
            </div>
            <div className={`h-full w-1/2 bg-black `} >
            </div>
        </div>
    )
}