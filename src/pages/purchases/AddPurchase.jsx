import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const AddPurchase = () => {
  const baseApi = import.meta.env.VITE_BASE_API;
  const [purchase, setPurchase] = useState({
    supplier: {},
    product: {},
    quantity: "",
  });
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");
  const [isAddedPurchase, setIsAddedPurchase] = useState(Boolean);
  useEffect(() => {
    const getAllSuppliers = async () => {
      const response = await axios.get(baseApi + "suppliers");
      setSuppliers(response.data);
    };
    const getAllProducts = async () => {
      const response = await axios.get(baseApi + "products");
      setProducts(response.data);
    };
    getAllSuppliers();
    getAllProducts();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchase({ ...purchase, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(baseApi + "purchases", purchase);
    if (!response) {
      setErrorMEssage("Failed to save data. Please try again.");
      return;
    }
    setPurchase({
      supplier: {},
      product: {},
      quantity: "",
    });
    setIsloading(false);
    setIsAddedPurchase(true);
  };
  console.log(purchase);
  return (
    <div className="container mt-5">
      AddPurchase
      <form onSubmit={handleSubmit} className="form-control shadow">
        <div className="mb-3">
          <label htmlFor="product" className="form-label">
            Select Product
          </label>
          <select
            className="form-select form-select-lg mb-3"
            id="product"
            name="product"
            onChange={handleChange}
          >
            <option>Open this to select Product</option>
            {products.map((product) => {
              return (
                <option key={product._id} value={JSON.stringify(product)}>
                  {product.productName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="supplier" className="form-label">
            Select Supplier
          </label>
          <select
            className="form-select form-select-lg mb-3"
            id="supplier"
            name="supplier"
            onChange={handleChange}
          >
            <option>Open this to select Supplier</option>
            {suppliers.map((supplier) => {
              return (
                <option key={supplier._id} value={JSON.stringify(supplier)}>
                  {supplier.supplierName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            onChange={handleChange}
            type="Number"
            min={1}
            className="form-control"
            id="quantity"
            name="quantity"
          />
        </div>
        <div className="text-end">
          <Link to={"/purchases"} className="mx-3">
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

export default AddPurchase;
