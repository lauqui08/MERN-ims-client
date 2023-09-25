import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const ReceivePurchase = () => {
  const { id } = useParams();
  const baseApi = import.meta.env.VITE_BASE_API;
  const [purchase, setPurchase] = useState({});
  const [quantityReceived, setQuantityReceived] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");

  useEffect(() => {
    const getPurchase = async () => {
      try {
        const response = await axios.get(baseApi + "purchases/" + id);
        setPurchase(response.data);
        setErrorMEssage(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPurchase();
  }, [isLoading]);

  const addReceivedQuantityToInventory = async (id, receivedQuantity) => {
    try {
      const response = await axios.patch(baseApi + "products/" + id, {
        productQuantity:
          Number(purchase.product.productQuantity) + Number(receivedQuantity),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMEssage("");
    if (Number(quantityReceived) == Number(purchase.quantity)) {
      const confirmation = confirm(
        "Quantity to received vs Quantity received is match. Are you sure you want to received this product?"
      );
      if (confirmation) {
        console.log(remarks);
        try {
          const response = await axios.patch(baseApi + "purchases/" + id, {
            quantityReceived,
            purchaseRemarks: remarks,
            purchaseStatus: "received",
          });
          addReceivedQuantityToInventory(
            purchase.product._id,
            quantityReceived
          );
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (remarks.trim()) {
        const confirmation = confirm(
          "Quantity to received vs Quantity received not match. Make sure that you porovided the appropriate remarks before you proceed. Are you sure you want to received this product?"
        );
        if (confirmation) {
          try {
            const response = await axios.patch(baseApi + "purchases/" + id, {
              quantityReceived,
              purchaseRemarks: remarks,
              purchaseStatus: "received",
            });
            addReceivedQuantityToInventory(
              purchase.product._id,
              quantityReceived
            );
            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        setErrorMEssage(
          "Quantity to received vs Quantity received not match! Please provide remarks."
        );
      }
    }
  };
  const { _id, supplier, product, quantity, purchaseStatus, createdAt } =
    purchase;
  return (
    <div className="container shadow p-5 mt-5">
      <h4>Product Receiving:</h4>

      {errorMessage ? (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      ) : (
        ""
      )}
      {purchase.purchaseStatus === "received" ? (
        <>
          <div className="alert alert-success" role="alert">
            Successfully received product.
          </div>
          <Link className="mx-1" to={"/purchases"}>
            Back to Lists
          </Link>
        </>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="col-6">
            <form className="form-control" onSubmit={handleSubmit}>
              <div className="row p-2">
                <div className="col-12 p-2">
                  <h5>Quantity to Received</h5>
                  <p className="text-center fs-3 fw-bolder">
                    {quantity} Pieces
                  </p>
                </div>
                <div className="col-12 p-2">
                  <div className="mb-3">
                    <label htmlFor="quantityReceived" className="form-label">
                      Quantity Received
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantityReceived"
                      name="quantityReceived"
                      onChange={(e) => setQuantityReceived(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 p-2">
                <label htmlFor="remarks" className="form-label">
                  Remarks
                </label>
                <textarea
                  className="form-control border border-primary"
                  id="remarks"
                  name="remarks"
                  onChange={(e) => setRemarks(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
              <div className="text-end">
                <Link className="mx-1" to={"/purchases"}>
                  Back to Lists
                </Link>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivePurchase;
