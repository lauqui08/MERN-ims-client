import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { myContext } from "../context/LoginContext";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const NavigationBar = () => {
  const navigate = useNavigate();
  const baseApi = import.meta.env.VITE_BASE_API;
  const user = JSON.parse(useContext(myContext));
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          baseApi + "users/" + user.email + "/info"
        );
        setUserInfo(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserInfo();
  }, []);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to={"/"} className="navbar-brand">
            {"<"}Code{"/>"} De GO Inventory
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {user ? (
              <>
                <Nav className="me-auto">
                  <Link to={"/products"} className="nav-link">
                    Products
                  </Link>

                  <Link to={"/suppliers"} className="nav-link">
                    Suppliers
                  </Link>
                  <Link to={"/purchases"} className="nav-link">
                    Purchases
                  </Link>
                  <Link to={"/orders"} className="nav-link">
                    Orders
                  </Link>
                </Nav>

                <Nav>
                  <Nav.Link className="text-uppercase">
                    {userInfo.userType}
                  </Nav.Link>
                  <NavDropdown
                    title={userInfo.fullname}
                    id="collapsible-nav-dropdown"
                  >
                    <NavDropdown.Item>Action</NavDropdown.Item>
                    <NavDropdown.Item>Another action</NavDropdown.Item>
                    <NavDropdown.Item>Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
