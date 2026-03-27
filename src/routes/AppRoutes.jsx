import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const Trending = lazy(() => import("../pages/Trendings"));
const Explore = lazy(() => import("../pages/Explore"));
const Cart = lazy(() => import("../pages/Cart"));

export function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/trending/:category?" element={<Trending />} />
        <Route path="/explore" element={<Explore />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}