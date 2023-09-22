import React, { useEffect, useState } from "react";
import axios from "axios";
import runningPikachu from "../../assets/pikachu-running.gif";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

const HomePurchase = () => {
  const baseApi = import.meta.env.VITE_BASE_API;
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");

  useEffect(() => {
    const getAllPurchases = async () => {
      const response = await axios.get(baseApi + "purchases");
      if (response.status !== 200) {
        setErrorMEssage("Failed to fetch data. Please try again.");
        return;
      }
      setPurchases(response.data);
      setIsLoading(false);
    };
    getAllPurchases();
  }, [isLoading]);

  const approvePurchase = async (id) => {
    setIsLoading(true);
    const validate = confirm(
      "Are you sure you want to proceed. The status of this purchase will be change to ordered?"
    );
    if (validate) {
      const response = await axios.patch(baseApi + "purchases/" + id, {
        purchaseStatus: "ordered",
      });
      setIsLoading(false);
    }
  };

  const cancelPurchase = async (id) => {
    setIsLoading(true);
    const validate = confirm(
      "Are you sure you want to cancel this purchase? This will be deleted on the system."
    );
    if (validate) {
      const response = await axios.delete(baseApi + "purchases/" + id);
      setIsLoading(false);
    }
  };
  return (
    <div className="container mt-5">
      HomePurchase
      <div className="d-flex justify-content-end mb-3">
        {purchases[0] ? (
          <Link className="btn btn-info btn-sm" to={"/purchases/add"}>
            Add Purchase
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
                <th>Supplier Name</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th className="text-center">Option</th>
              </tr>
            </thead>
            <tbody>
              {purchases[0] ? (
                purchases.map(
                  ({ _id, supplier, product, quantity, purchaseStatus }) => {
                    return (
                      <tr key={_id}>
                        <td>
                          <Accordion>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                {supplier.supplierName}
                              </Accordion.Header>
                              <Accordion.Body>
                                <p>Address: {supplier.supplierAddress}</p>
                                <p>Email: {supplier.supplierEmail}</p>
                                <p>contact: {supplier.supplierContact}</p>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </td>
                        <td>
                          <Accordion>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                {product.productName}
                              </Accordion.Header>
                              <Accordion.Body>
                                <p>Price: {product.productPrice}</p>
                                <p>Stock: {product.productQuantity}</p>
                                <p>Status: {product.productStatus}</p>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </td>
                        <td>{quantity}</td>
                        <td>{purchaseStatus}</td>

                        <td className=" text-center">
                          {purchaseStatus === "ordered" ||
                          purchaseStatus === "pending" ? (
                            <>
                              <Link
                                className="btn btn-info btn-sm"
                                to={`/purchases/${_id}`}
                              >
                                View
                              </Link>
                              <button
                                onClick={() => cancelPurchase(_id)}
                                className="btn btn-danger btn-sm mx-1"
                              >
                                Cancel
                              </button>
                              {purchaseStatus == "ordered" ? (
                                <>
                                  <Link
                                    className="btn btn-primary btn-sm"
                                    to={`/purchases/${_id}/receive`}
                                  >
                                    Receive
                                  </Link>
                                </>
                              ) : (
                                <button
                                  onClick={() => approvePurchase(_id)}
                                  className="btn btn-primary btn-sm"
                                >
                                  Proceed
                                </button>
                              )}
                            </>
                          ) : (
                            <Link
                              className="btn btn-info btn-sm"
                              to={`/purchases/${_id}`}
                            >
                              View
                            </Link>
                          )}
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
                    <Link className="btn btn-info btn-sm" to={"/purchases/add"}>
                      Add Purchase
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

export default HomePurchase;
