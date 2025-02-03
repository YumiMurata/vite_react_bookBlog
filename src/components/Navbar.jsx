import styles from'./Navbar.module.css';

import { useAuthentication } from '../hooks/useAuthentication';
import { useAuthValue } from '../context/AuthContext';

import {NavLink} from 'react-router-dom';

import logo from '../assets/bookLogo.svg';

const Navbar = () => {

    const {user} = useAuthValue();
    const{logout} = useAuthentication();

  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <p><span >Book</span> Blog</p>

        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to ="/home" className={({isActive})=>(isActive ? styles.active:'')} >Home</NavLink>
            
            </li>
            <li>
                <NavLink to= "/about" className={({isActive})=>(isActive ? styles.active:'')}>About</NavLink>
            </li>
            {/*If the user is logged, these options wont be shown */}
            {!user &&(
                <>
                    <li>
                        <NavLink to= "/register" className={({isActive})=>(isActive ? styles.active:'')}>Register</NavLink>
                    </li>
                    <li>
                        <NavLink to= "/login" className={({isActive})=>(isActive ? styles.active:'')}>Login</NavLink>
                    </li>
                </>
            )}
            {user &&(
                <>
                    <li>
                        <NavLink to= "/posts/create" className={({isActive})=>(isActive ? styles.active:'')}>Create Post</NavLink>
                    </li>
                    <li>
                        <NavLink to= "/dashboard" className={({isActive})=>(isActive ? styles.active:'')}>Dashboard</NavLink>
                    </li>
                </>
            )}
            {user &&(
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar