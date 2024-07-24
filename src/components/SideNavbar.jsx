import './SideNavbar.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaBox, FaUsers } from 'react-icons/fa';

export default function SideNavbar() {
  return (
    <div className="d-flex flex-column align-items-center px-5 pt-3 text-white min-vh-100" style={{backgroundColor: '#581518'}}>
      <ul className="nav nav-pills flex-column align-items-center align-items-sm-start" id="menu">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white px-0 align-middle">
            <FaHome className="me-2" />
            <span className="d-none d-sm-inline navText">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/locator" className="nav-link text-white px-0 align-middle">
            <FaMapMarkerAlt className="me-2" />
            <span className="d-none d-sm-inline navText">Locator</span>
          </Link>
        </li>
        <li>
          <Link to="/products" className="nav-link text-white px-0 align-middle">
            <FaBox className="me-2" />
            <span className="d-none d-sm-inline navText">Products</span>
          </Link>
        </li>
        <li>
          <Link to="/community" className="nav-link text-white px-0 align-middle">
            <FaUsers className="me-2" />
            <span className="d-none d-sm-inline navText">Community</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}