import { useState } from "react"
import { Input } from "../components/Input"
import myImage from '../Images/bg-login.jpg';
import { Link } from "react-router-dom";


export function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    return (
        <div className={`h-screen flex gap-10 items-center`}>
            <div className={`h-full w-1/2 bg-black bg-[url(${myImage})]`}>
            </div>
            <div>
                <h1>Login</h1>
               <form action="">
                  <Input id="email" label="Email:" type="email" value={email} handleChange={(ev) => setEmail(ev.target.value)}  />
                  <Input id="password" label="Senha:" type="password" value={password} handleChange={(ev) => setPassword(ev.target.value)}/>
                  <button>Entrar</button>  
               </form>
                <p>Não possui uma conta? <Link to={'/register'}>Criar uma conta</Link></p>
            </div>
        </div>
    )
}