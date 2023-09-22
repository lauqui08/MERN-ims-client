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
//page not found
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        //suppliers
        <Route path="/suppliers" element={<HomeSupplier />} />
        <Route path="/suppliers/add" element={<AddSupplier />} />
        <Route path="/suppliers/:id" element={<ViewSupplier />} />
        <Route path="/suppliers/:id/edit" element={<EditSupplier />} />
        //products
        <Route path="/products" element={<HomeProduct />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<ViewProduct />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        //purchases
        <Route path="/purchases" element={<HomePurchase />} />
        <Route path="/purchases/add" element={<AddPurchase />} />
        <Route path="/purchases/:id" element={<ViewPurchase />} />
        <Route path="/purchases/:id/receive" element={<ReceivePurchase />} />
        //orders //purchases
        <Route path="/orders" element={<HomeOrder />} />
        <Route path="/orders/add" element={<AddOrder />} />
        <Route path="/orders/:id" element={<ViewOrder />} />
        //page not found
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
