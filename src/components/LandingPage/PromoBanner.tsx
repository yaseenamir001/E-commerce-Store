import { Button } from "@/components/ui/button";
import FoldPhone from "@/assets/AppleTab.png";
import Tablet from "@/assets/samsungTab.png";
import Iphone from "@/assets/mobile.webp";
import Watch from "@/assets/Applewatch.png";
import Laptop from "@/assets/Laptop.png";

export default function PromoBanner() {
  return (
    <section className="relative h-[450px] bg-[#1a1a1a] text-white py-28 overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-light mb-4">
          Big Summer <span className="font-bold">Sale</span>
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto mb-8">
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </p>
        <Button variant="outline" className="mt-6 px-12 py-5 bg-transparent">
          Shop Now
        </Button>
      </div>

      <img
        src={Laptop}
        alt="Fold Phone"
        className="absolute -top-30 -left-2 w-48 md:w-100 object-contain z-10 -rotate-[-26deg]"
      />

      <img
        src={FoldPhone}
        alt="Fold Phone"
        className="absolute bottom-[-90px] -left-42 w-64 md:w-120 object-contain z-0"
      />

      <img
        src={Tablet}
        alt="Tablet"
        className="absolute -top-8 -left-20 w-48 md:w-80 object-contain z-10 rotate-[-2deg]"
      />

      <img
        src={Iphone}
        alt="iPhone"
        className="absolute top-4 -right-16 w-40 md:w-90 object-contain z-20 -rotate-35"
      />

      <img
        src={Watch}
        alt="Watch"
        className="absolute bottom-[-10px] -right-2 w-44 md:w-90 object-contain z-30"
      />
    </section>
  );
}
