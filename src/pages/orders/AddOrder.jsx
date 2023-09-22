import runningPikachu from "../../assets/pikachu-running.gif";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const AddOrder = () => {
  const randomNumber = function () {
    var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
      timestamp +
      "xxxxxxxxxxxxxxxx"
        .replace(/[x]/g, function () {
          return ((Math.random() * 16) | 0).toString(16);
        })
        .toLowerCase()
    );
  };
  const baseApi = import.meta.env.VITE_BASE_API;
  const [orderNumber, setOrderNumber] = useState(randomNumber);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({
    customerName: "",
    product: "",
    quantity: "",
  });
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState("");
  const [isAddedOrder, setIsAddedOrder] = useState(false);
  useEffect(() => {
    const getAllPrpducts = async () => {
      try {
        const response = await axios.get(baseApi + "products");
        setProducts(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPrpducts();
  }, [isLoading]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAddedOrder(false);
    setErrorMEssage("");
    try {
      const response = await axios.post(baseApi + "orders", {
        ...order,
        orderNumber,
      });
      setOrder({
        product: "",
        quantity: "",
        customerName: order.customerName,
      });
      setIsloading(false);
      setIsAddedOrder(true);
    } catch (error) {
      console.log(error.message);
      setErrorMEssage(error.response.data.error);
    }
  };
  return (
    <div className="container mt-5">
      AddOrder
      {isAddedOrder ? (
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
          <label htmlFor="customerName" className="form-label">
            Customer Name
          </label>
          <input
            onChange={handleChange}
            value={order.customerName}
            type="text"
            className="form-control"
            id="customerName"
            name="customerName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="product" className="form-label">
            Select Product
          </label>
          <select
            className="form-select mb-3"
            id="product"
            name="product"
            onChange={handleChange}
            value={order.product}
          >
            <option>Open this to select Product</option>
            {products.map((product) => {
              return (
                <option key={product._id} value={product.productName}>
                  {product.productName}
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
            value={order.quantity}
            type="number"
            min={1}
            className="form-control"
            id="quantity"
            name="quantity"
          />
        </div>

        <div className="text-end">
          <Link to={"/orders"} className="mx-3">
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

export default AddOrder;
