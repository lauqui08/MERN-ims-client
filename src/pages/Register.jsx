import axios from "axios";
import React, { useEffect, useState } from "react";

const Register = () => {
  const baseApi = import.meta.env.VITE_BASE_API;
  const [isLaoding, setIdLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      const response = await axios.post(baseApi + "users/register", {
        ...registration,
        userType: "admin",
      });
      setIdLoading(false);
      setRegistration({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setIdLoading(false);
      setErrorMessage(error.response.data.error);
      console.log(error.message);
    }
  };
  return (
    <div className="container mt-5">
      Register
      <p className="text-info bg-dark">
        Please write down your password. This initial registration is for admin
        account.
      </p>
      {errorMessage ? (
        <div className="alert alert-warning" role="alert">
          {errorMessage}
        </div>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit} className="form-control p-5">
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
          />
        </div>
        <div className="mb-3 text-end">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
