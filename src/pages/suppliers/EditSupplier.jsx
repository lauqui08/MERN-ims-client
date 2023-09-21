import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const EditSupplier = () => {
  const { id } = useParams();
  const baseApi = import.meta.env.VITE_BASE_API;
  const [supplier, setSupplier] = useState({
    supplierName: "",
    supplierAddress: "",
    supplierEmail: "",
    supplierContact: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUpdatedSupplier, setIsUpdatedSupplier] = useState(false);
  useEffect(() => {
    const getSuppplier = async () => {
      const response = await axios.get(baseApi + "suppliers/" + id);
      if (response.status !== 200) {
        setErrorMessage("Failed to fetch data. Please try again.");
        return;
      }
      setSupplier(response.data);
      setIsLoading(false);
    };
    getSuppplier();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await axios.patch(baseApi + "suppliers/" + id, supplier);
    if (!response) {
      setErrorMessage("Failed to fetch data. Please try again.");
      return;
    }
    setIsLoading(false);
    setIsUpdatedSupplier(true);
    //redirect to view page
  };
  const { supplierName, supplierEmail, supplierContact, supplierAddress } =
    supplier;
  return (
    <div className="container mt-5">
      EditSupplier
      {isUpdatedSupplier ? (
        <div className="alert alert-success" role="alert">
          Successfully updated supplier.
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          All field is required!
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-control shadow">
        <div className="mb-3">
          <label htmlFor="supplierName" className="form-label">
            Supplier Name
          </label>
          <input
            onChange={handleChange}
            value={supplierName}
            type="text"
            className="form-control"
            id="supplierName"
            name="supplierName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="supplierEmail" className="form-label">
            Email address
          </label>
          <input
            onChange={handleChange}
            value={supplierEmail}
            type="email"
            className="form-control"
            id="supplierEmail"
            name="supplierEmail"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="supplierContact" className="form-label">
            Contact Number
          </label>
          <input
            onChange={handleChange}
            value={supplierContact}
            type="text"
            className="form-control"
            id="supplierContact"
            name="supplierContact"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="supplierAddress" className="form-label">
            Address
          </label>
          <textarea
            onChange={handleChange}
            className="form-control"
            id="supplierAddress"
            name="supplierAddress"
            rows="3"
            value={supplierAddress}
          ></textarea>
        </div>
        <div className="text-end">
          <Link to={"/suppliers"} className="mx-3">
            Back to Lists
          </Link>
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSupplier;
