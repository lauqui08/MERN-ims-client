import runningPikachu from "../../assets/pikachu-running.gif";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const AddSupplier = () => {
  const baseApi = import.meta.env.VITE_BASE_API;
  const [supplier, setSupplier] = useState({
    supplierName: "",
    supplierAddress: "",
    supplierEmail: "",
    supplierContact: "",
  });
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");
  const [isAddedSupplier, setIsAddedSupplier] = useState(Boolean);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAddedSupplier(false);
    setErrorMEssage("");
    try {
      const response = await axios.post(baseApi + "suppliers", supplier);
      setSupplier({
        supplierName: "",
        supplierAddress: "",
        supplierEmail: "",
        supplierContact: "",
      });
      setIsloading(false);
      setIsAddedSupplier(true);
    } catch (error) {
      console.log(error.message);
      setErrorMEssage(error.response.data.error);
    }
  };
  return (
    <div className="container mt-5">
      {isAddedSupplier ? (
        <div className="alert alert-success" role="alert">
          Successfully added supplier.
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
      <form onSubmit={handleSubmit} className="form-control shadow">
        <div className="mb-3">
          <label htmlFor="supplierName" className="form-label">
            Supplier Name
          </label>
          <input
            onChange={handleChange}
            value={supplier.supplierName}
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
            value={supplier.supplierEmail}
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
            value={supplier.supplierContact}
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
            value={supplier.supplierAddress}
          ></textarea>
        </div>
        <div className="text-end">
          <Link to={"/suppliers"} className="mx-3">
            Back to Lists
          </Link>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplier;
