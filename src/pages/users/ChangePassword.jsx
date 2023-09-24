import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../context/LoginContext";
import runningPikachu from "../../assets/pikachu-running.gif";
import axios from "axios";

const ChangePassword = () => {
  const user = JSON.parse(useContext(myContext));
  const baseApi = import.meta.env.VITE_BASE_API;
  const [isLaoding, setIdLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [registration, setRegistration] = useState({
    password: "",
    newPassword: "",
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
    setSuccessMessage("");
    try {
      const response = await axios.post(baseApi + "users/change-password", {
        ...registration,
        email: user.email,
      });
      setSuccessMessage(response.data.message);
      setRegistration({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIdLoading(false);
      // localStorage.removeItem("user");
      // window.location.reload();
    } catch (error) {
      setIdLoading(false);
      setErrorMessage(error.response.data.error);
      console.log(error.message);
    }
  };
  return (
    <div className="container mt-5">
      <h4>Change Password</h4>
      {successMessage ? (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      ) : (
        ""
      )}
      {errorMessage ? (
        <div className="alert alert-warning" role="alert">
          {errorMessage}
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
        <form onSubmit={handleSubmit} className="form-control p-5">
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Current Password
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
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              onChange={handleChange}
              value={registration.newPassword}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password
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

export default ChangePassword;
