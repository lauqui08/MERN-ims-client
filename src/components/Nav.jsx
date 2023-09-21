import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Lauqui Inventory
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-info" to={"/products"}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-primary" to={"/suppliers"}>
                Suppliers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/purchases"}>
                Purchases
              </Link>
            </li>
          </ul>
          <span className="navbar-text">Welcome Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
