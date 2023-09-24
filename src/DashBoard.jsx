import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faPeopleArrows,
  faCartShopping,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
const DashBoard = () => {
  const baseApi = import.meta.env.VITE_BASE_API;
  const [products, setProducts] = useState(0);
  const [suppliers, setSuppliers] = useState(0);
  const [purchases, setPurchases] = useState(0);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(baseApi + "products");
      setProducts(response.data.length);
    };
    const fetchSuppliers = async () => {
      const response = await axios.get(baseApi + "suppliers");
      setSuppliers(response.data.length);
    };
    const fetchPurchases = async () => {
      const response = await axios.get(baseApi + "purchases");
      setPurchases(response.data.length);
    };
    const fetchOrders = async () => {
      const response = await axios.get(baseApi + "orders");
      setOrders(response.data.length);
    };
    fetchProduct();
    fetchSuppliers();
    fetchPurchases();
    fetchOrders();
  }, []);
  return (
    <div className="container mt-5">
      <section id="service">
        <div className="container my-3 py-1">
          <div className="row">
            <div className="col-12">
              <h1 className="display-6 text-center mb-3">
                <b>Dashboard</b>
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
            <div className="row mt-4">
              <div className="col-md-6 mt-3">
                <Link
                  to={"/products"}
                  className="card p-3 text-decoration-none"
                >
                  <div className="card-body text-center ">
                    <div className="row">
                      <div className="col-md-8">
                        <div>
                          <h5 className="card-title mb-3 fs-4 fw-light ">
                            Products
                          </h5>
                          <p className="card-title mb-3 fs-4 fw-bold">
                            {products}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <FontAwesomeIcon
                          icon={faSuitcase}
                          className="fa-5x text-primary"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 mt-3">
                <Link
                  to={"/suppliers"}
                  className="card p-3 text-decoration-none"
                >
                  <div className="card-body text-center ">
                    <div className="row">
                      <div className="col-md-8">
                        <div>
                          <h5 className="card-title mb-3 fs-4 fw-light ">
                            Suppliers
                          </h5>
                          <p className="card-title mb-3 fs-4 fw-bold">
                            {suppliers}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <FontAwesomeIcon
                          icon={faPeopleArrows}
                          className="fa-5x text-primary"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 mt-3">
                <Link
                  to={"/purchases"}
                  className="card p-3 text-decoration-none"
                >
                  <div className="card-body text-center ">
                    <div className="row">
                      <div className="col-md-8">
                        <div>
                          <h5 className="card-title mb-3 fs-4 fw-light ">
                            Purchases
                          </h5>
                          <p className="card-title mb-3 fs-4 fw-bold">
                            {purchases}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className="fa-6x text-primary"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 mt-3">
                <Link to={"/orders"} className="card p-3 text-decoration-none">
                  <div className="card-body text-center ">
                    <div className="row">
                      <div className="col-md-8">
                        <div>
                          <h5 className="card-title mb-3 fs-4 fw-light ">
                            Orders
                          </h5>
                          <p className="card-title mb-3 fs-4 fw-bold">
                            {orders}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <FontAwesomeIcon
                          icon={faBagShopping}
                          className="fa-6x text-primary"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
