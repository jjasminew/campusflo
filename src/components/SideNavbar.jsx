import './SideNavbar.css'
import React from 'react';
import { Link } from 'react-router-dom';

export default function SideNavbar() {
  return (
    <div className="d-flex flex-column align-items-center px-5 pt-2 text-white min-vh-100" style={{backgroundColor: '#581518'}}>
      <ul className="nav nav-pills flex-column align-items-center align-items-sm-start" id="menu">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white px-0 align-middle">
            <span className="d-none d-sm-inline">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/locator" className="nav-link text-white px-0 align-middle">
            <span className="d-none d-sm-inline">Locator</span> 
          </Link>
        </li>
        <li>
          <Link to="/products" className="nav-link text-white px-0 align-middle">
            <span className="d-none d-sm-inline">Products</span> 
          </Link>
        </li>
        <li>
          <Link to="/community" className="nav-link text-white px-0 align-middle">
            <span className="d-none d-sm-inline">Community</span>
          </Link>
        </li>
      </ul>
   </div>
  )
}