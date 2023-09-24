import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import runningPikachu from "../../assets/pikachu-running.gif";
const ViewProducts = () => {
  const { id } = useParams();
  const baseApi = import.meta.env.VITE_BASE_API;
  const [products, setProducts] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(baseApi + "products/" + id);
      if (response.status !== 200) {
        setErrorMEssage("Failed to fetch data. Please try again.");
        return;
      }
      setProducts(response.data);
      setIsloading(false);
    };
    getProduct();
  }, []);

  const deleteSupplier = async (id) => {
    const validate = confirm("Are you sure you want to remove this product?");
    if (validate) {
      setIsloading(true);
      const response = await axios.delete(baseApi + "products/" + id);
      setProducts({});
      setIsloading(false);
    }
  };
  const { _id, productName, productPrice, productQuantity, productStatus } =
    products;
  return (
    <div className="container mt-5">
      ViewProducts
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <img
            src={runningPikachu}
            style={{ width: "100px" }}
            alt="Loading..."
          />
        </div>
      ) : products._id ? ( //if supplier is available
        <article className="p-3 shadow">
          <h4>
            Product Name:{" "}
            <span className="text-body-secondary">{productName}</span>
          </h4>

          <h4>
            Price: <span className="text-body-secondary">₱{productPrice}</span>
          </h4>
          <h4>
            Quantity:{" "}
            <span className="text-body-secondary">{productQuantity}</span>
          </h4>
          <h4>
            Status: <span className="text-body-secondary">{productStatus}</span>
          </h4>
          <div className="text-end mt-3">
            <Link to={"/products"}>Back to Lists</Link>
            <Link
              className="btn btn-info btn-sm mx-1"
              to={`/products/${id}/edit`}
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
            <Link to={"/products"}>Back to Lists</Link>
          </div>
        </section>
      )}
      <div className="row mt-5">
        <div className="col">
          <h5>Purchases</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="table-info">
                  <th>Supplier Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="col">
          <h5>Orders</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="table-info">
                  <th>Customer Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
