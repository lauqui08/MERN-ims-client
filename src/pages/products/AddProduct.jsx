import runningPikachu from "../../assets/pikachu-running.gif";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const AddProduct = () => {
  const baseApi = import.meta.env.VITE_BASE_API;
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    productQuantity: "",
  });
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");
  const [isAddedProduct, setIsAddedProduct] = useState(Boolean);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAddedProduct(false);
    setErrorMEssage("");
    try {
      const response = await axios.post(baseApi + "products", product);
      setProduct({
        productName: "",
        productPrice: "",
        productQuantity: "",
      });
      setIsloading(false);
      setIsAddedProduct(true);
    } catch (error) {
      console.log(error.message);
      setErrorMEssage("All field is required.");
    }
  };
  return (
    <div className="container mt-5">
      AddProduct
      {isAddedProduct ? (
        <div className="alert alert-success" role="alert">
          Successfully added product.
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
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            onChange={handleChange}
            value={product.productName}
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
            value={product.productPrice}
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
            value={product.productQuantity}
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
