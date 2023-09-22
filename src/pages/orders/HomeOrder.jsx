import React, { useEffect, useState } from "react";
import axios from "axios";
import runningPikachu from "../../assets/pikachu-running.gif";
import { Link } from "react-router-dom";

const HomeOrder = () => {
  const baseApi = import.meta.env.VITE_BASE_API;
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");

  useEffect(() => {
    const getAllOrders = async () => {
      const response = await axios.get(baseApi + "orders");
      if (response.status !== 200) {
        setErrorMEssage("Failed to fetch data. Please try again.");
        return;
      }
      setOrders(response.data);
      setIsLoading(false);
    };
    getAllOrders();
  }, [isLoading]);
  const cancelOrder = async (id) => {
    setIsLoading(true);
    const validate = confirm(
      "Are you sure you want to cancel this order? This will be deleted on the system."
    );
    if (validate) {
      const response = await axios.delete(baseApi + "orders/" + id);
      setIsLoading(false);
    }
  };

  const checkOutOrder = async (id, product, quantity) => {
    setIsLoading(true);

    try {
      const validate = confirm("Are you sure you want to checkout this order?");
      if (validate) {
        const order = await axios.patch(baseApi + "orders/" + id, {
          orderStatus: "checkout",
        });
        checkOutUpdateProductQuantity(product, quantity);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const checkOutUpdateProductQuantity = async (productName, quantitySold) => {
    await axios.patch(
      baseApi + `products/${productName}/updateProductQuantity`,
      {
        quantitySold,
      }
    );
  };
  return (
    <div className="container mt-5">
      HomeOrder
      <div className="d-flex justify-content-end mb-3">
        {orders[0] ? (
          <Link className="btn btn-info btn-sm" to={"/orders/add"}>
            Add Order
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
        <div className="table-responsive shadow">
          <table className="table table-hover table-bordered table-sm">
            <thead>
              <tr className="table-info">
                <th>Customer Name</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-center">Option</th>
              </tr>
            </thead>
            <tbody>
              {orders[0] ? (
                orders.map(
                  ({
                    _id,
                    customerName,
                    product,
                    quantity,
                    price,
                    orderStatus,
                  }) => {
                    return (
                      <tr key={_id}>
                        <td>{customerName}</td>
                        <td>{product}</td>
                        <td>{quantity}</td>
                        <td>{price}</td>
                        <td>{orderStatus}</td>
                        <td className=" text-center">
                          {orderStatus === "pending" && (
                            <Link
                              onClick={() => cancelOrder(_id)}
                              className="btn btn-danger btn-sm mx-1"
                            >
                              Cancel
                            </Link>
                          )}
                          {orderStatus === "pending" && (
                            <Link
                              onClick={() =>
                                checkOutOrder(_id, product, quantity)
                              }
                              className="btn btn-primary btn-sm mx-1"
                            >
                              Checkout
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
                    <Link className="btn btn-info btn-sm" to={"/orders/add"}>
                      Add Order
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

export default HomeOrder;
