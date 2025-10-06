import { useState } from "react";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex md:flex-col gap-3 justify-center md:justify-start">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="thumbnail"
            onClick={() => setSelectedImage(img)}
            className={`w-16 h-16 object-cover rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedImage === img
                ? "border-black scale-105"
                : "border-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex justify-center">
        <img
          src={selectedImage}
          alt="main"
          className="w-[400px] h-[400px] object-contain rounded-xl bg-gray-100 p-4"
        />
      </div>
    </div>
  );
}
