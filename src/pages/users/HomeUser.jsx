import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import runningPikachu from "../../assets/pikachu-running.gif";
import { Link } from "react-router-dom";
import { myContext } from "../../context/LoginContext";
const HomeUser = () => {
  const user = JSON.parse(useContext(myContext));
  const baseApi = import.meta.env.VITE_BASE_API;
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchBy, setSearchBy] = useState("fullname");

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get(baseApi + "users");
      if (response.status !== 200) {
        setErrorMEssage("Failed to fetch data. Please try again.");
        return;
      }
      setUsers(response.data);
      setIsLoading(false);
    };
    getAllUsers();
  }, [successMessage]);

  const handleChange = async (e) => {
    if (!e.target.value) {
      const response = await axios.get(baseApi + "users");
      return setUsers(response.data);
    } else {
      const response = await axios.get(
        baseApi + "users/" + searchBy + "/" + e.target.value + "/search"
      );
      setUsers(response.data);
    }
  };
  const handleUserStatus = async (id, fullname, userType, accountStatus) => {
    setSuccessMessage("");
    setErrorMEssage("");
    const confirmation = confirm(
      `Are you sure you want to Deactivate ${fullname} with Account Type ${userType}`
    );
    if (confirmation) {
      if (accountStatus === "active") {
        try {
          const response = await axios.patch(baseApi + "users/" + id, {
            accountStatus: "deactivated",
          });
          setSuccessMessage(response.data.message);
        } catch (error) {
          setErrorMEssage(error.response.data.error);
        }
      } else {
        try {
          const response = await axios.patch(baseApi + "users/" + id, {
            accountStatus: "active",
          });
          setSuccessMessage(response.data.message);
        } catch (error) {
          setErrorMEssage(error.response.data.error);
        }
      }
    }
  };
  return (
    <div className="container mt-5">
      <h4>USers</h4>
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
      <div className="d-flex justify-content-end mb-3">
        <Link className="btn btn-info btn-sm" to={"/register"}>
          Register
        </Link>
      </div>
      <div className="mb-2">
        <form className="row row-cols-lg-auto g-3 align-items-center">
          <div className="col-12">
            <label className="visually-hidden" htmlFor="searchBy">
              Search By
            </label>
            <div className="input-group">
              <div className="input-group-text bg-success">Search By :</div>
              <select
                onChange={(e) => setSearchBy(e.target.value)}
                className="form-select"
                id="searchBy"
              >
                <option value="fullname">Full Name</option>
                <option value="email">Email</option>
                <option value="userType">Account Type</option>
                <option value="accountStatus">Account Status</option>
              </select>
            </div>
          </div>

          <div className="col-12">
            <label className="visually-hidden" htmlFor="query">
              Query
            </label>
            <input
              onChange={handleChange}
              type="search"
              className="form-control"
              id="query"
            />
          </div>
        </form>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <img
            src={runningPikachu}
            style={{ width: "100px" }}
            alt="Loading..."
          />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-sm">
            <thead>
              <tr className="table-info">
                <th>Full Name</th>
                <th>Email</th>
                <th>Account Type</th>
                <th>Status</th>
                <th className="text-center">Option</th>
              </tr>
            </thead>
            <tbody>
              {users[0] ? (
                users.map(
                  ({ _id, fullname, email, userType, accountStatus }) => {
                    return (
                      <tr key={_id}>
                        <td>{fullname}</td>
                        <td>{email}</td>
                        <td>{userType}</td>
                        <td>{accountStatus}</td>
                        <td className=" text-center">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleUserStatus(
                                _id,
                                fullname,
                                userType,
                                accountStatus,
                                email
                              );
                            }}
                          >
                            {accountStatus === "active" ? (
                              <button
                                className="btn btn-danger btn-sm"
                                disabled={email === user.email ? true : false}
                              >
                                Deactivate
                              </button>
                            ) : (
                              <button className="btn btn-info btn-sm">
                                Activate
                              </button>
                            )}
                          </form>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td className=" text-center" colSpan="5">
                    No Record Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HomeUser;
