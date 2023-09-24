import runningPikachu from "../../src/assets/pikachu-running.gif";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../context/LoginContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const user = useContext(myContext);
  const [isLoading, setIsLoading] = useState(true);
  const [checkAdmin, setCheckAdmin] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const baseApi = import.meta.env.VITE_BASE_API;
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsLoading(false);
    const adminCheck = async () => {
      try {
        const response = await axios.get(baseApi + "users/checkAdmin");
        setCheckAdmin(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.response.data.error);
        setIsLoading(false);
      }
    };
    adminCheck();
  }, [isLoading]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await axios.post(baseApi + "users/login", { ...login });
      localStorage.setItem("user", JSON.stringify(response.data));
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setIsLoading(false);
      console.log(error.message);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center mt-5 ">
        {errorMessage ? (
          <div className="alert alert-warning" role="alert">
            {errorMessage}
          </div>
        ) : (
          ""
        )}
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <img
              style={{ width: "100px" }}
              src={runningPikachu}
              alt="Loading..."
            />
          </div>
        ) : (
          <Form
            onSubmit={handleSubmit}
            className="col-md-5 shadow mt-3  rounded p-5"
          >
            <div className="text-center">
              <FontAwesomeIcon icon={faUserSecret} className="fa-5x " />
            </div>
            <h1 className="mb-5 mt-2 text-center">
              Inventory Management System
            </h1>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  className="mb3"
                  onChange={handleChange}
                  value={login.email}
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  onChange={handleChange}
                  type="password"
                  name="password"
                  value={login.password}
                  placeholder="Password"
                />
              </Col>
            </Form.Group>
            <div className="text-end">
              {checkAdmin ? (
                ""
              ) : (
                <Link to={"/register"} className="mx-2">
                  Register
                </Link>
              )}
              <Button
                type="submit"
                variant="primary"
                className="btn btn-primary rounded px-4"
              >
                Login
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

export default Login;
