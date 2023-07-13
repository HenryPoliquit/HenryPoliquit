import React from 'react';
import '../App.css';
import {Link} from 'react-scroll';
import logo from '../assets/images/logo.png';

function Footer() {
    return (
            <footer className='bg-secondary'>
                <div className='container'>
                    <div className='wrap'>
                        <Link className='logo' to='home'><img className='d-inline-block align-top logo' src={logo} alt='Logo' /></Link>
                        <span className='text-dark'>@2023 Paul Henry Poliquit</span>
                    </div>
                </div>
            </footer>
    )
}

export default Footer;