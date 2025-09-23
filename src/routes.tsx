import { Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import Wishlist from "./views/WishlistPage";
import AuthPage from "./views/AuthPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/account" element={<AuthPage />} />
    </Routes>
  );
};

export default AppRoutes;
