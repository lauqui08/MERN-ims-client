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
          <Navbar.Brand onClick={() => navigate("/")}>
            {"<"}Code{"/>"} De GO Inventory
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/products")}>
                Products
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/suppliers")}>
                Suppliers
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/purchases")}>
                Purchases
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/orders")}>Orders</Nav.Link>
            </Nav>
            {user ? (
              <Nav>
                <Nav.Link href="#deets" className="text-uppercase">
                  {userInfo.userType}
                </Nav.Link>
                <NavDropdown
                  title={userInfo.fullname}
                  id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
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
