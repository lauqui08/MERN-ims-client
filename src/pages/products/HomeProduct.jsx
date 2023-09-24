import React, { useEffect, useState } from "react";
import axios from "axios";
import runningPikachu from "../../assets/pikachu-running.gif";
import { Link } from "react-router-dom";

const HomeProduct = () => {
  const baseApi = import.meta.env.VITE_BASE_API;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");
  const [searchBy, setSearchBy] = useState("productName");

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await axios.get(baseApi + "products");
      if (response.status !== 200) {
        setErrorMEssage("Failed to fetch data. Please try again.");
        return;
      }
      setProducts(response.data);
      setIsLoading(false);
    };
    getAllProducts();
  }, []);

  const handleChange = async (e) => {
    if (!e.target.value) {
      const response = await axios.get(baseApi + "products");
      return setProducts(response.data);
    } else {
      const response = await axios.get(
        baseApi + "products/" + searchBy + "/" + e.target.value + "/search"
      );
      setProducts(response.data);
    }
  };
  return (
    <div className="container mt-5">
      HomeProduct
      <div className="d-flex justify-content-end mb-3">
        <Link className="btn btn-info btn-sm" to={"/products/add"}>
          Add Product
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
                <option value="productName">Product Name</option>
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
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th className="text-center">Option</th>
              </tr>
            </thead>
            <tbody>
              {products[0] ? (
                products.map(
                  ({
                    _id,
                    productName,
                    productPrice,
                    productQuantity,
                    productStatus,
                  }) => {
                    return (
                      <tr key={_id}>
                        <td>{productName}</td>
                        <td>₱{productPrice}</td>
                        <td>{productQuantity}</td>
                        <td>{productStatus}</td>
                        <td className=" text-center">
                          <Link
                            className="btn btn-info btn-sm"
                            to={`/products/${_id}`}
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

export default HomeProduct;
