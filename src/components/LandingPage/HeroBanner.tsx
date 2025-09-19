import iphoneImg from "../../assets/IphoneImage.webp";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <section className="bg-[#0f0f10] text-white w-full">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_380px] items-center px-4 pt-8 gap-2">
        <div>
          <p className="text-lg uppercase font-bold text-gray-400 tracking-wider">
            Pro. Beyond.
          </p>
          <h1 className="text-5xl md:text-8xl mt-2 font-light leading-tight">
            IPhone 14 <span className="font-bold">Pro</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-md">
            Created to change everything for the better. For everyone.
          </p>
          <Button variant="outline" className="mt-6 px-12 py-5 bg-transparent">
            Shop Now
          </Button>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src={iphoneImg}
            alt="iPhone 14 Pro"
            className="w-[350px] md:w-[460px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
