import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//suppliers
import HomeSupplier from "./pages/suppliers/HomeSupplier";
import AddSupplier from "./pages/suppliers/AddSupplier";
import ViewSupplier from "./pages/suppliers/ViewSupplier";
//products
import HomeProducts from "./pages/products/HomeProducts";
import AddProduct from "./pages/products/AddProduct";
import ViewProducts from "./pages/products/ViewProducts";
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
        //products
        <Route path="/products" element={<HomeProducts />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<ViewProducts />} />
        //page not found
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
