import { Routes, Route } from "react-router-dom";
import { Products } from "../pages/Products";
import { Trending } from "../pages/Trendings";
import { Home } from "../pages/Home";
import { Explore } from "../pages/Explore";
import { Cart } from "../pages/Cart";
import { PrivateRoute } from "./PrivateRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/trending/:category?" element={<Trending />} />
      <Route path="/explore" element={<Explore/>}/>
      <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>}/>
    </Routes>
  );
}