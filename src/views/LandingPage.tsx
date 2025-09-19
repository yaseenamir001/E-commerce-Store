import FeaturedProducts from "@/components/LandingPage/FeaturedProducts";
import Navbar from "../components/common/Navbar";
import HeroBanner from "../components/LandingPage/HeroBanner";
import Categories from "@/components/LandingPage/Categories";
import ProductsSection from "@/components/LandingPage/ProductsSection";
import Footer from "@/components/common/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <FeaturedProducts />
      <Categories />
      <ProductsSection />
      <Footer />
    </>
  );
};

export default LandingPage;
