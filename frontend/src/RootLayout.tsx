import { Outlet } from "react-router-dom";
import {Link} from 'react-router-dom';


export function RootLayout () {
    return  (
        <div className="w-full">
          <main className=" h-screen flex flex-col items-center gap-5 pt-5">
             <div>
                <nav className="flex gap-10">
                    <Link to='/'>Ocorrências</Link>
                     <Link to='mapa'>Mapa</Link>
                </nav>
             </div>
             <Outlet/>
          </main>
        </div>
    )
}