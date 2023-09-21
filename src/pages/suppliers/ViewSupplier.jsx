import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import runningPikachu from "../../assets/pikachu-running.gif";
const ViewSupplier = () => {
  const { id } = useParams();
  const baseApi = import.meta.env.VITE_BASE_API;
  const [supplier, setSupplier] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");

  useEffect(() => {
    const getSupplier = async () => {
      const response = await axios.get(baseApi + "suppliers/" + id);
      if (response.status !== 200) {
        setErrorMEssage("Failed to fetch data. Please try again.");
        return;
      }
      setSupplier(response.data);
      setIsloading(false);
    };
    getSupplier();
  }, []);

  const deleteSupplier = async (id) => {
    const validate = confirm("Are you sure you want to delete this supplier?");
    if (validate) {
      setIsloading(true);
      const response = await axios.delete(baseApi + "suppliers/" + id);
      setSupplier({});
      setIsloading(false);
    }
  };
  const { _id, supplierName, supplierAddress, supplierEmail, supplierContact } =
    supplier;
  return (
    <div className="container mt-5">
      ViewSupplier
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <img
            src={runningPikachu}
            style={{ width: "100px" }}
            alt="Loading..."
          />
        </div>
      ) : supplier._id ? ( //if supplier is available
        <article className="p-3 shadow">
          <h3>
            Supplier Name:{" "}
            <span className="text-body-secondary">{supplierName}</span>
          </h3>
          <h4>
            Address:{" "}
            <span className="text-body-secondary">{supplierAddress}</span>
          </h4>
          <h4>
            Email: <span className="text-body-secondary">{supplierEmail}</span>
          </h4>
          <h4>
            Contact:{" "}
            <span className="text-body-secondary">{supplierContact}</span>
          </h4>
          <div className="text-end mt-3">
            <Link to={"/suppliers"}>Back to Lists</Link>
            <Link
              className="btn btn-info btn-sm mx-1"
              to={`/suppliers/${id}/edit`}
            >
              Edit
            </Link>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                deleteSupplier(id);
              }}
            >
              Delete
            </button>
          </div>
        </article>
      ) : (
        //if supplier is not available
        <section className="p-3 shadow">
          <h5>No Record Found!</h5>
          <div>
            <Link to={"/suppliers"}>Back to Lists</Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default ViewSupplier;
