import React, { useEffect, useState } from "react";
import axios from "axios";
import runningPikachu from "../../assets/pikachu-running.gif";
import { Link } from "react-router-dom";

const HomeProduct = () => {
  const baseApi = import.meta.env.VITE_BASE_API;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");

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
  return (
    <div className="container mt-5">
      HomeProduct
      <div className="d-flex justify-content-end mb-3">
        {products[0] ? (
          <Link className="btn btn-info btn-sm" to={"/products/add"}>
            Add Product
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
                        <td>{productPrice}</td>
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
                  <td className=" text-center" colSpan="4">
                    No Record Found!
                  </td>
                  <td className="text-center">
                    <Link className="btn btn-info btn-sm" to={"/products/add"}>
                      Add Product
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

export default HomeProduct;
