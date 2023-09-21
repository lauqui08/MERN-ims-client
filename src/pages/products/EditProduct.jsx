import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const EditProduct = () => {
  const { id } = useParams();
  const baseApi = import.meta.env.VITE_BASE_API;
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    productQuantity: "",
    productStatus: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(baseApi + "products/" + id);
      if (response.status !== 200) {
        setErrorMessage("Failed to fetch data. Please try again.");
        return;
      }
      setProduct(response.data);
      setIsLoading(false);
    };
    getProduct();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await axios.patch(baseApi + "products/" + id, product);
    if (!response) {
      setErrorMessage("Failed to fetch data. Please try again.");
      return;
    }
    setIsLoading(false);
    //redirect to view page
  };
  const { _id, productName, productPrice, productQuantity, productStatus } =
    product;
  return (
    <div className="container mt-5">
      {" "}
      <form onSubmit={handleSubmit} className="form-control shadow">
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            onChange={handleChange}
            value={productName}
            type="text"
            className="form-control"
            id="productName"
            name="productName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Price
          </label>
          <input
            onChange={handleChange}
            value={productPrice}
            type="number"
            min={1}
            className="form-control"
            id="productPrice"
            name="productPrice"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productQuantity" className="form-label">
            Quantity
          </label>
          <input
            onChange={handleChange}
            value={productQuantity}
            type="number"
            min={1}
            className="form-control"
            id="productQuantity"
            name="productQuantity"
          />
        </div>

        <div className="text-end">
          <Link to={"/products"} className="mx-3">
            Back to Lists
          </Link>
          <button className="btn btn-info" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
