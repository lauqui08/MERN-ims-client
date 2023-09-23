import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import runningPikachu from "../../assets/pikachu-running.gif";
const HomeSupplier = () => {
  const baseApi = import.meta.env.VITE_BASE_API;
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");
  const [searchBy, setSearchBy] = useState("supplierName");
  useEffect(() => {
    const getAllSuppliers = async () => {
      const response = await axios.get(baseApi + "suppliers");
      if (response.status !== 200) {
        setErrorMEssage("Failed to fetch data. Please try again.");
        return;
      }
      setSuppliers(response.data);
      setIsloading(false);
    };
    getAllSuppliers();
  }, []);
  const handleChange = async (e) => {
    if (!e.target.value) {
      const response = await axios.get(baseApi + "suppliers");
      return setSuppliers(response.data);
    } else {
      const response = await axios.get(
        baseApi + "suppliers/" + searchBy + "/" + e.target.value + "/search"
      );
      setSuppliers(response.data);
    }
  };
  return (
    <div className="container mt-5">
      HomeSupplier
      <div className="d-flex justify-content-end mb-3">
        <Link className="btn btn-info btn-sm" to={"/suppliers/add"}>
          Add Supplier
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
                <option value="supplierName">Supplier Name</option>
                <option value="supplierAddress">Address</option>
                <option value="supplierEmail">Email</option>
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
                <th>Supplier Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Contact</th>
                <th className="text-center">Option</th>
              </tr>
            </thead>
            <tbody>
              {suppliers[0] ? (
                suppliers.map(
                  ({
                    _id,
                    supplierName,
                    supplierAddress,
                    supplierEmail,
                    supplierContact,
                  }) => {
                    return (
                      <tr key={_id}>
                        <td>{supplierName}</td>
                        <td>{supplierAddress}</td>
                        <td>{supplierEmail}</td>
                        <td>{supplierContact}</td>
                        <td className=" text-center">
                          <Link
                            className="btn btn-info btn-sm"
                            to={`/suppliers/${_id}`}
                          >
                            View
                          </Link>
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

export default HomeSupplier;
