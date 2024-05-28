// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import React, { useState } from "react";
import Image from "next/image";

export const Carousel: React.FC<{
  images: { src: string; blurDataURL: string }[];
}> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const selectImage = (index: number) => {
    setMainImageIndex(index);
    setSelectedImageIndex(index);
  };

  const image = images[mainImageIndex];
  return (
    <div className="w-full mx-auto">
      <div className="relative">
        {image && (
          <Image
            {...image}
            alt={`Image ${mainImageIndex + 1}`}
            width={900}
            height={600}
            className="w-full h-auto rounded-2xl"
          />
        )}
        <div className="flex justify-center space-x-2 lg:space-x-6 mt-2 lg:mt-6">
          {images.map(
            (image, index) =>
              index !== mainImageIndex && (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`relative aspect-square overflow-hidden w-full h-auto lg:h-24 rounded-xl ${
                    index === selectedImageIndex ? "border-blue-500" : ""
                  }`}
                >
                  <Image
                    key={index}
                    {...image}
                    alt={`Thumbnail ${index + 1}`}
                    fill={true}
                    className="object-cover"
                    sizes={"400w"}
                  />
                </button>
              ),
          )}
        </div>
      </div>
    </div>
  );
};
