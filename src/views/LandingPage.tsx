import FeaturedProducts from "@/components/LandingPage/FeaturedProducts";
import Navbar from "../components/common/Navbar";
import HeroBanner from "../components/LandingPage/HeroBanner";
import Categories from "@/components/LandingPage/CategoriesSection";
import ProductsSection from "@/components/LandingPage/ProductsSection";
import Footer from "@/components/common/Footer";
import ProductShowcase from "@/components/LandingPage/ProductShowcase";
import PromoBanner from "@/components/LandingPage/PromoBanner";
import DiscountSection from "@/components/LandingPage/DiscountSection";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <FeaturedProducts />
      <Categories />
      <ProductsSection />
      {/* <ProductShowcase /> */}
      {/* <DiscountSection /> */}
      <PromoBanner />
      <Footer />
    </>
  );
};

export default LandingPage;
