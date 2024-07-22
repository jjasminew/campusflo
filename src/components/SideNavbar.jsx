import React from 'react';
import { Link } from 'react-router-dom';

export default function SideNavbar() {
  return (
    <div class="d-flex flex-column align-items-center align-items-sm-start px-5 pt-3 text-white min-vh-100" style={{backgroundColor: '#581518'}}>
      <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
        <li class="nav-item">
          <Link to="/" class="nav-link text-white px-0 align-middle">
            <span class="d-none d-sm-inline">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/locator" class="nav-link text-white px-0 align-middle">
            <span class="d-none d-sm-inline">Locator</span> 
          </Link>
        </li>
        <li>
          <Link to="/products" class="nav-link text-white px-0 align-middle">
            <span class="d-none d-sm-inline">Products</span> 
          </Link>
        </li>
        <li>
          <Link to="/community" class="nav-link text-white px-0 align-middle">
            <span class="d-none d-sm-inline">Community</span>
          </Link>
        </li>
      </ul>
   </div>
  )
}