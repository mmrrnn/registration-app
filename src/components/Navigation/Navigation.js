import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
    const location = useLocation();

    const navClassName = path => {
        return location.pathname === path 
            ? 'nav-link active' : 'nav-link';
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Registration App</Link>

            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className={navClassName('/')}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/table" className={navClassName('/table')}>Schedule</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
