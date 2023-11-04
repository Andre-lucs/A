import {Link, useLocation} from 'react-router-dom';

export function Navbar () {

    const {pathname} = useLocation();

    return (
        <div>
        <nav className="flex gap-10">
            <Link to='/' className={`${pathname === '/'? 'border-b-2 border-blue-600': ''}`}>Dashboard</Link>
             <Link to='mapa' className={`${pathname === '/mapa'? 'border-b-2 border-blue-600': ''}`}>Mapa</Link>
        </nav>
     </div>
    )
}