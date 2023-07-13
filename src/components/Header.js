import React from 'react';
import '../App.css';
import {Link} from 'react-scroll';
import logo from '../assets/images/logo.png';

function Header() {
    return (
        <div className='sticky-top'>
            <nav className='navbar navbar-expand-sm bg-secondary'>
                <div className='container'>
                    <div className='navbar-nav'>
                        <Link className='logo' to='home'><img className='d-inline-block align-top logo' src={logo} alt='Logo' /></Link>
                    </div>
                    <button type="button" className='navbar-toggler'
                       aria-label='toggler' data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse justify-content-center' id='navbarCollapse'>
                        <div className='navbar-nav'>
                            <Link className='nav-item nav-link' to="home">HOME</Link>
                            <Link className='nav-item nav-link' to="about">ABOUT</Link>
                            <Link className='nav-item nav-link' to="project">PROJECTS</Link>
                            <Link className='nav-item nav-link' to="contact">CONTACT</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;