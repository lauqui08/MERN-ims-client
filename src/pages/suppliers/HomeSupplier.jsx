import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import runningPikachu from "../../assets/pikachu-running.gif";
const HomeSupplier = () => {
  const baseApi = import.meta.env.VITE_BASE_API;
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");

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
  return (
    <div className="container mt-5">
      HomeSupplier
      <div className="d-flex justify-content-end mb-3">
        {suppliers[0] ? (
          <Link className="btn btn-primary btn-sm" to={"/suppliers/add"}>
            Add Supplier
          </Link>
        ) : (
          ""
        )}
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
              <tr className="table-primary">
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
                            className="btn btn-primary btn-sm"
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
                  <td className=" text-center" colSpan="4">
                    No Record Found!
                  </td>
                  <td className="text-center">
                    <Link
                      className="btn btn-primary btn-sm"
                      to={"/suppliers/add"}
                    >
                      Add Supplier
                    </Link>
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
