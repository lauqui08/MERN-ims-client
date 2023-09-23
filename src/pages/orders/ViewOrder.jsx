import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { myContext } from "../../context/LoginContext";
import { useReactToPrint } from "react-to-print";
const ViewOrder = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Order receipt",
    onAfterPrint: () => console.log("Printed PDF successfully!"),
  });
  const data = JSON.parse(useContext(myContext));
  const { id } = useParams();
  const baseApi = import.meta.env.VITE_BASE_API;
  const [order, setOrder] = useState({});
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const viewOrder = async () => {
      const orderData = await axios.get(baseApi + "orders/" + id);
      setOrder(orderData.data);
    };
    const viewUser = async () => {
      const userData = await axios.get(
        baseApi + "users/" + data.email + "/info"
      );
      setUserInfo(userData.data);
    };
    viewOrder();
    viewUser();
  }, []);
  const price = order.price / order.quantity;

  return (
    <div className="container mt-5">
      Print Preview
      <div className="mt-3 shadow p-4">
        <div className="border mb-3 p-2" ref={componentRef}>
          <p>Printed By: {userInfo.fullname}</p>

          <div className="row">
            <div className="col">
              <h5>Customer Name: {order.customerName}</h5>
            </div>
            <div className="col">
              <h5>Order Number: {order.orderNumber}</h5>
            </div>
          </div>
          <p>Ordered Time: {order.createdAt}</p>
          <p>Released Time: {order.updatedAt}</p>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>₱{price}</td>
                  <td>₱{order.price}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-end">
          <Link className="mx-1" to={"/orders"}>
            Back to lists
          </Link>
          <button onClick={handlePrint} className="btn btn-secondary btn-sm">
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
