import { useState } from "react";
import styles from "./Navbar.module.css";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import logo from "../assets/bookLogo.svg";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [menuOpen, setMenuOpen] = useState(false);  // State to toggle menu

  // Function to close menu after clicking a link
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      {/* Brand / Logo */}
      <NavLink to="/" className={styles.brand} onClick={closeMenu}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <p>
          <span>Book</span> Blog
        </p>
      </NavLink>

      {/* Hamburger Button */}
      <button 
        className={styles.hamburger} 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Navigation Links */}
      <ul className={`${styles.links_list} ${menuOpen ? styles.open : ""}`}>
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? styles.active : "")} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")} onClick={closeMenu}>
            About
          </NavLink>
        </li>

        {!user && (
          <>
            <li>
              <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")} onClick={closeMenu}>
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")} onClick={closeMenu}>
                Login
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : "")} onClick={closeMenu}>
                Create Post
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")} onClick={closeMenu}>
                Dashboard
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <li>
            <button onClick={() => { logout(); closeMenu(); }}>Log Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
