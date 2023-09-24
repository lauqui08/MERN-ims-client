import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useLoaderData,
} from "react-router-dom";
import { useContext } from "react";
import { myContext } from "../context/LoginContext";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const NavigationBar = () => {
  const location = useLocation();
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
      <Navbar collapseOnSelect expand="lg" className="bg-body-secondary">
        <Container>
          <Link to={"/"} className="navbar-brand">
            {"<"}Code{"/>"} De GO Inventory
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {user ? (
              <>
                <Nav className="me-auto">
                  {userInfo.userType == "admin" ||
                  userInfo.userType == "inventory" ? (
                    <>
                      {" "}
                      <Link
                        to={"/products"}
                        className={`nav-link ${
                          location.pathname.includes("products")
                            ? "text-primary fw-bolder"
                            : ""
                        }`}
                      >
                        Products
                      </Link>
                      <Link
                        to={"/suppliers"}
                        className={`nav-link ${
                          location.pathname.includes("suppliers")
                            ? "text-primary fw-bolder"
                            : ""
                        }`}
                      >
                        Suppliers
                      </Link>
                      <Link
                        to={"/purchases"}
                        className={`nav-link ${
                          location.pathname.includes("purchases")
                            ? "text-primary fw-bolder"
                            : ""
                        }`}
                      >
                        Purchases
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                  {userInfo.userType == "admin" ||
                  userInfo.userType == "cashier" ? (
                    <Link
                      to={"/orders"}
                      className={`nav-link ${
                        location.pathname.includes("orders")
                          ? "text-primary fw-bolder"
                          : ""
                      }`}
                    >
                      Orders
                    </Link>
                  ) : (
                    ""
                  )}
                </Nav>

                <Nav>
                  <Nav.Link className="text-uppercase">
                    {userInfo.userType}
                  </Nav.Link>
                  <NavDropdown
                    title={userInfo.fullname}
                    id="collapsible-nav-dropdown"
                  >
                    <Link to={"/change-password"} className="dropdown-item">
                      {" "}
                      Change Password
                    </Link>
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
