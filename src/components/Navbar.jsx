import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "../css/Navbar.css"
import logo from "./logo.png"

const Navbar = () => {
  return (
    <nav className="navbar">

    <div className='navbar-brand'>
    {/* <img className='img-size' src={logo} alt="logo" /> */}
        <Link to="/">Vflix</Link>
    </div>

    <div className='navbar-links'>
        <Link to="/" className='nav-link'>Home</Link>
        <Link to="/favourites" className='nav-link'>Favourites</Link>
    </div>
    </nav>
  )
}

export default Navbar
