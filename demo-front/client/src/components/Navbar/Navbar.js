import React, { useState } from 'react';
import './Navbar.css';
import Logo from '../../img/logo.svg'
import { NavLink } from 'react-router-dom';


const NavBar = () => {
    const [click, setclick] = useState(false);

    const handleClick = () => setclick(!click)

    return (
        <nav className="NavbarItems">
            <img src={Logo} alt="logo" className="navbar-logo"></img>
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'} >
                <NavLink exact to="/" className="nav-links">
                    <li>Home</li>
                </NavLink>
                <NavLink exact to="/products" className="nav-links">
                    <li>Products</li>
                </NavLink>
                <NavLink exact to="/users" className="nav-links">
                    <li>Users</li>
                </NavLink>
                <NavLink exact to="/login" className="nav-links-mobile">
                    <li>Log in</li>
                </NavLink>
            </ul>
        </nav>
    )

}
export default NavBar