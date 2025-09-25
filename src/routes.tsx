import { Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import Wishlist from "./views/WishlistPage";
import AuthPage from "./views/AuthPage";
import CategoryPage from "./views/CategoryPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/account" element={<AuthPage />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
    </Routes>
  );
};

export default AppRoutes;
