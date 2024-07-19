import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';

const VerticalNavbar = () => {
    return (
        <nav>
            <ul>
              <li><Link to="/dashboard">Home</Link></li>
              <li><Link to="/dashboard/contact">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default VerticalNavbar;