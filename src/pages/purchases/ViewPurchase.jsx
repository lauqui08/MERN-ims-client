import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import runningPikachu from "../../assets/pikachu-running.gif";
const ViewPurchase = () => {
  const { id } = useParams();
  const baseApi = import.meta.env.VITE_BASE_API;
  const [purchase, setPurchase] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");

  useEffect(() => {
    const getPurchase = async () => {
      const response = await axios.get(baseApi + "purchases/" + id);
      if (response.status !== 200) {
        setErrorMEssage("Failed to fetch data. Please try again.");
        return;
      }
      setPurchase(response.data);
      setIsloading(false);
    };
    getPurchase();
  }, [isLoading]);
  const cancelPurchase = async (id) => {
    const validate = confirm("Are you sure you want to delete this supplier?");
    if (validate) {
      setIsloading(true);
      const response = await axios.delete(baseApi + "purchases/" + id);
      setPurchase({});
      setIsloading(false);
    }
  };
  const approvePurchase = async (id) => {
    setIsloading(true);
    const validate = confirm(
      "Are you sure you want to proceed. The status of this purchase will be change to ordered?"
    );
    if (validate) {
      const response = await axios.patch(baseApi + "purchases/" + id, {
        purchaseStatus: "ordered",
      });
      setIsloading(false);
    }
  };
  const {
    _id,
    supplier,
    product,
    quantity,
    purchaseStatus,
    createdAt,
    updatedAt,
    purchaseRemarks,
  } = purchase;
  return (
    <div className="container mt-5">
      ViewPurchase
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <img
            src={runningPikachu}
            style={{ width: "100px" }}
            alt="Loading..."
          />
        </div>
      ) : purchase._id ? ( //if purchase is available
        <div className="row shadow p-5">
          <h5>
            Purchase Item:{" "}
            <span className="text-body-secondary">{product.productName}</span>
          </h5>
          <div className="col border p-2">
            <div className="table-responsive">
              <table className="table table-primary">
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Quantity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{supplier.supplierName}</td>
                    <td>{quantity}</td>
                    <td>{purchaseStatus}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* display inventory */}
          {purchaseStatus === "received" ? (
            <div className="col border p-2">
              <div className="table-responsive">
                <table className="table table-info">
                  <thead>
                    <tr>
                      <th>Quantity Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{purchase.quantityReceived}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="col border p-2">
              <div className="table-responsive">
                <table className="table table-info">
                  <thead>
                    <tr>
                      <th>Stock</th>
                      {purchaseStatus == "ordered" ? (
                        <th>New Stock Once Received</th>
                      ) : (
                        ""
                      )}
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{product.productQuantity}</td>
                      {purchaseStatus == "ordered" ? (
                        <td>{product.productQuantity + quantity}</td>
                      ) : (
                        ""
                      )}
                      <td>
                        {" ₱ "}
                        {product.productPrice}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* display supplier details */}
          <div className="col-12 border p-2">
            <div className="table-responsive">
              <table className="table table-primary">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{supplier.supplierAddress}</td>
                    <td>{supplier.supplierEmail}</td>
                    <td>{supplier.supplierContact}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* display when product is laready received */}
          {purchaseStatus === "received" ? (
            <div className="col-12 border p-2">
              <div className="table-responsive">
                <table className="table table-primary">
                  <thead>
                    <tr>
                      <th>Ordered Date</th>
                      <th>Received Date</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{createdAt}</td>
                      <td>{updatedAt}</td>
                      <td>{purchaseRemarks}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="text-end mt-3">
            <Link to={"/purchases"}>Back to Lists</Link>
            {purchaseStatus === "received" ? (
              ""
            ) : (
              <>
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => {
                    cancelPurchase(id);
                  }}
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
            )}
          </div>
        </div>
      ) : (
        //if supplier is not available
        <section className="p-3 shadow">
          <h5>No Record Found!</h5>
          <div>
            <Link to={"/purchases"}>Back to Lists</Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default ViewPurchase;
