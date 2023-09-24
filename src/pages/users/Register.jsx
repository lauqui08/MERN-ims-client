import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import runningPikachu from "../../../src/assets/pikachu-running.gif";
const Register = () => {
  const baseApi = import.meta.env.VITE_BASE_API;
  const [isLaoding, setIdLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [registration, setRegistration] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistration({ ...registration, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIdLoading(true);
    setErrorMessage("");
    if (registration.password != registration.confirmPassword) {
      setErrorMessage("Password not match!");
      setIdLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        baseApi + "users/register",
        registration
      );
      setRegistration({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setSuccessMessage(response.data.message);
      setIdLoading(false);
    } catch (error) {
      setIdLoading(false);
      setErrorMessage(error.response.data.error);
      console.log(error.message);
    }
  };
  return (
    <div className="container mt-5">
      <h4>Register User</h4>
      {errorMessage ? (
        <div className="alert alert-warning" role="alert">
          {errorMessage}
        </div>
      ) : (
        ""
      )}
      {successMessage ? (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      ) : (
        ""
      )}
      {isLaoding ? (
        <div className="d-flex justify-content-center">
          <img
            src={runningPikachu}
            style={{ width: "100px" }}
            alt="Loading..."
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-control p-3">
          <div className="mb-3">
            <label htmlFor="userType" className="form-label">
              Select Account Type
            </label>
            <select
              className="form-select mb-3"
              id="userType"
              name="userType"
              onChange={handleChange}
              value={registration.userType}
            >
              <option>Open this to select</option>
              <option value="admin">Admin</option>
              <option value="cashier">Cashier</option>
              <option value="inventory">Inventory Custodian</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              Fullname
            </label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              onChange={handleChange}
              value={registration.fullname}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleChange}
              value={registration.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
              value={registration.password}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              value={registration.confirmPassword}
            />
          </div>
          <div className="mb-3 text-end">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
