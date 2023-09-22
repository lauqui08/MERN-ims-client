import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//suppliers
import HomeSupplier from "./pages/suppliers/HomeSupplier";
import AddSupplier from "./pages/suppliers/AddSupplier";
import ViewSupplier from "./pages/suppliers/ViewSupplier";
import EditSupplier from "./pages/suppliers/EditSupplier";
//products
import HomeProduct from "./pages/products/HomeProduct";
import AddProduct from "./pages/products/AddProduct";
import ViewProduct from "./pages/products/ViewProduct";
import EditProduct from "./pages/products/EditProduct";
//purchases
import HomePurchase from "./pages/purchases/HomePurchase";
import AddPurchase from "./pages/purchases/AddPurchase";
import ViewPurchase from "./pages/purchases/ViewPurchase";
import ReceivePurchase from "./pages/purchases/ReceivePurchase";
//orders
import HomeOrder from "./pages/orders/HomeOrder";
import ViewOrder from "./pages/orders/ViewOrder";
import EditOrder from "./pages/orders/EditOrder";
import AddOrder from "./pages/orders/AddOrder";
//Login Register
import Login from "./pages/Login";
import Register from "./pages/Register";
//dashboard
import DashBoard from "./DashBoard";
//page not found
import PageNotFound from "./pages/PageNotFound";
import { useContext } from "react";
import { myContext } from "./context/LoginContext";
import { Navigate } from "react-router-dom";
function App() {
  const user = JSON.parse(useContext(myContext));
  console.log(user);
  return (
    <Router>
      <Nav />
      <Routes>
        {/* //suppliers */}
        <Route
          path="/suppliers"
          element={user ? <HomeSupplier /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/suppliers/add"
          element={user ? <AddSupplier /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/suppliers/:id"
          element={user ? <ViewSupplier /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/suppliers/:id/edit"
          element={user ? <EditSupplier /> : <Navigate to={"/login"} />}
        />
        {/* //products */}
        <Route
          path="/products"
          element={user ? <HomeProduct /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/products/add"
          element={user ? <AddProduct /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/products/:id"
          element={user ? <ViewProduct /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/products/:id/edit"
          element={user ? <EditProduct /> : <Navigate to={"/login"} />}
        />
        //purchases
        <Route
          path="/purchases"
          element={user ? <HomePurchase /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/purchases/add"
          element={user ? <AddPurchase /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/purchases/:id"
          element={user ? <ViewPurchase /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/purchases/:id/receive"
          element={user ? <ReceivePurchase /> : <Navigate to={"/login"} />}
        />
        {/* //orders //purchases */}
        <Route
          path="/orders"
          element={user ? <HomeOrder /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/orders/add"
          element={user ? <AddOrder /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/orders/:id"
          element={user ? <ViewOrder /> : <Navigate to={"/login"} />}
        />
        {/* //login register */}
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <Register />}
        />
        {/* //dashboard */}
        <Route
          path="/"
          element={user ? <DashBoard /> : <Navigate to={"/login"} />}
        />
        {/* //page not found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
