import React from "react";
import iphoneImg from "../assets/IphoneImage.webp";
import playStationImg from "../assets/Ps5.png";
import macBookImg from "../assets/1000053139-removebg-preview.png";

const Hero: React.FC = () => {
  return (
    <div className="w-full">
      <section className="bg-[#0f0f10] text-white w-full">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_380px] items-center px-4 pt-8 gap-2">
          <div>
            <p className="text-sm uppercase text-gray-400 tracking-wider">
              Pro. Beyond.
            </p>
            <h1 className="text-5xl md:text-8xl font-bold mt-2 leading-tight">
              IPhone 14 <span className="font-black">Pro</span>
            </h1>
            <p className="text-gray-300 mt-4 max-w-md">
              Created to change everything for the better. For everyone.
            </p>
            <button className="mt-6 inline-block border border-white px-12 cursor-pointer py-3 rounded-md text-white hover:bg-white hover:text-black transition">
              Shop Now
            </button>
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

      <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col">
            <div className="bg-white flex items-center justify-between">
              <img
                src={playStationImg}
                alt="Playstation 5"
                className="w-[260px] object-contain"
              />
              <div className="max-w-sm mr-6">
                <h2 className="text-3xl font-semibold">Playstation 5</h2>
                <p className="text-gray-600 mt-3 text-sm">
                  Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                  will redefine your PlayStation experience.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-white flex items-center justify-between p-6">
                <img
                  src="/assets/airpods.png"
                  alt="AirPods Max"
                  className="w-[140px] object-contain"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">
                    Apple AirPods <span className="font-bold">Max</span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Computational audio. Listen, it’s powerful.
                  </p>
                </div>
              </div>

              <div className="bg-black text-white flex items-center justify-between p-6">
                <img
                  src="/assets/visionpro.png"
                  alt="Apple Vision Pro"
                  className="w-[140px] object-contain"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">
                    Apple <span className="font-bold">Vision Pro</span>
                  </h3>
                  <p className="text-sm text-gray-300 mt-2">
                    An immersive way to experience entertainment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white flex items-center justify-between">
            <div className="max-w-sm ml-10">
              <h2 className="text-4xl font-light">
                Macbook <span className="font-bold">Air</span>
              </h2>
              <p className="text-gray-600 mt-4 text-sm">
                The new 15-inch MacBook Air makes room for more of what you love
                with a spacious Liquid Retina display.
              </p>
              <button className="mt-6 border border-black px-6 py-3 rounded-md hover:bg-gray-100 transition">
                Shop Now
              </button>
            </div>
            <img
              src={macBookImg}
              alt="Macbook Air"
              // className="w-[360px] object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
