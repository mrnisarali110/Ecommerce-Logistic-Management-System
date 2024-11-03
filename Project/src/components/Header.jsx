import React from 'react';
import { Link } from 'react-router-dom';
import logisticsLogo from '../assets/image/logisticsLogo.png';  // Ensure this path is correct
import './Header.css'; // Ensure this path is correct

function Header({ showHeader }) { // Accept showHeader as a prop

    // Retrieve user details from local storage
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'User',
    email: 'Email',
    role: 'Role'
  };
//   console.log('use',user)
    return showHeader ? ( // Check if showHeader is true before rendering
        <header className="header-2 ">
            <nav>   
                <ul className="nav-list">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/business">Business</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/manual-form">Manual Form</Link></li> {/* Adjusted path to be hyphenated */}
                    <li><Link to="/tracking">Track Your Order</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/user-orders">Fetch Order</Link></li> {/* Adjusted path to be hyphenated */}
                    <li><Link to="/admin-dashboard">Admin Dashboard</Link></li> {/* Adjusted path to be hyphenated */}
                    <li><Link to="/orders-dashboard">Orders Dashboard</Link></li> {/* Adjusted path to be hyphenated */}
                </ul>
            </nav>
        </header>
    ) : null; // Return null if showHeader is false
}

export default Header;
