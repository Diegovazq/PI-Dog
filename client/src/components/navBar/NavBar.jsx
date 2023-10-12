import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom/cjs/react-router-dom'

const NavBar = () => {   
  return (
    <div className='mainContainer-NavBar'>
      <ul className='lista-NavBar'>
        <Link to='/home' >
        <li>Inicio</li>
        </Link>
        
        <Link to='/createDog'>
        <li>Crear Perrito</li>
        </Link>
      </ul>
    </div>
  )
}

export default NavBar