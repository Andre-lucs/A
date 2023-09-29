import { Outlet } from "react-router-dom";
import {Link} from 'react-router-dom';

export function RootLayout () {
    return  (
        <div>
          <header>
                <h1>Ocorrências policiais</h1>
          </header>
          <main>
             <div>
                <nav>
                    <Link to='/'>Ocorrências</Link>
                     <Link to='mapa'>Mapa</Link>
                </nav>
             </div>
             <Outlet/>
          </main>
        </div>
    )
}