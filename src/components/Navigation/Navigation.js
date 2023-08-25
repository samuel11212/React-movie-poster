import { Suspense } from "react";
import { FaSpinner } from "react-icons/fa";
import { NavLink, Outlet  } from "react-router-dom";
import s from './Navigation.module.css';

const fallbackStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    color: '#010101'
  }


const Navigation = () => {

    return <><nav className={s.navigate}>
            <NavLink  
                to="/"
                className={s.link} 
            >
                Home
            </NavLink>

            <NavLink to="/movies"
                className={s.link}    
            >
                Search movies
            </NavLink>
            </nav>
            <main>
            <Suspense fallback={<div style={fallbackStyle}><FaSpinner/></div>}>
                    <Outlet/>
            </Suspense > 
            </main>
            </> 
              
}

export default Navigation;
