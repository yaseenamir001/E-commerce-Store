import React from "react";
import playStationImg from "../../assets/playStation.png";
import macBookImg from "../../assets/1000053139-removebg-preview.png";
import headPhoneImg from "../../assets/headPhones.png";
import proVisionImg from "../../assets/proVision.png";
import { Button } from "@/components/ui/button";

const FeaturedProducts = () => {
  return (
    <section className="w-full min-h-[400px] bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-6">
            <img
              src={playStationImg}
              alt="Playstation 5"
              className="w-[260px] h-auto object-contain"
            />
            <div className="max-w-full p-10">
              <h2 className="text-6xl mb-5 font-semibold">Playstation 5</h2>
              <p className="text-gray-600 text-sm">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                will redefine your PlayStation experience.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <SmallProductCard
              img={headPhoneImg}
              title="Apple AirPods Max"
              desc="Computational audio. Listen, it’s powerful."
              bg="bg-gray-200"
              text="text-black"
            />

            <SmallProductCard
              img={proVisionImg}
              title="Apple Vision Pro"
              desc="An immersive way to experience entertainment."
              bg="bg-black"
              text="text-white"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 h-[545px] bg-gray-200 pl-15">
          <div className="max-w-full">
            <h2 className="text-6xl font-light">
              Macbook <span className="font-bold">Air</span>
            </h2>
            <p className="text-gray-600 mt-4 text-sm">
              The new 15-inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </p>
            <Button
              variant="outline"
              className="mt-6 px-12 py-5 bg-gray-200 border-black text-black"
            >
              Shop Now
            </Button>
          </div>
          <img
            src={macBookImg}
            alt="Macbook Air"
            className="w-[360px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

interface SmallCardProps {
  img: string;
  title: string;
  desc: string;
  bg: string;
  text: string;
}

const SmallProductCard: React.FC<SmallCardProps> = ({
  img,
  title,
  desc,
  bg,
  text,
}) => (
  <div className={`flex items-center ${bg} ${text}`}>
    <img src={img} alt={title} className="w-[140px] h-auto object-contain" />
    <div className="p-6">
      <h3 className="text-3xl font-medium">{title}</h3>
      <p className="text-sm opacity-80 mt-2">{desc}</p>
    </div>
  </div>
);
