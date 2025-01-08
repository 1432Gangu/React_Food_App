
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Admin from "./component/Admnin/Admin";
import AdminLogin from "./component/Admnin/AdminLogin";
import ItemEdit from "./component/Admnin/ItemEdit";
import Login from "./component/Admnin/Login";
import RestaurantDetail from "../src/Restaurants/RestaurantDetail "
import AdminDashboard from "./component/Admnin/AdminDashboard";
import ProductDetails from "../src/component/ProductDetails "
import ProductList from "./Restaurants/ProductList";
import DeleteProductList from "./Restaurants/DeleteProductList";
import RestaurantList from "./Restaurants/RestaurantList";
import AllRestaurants from "./Restaurants/AllRestaurent";

function App() {

  const Layout = ({ children }) => {
    const location = useLocation();

    const hideNavbarFooterRoutes = [
      "/AllRestaurants",
      "/RestaurantDetail",
      "/DeleteProductList",
      "/product",
      "/AdminDashboard",
      "/Admin",
      "/AdminLogin",
      "/ItemEdit",
      "/"
    ];
    const hideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname);

    return (
      <>
        {!hideNavbarFooter && <Navbar />}
        {children}
        {!hideNavbarFooter && <Footer />}
      </>
    );
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/Admin" element={<Admin />} />
          <Route path="/RestaurantDetail" element={<RestaurantDetail />} /> 
          <Route path="/RestaurantList" element={<RestaurantList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/DeleteProductList" element={<DeleteProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ItemEdit" element={<ItemEdit />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/AllRestaurants" element={<AllRestaurants />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
