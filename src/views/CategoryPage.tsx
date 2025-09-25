import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CategoryContent from "@/components/CategoryPage/CategoryContent";

export default function CategoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <CategoryContent />
      </main>
      <Footer />
    </div>
  );
}
