import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//suppliers
import HomeSupplier from "./pages/suppliers/HomeSupplier";
import AddSupplier from "./pages/suppliers/AddSupplier";
import ViewSupplier from "./pages/suppliers/ViewSupplier";
//products
import HomeProduct from "./pages/products/HomeProduct";
import AddProduct from "./pages/products/AddProduct";
import ViewProduct from "./pages/products/ViewProduct";
import EditProduct from "./pages/products/EditProduct";

import PageNotFound from "./pages/PageNotFound";
//purchases
import HomePurchase from "./pages/purchases/HomePurchase";
import AddPurchase from "./pages/purchases/AddPurchase";
import ViewPurchase from "./pages/purchases/ViewPurchase";
function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        //suppliers
        <Route path="/suppliers" element={<HomeSupplier />} />
        <Route path="/suppliers/add" element={<AddSupplier />} />
        <Route path="/suppliers/:id" element={<ViewSupplier />} />
        //products
        <Route path="/products" element={<HomeProduct />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<ViewProduct />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        //purchases
        <Route path="/purchases" element={<HomePurchase />} />
        <Route path="/purchases/add" element={<AddPurchase />} />
        <Route path="/purchases/:id" element={<ViewPurchase />} />
        //page not found
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
