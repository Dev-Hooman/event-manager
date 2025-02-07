"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const AuthLeftSection = () => {
  const images = ["/images/1.png", "/images/2.png", "/images/3.png"];
  const taglineTexts = ["PLAN.", "CREATE.", "CELEBRATE."];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsAnimating(true);
      }, 0);
    }, 5000);
    return () => clearInterval(imageInterval);
  }, [images.length]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % taglineTexts.length);
    }, 2000);
    return () => clearInterval(textInterval);
  }, [taglineTexts.length]);

  return (
    <div className="w-1/2 relative lg:block hidden overflow-hidden">

      <Image
        priority
        width={500}
        height={500}
        key={currentImageIndex}
        src={images[currentImageIndex]}
        alt="Auth Background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isAnimating ? "animate-zoom opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Event Planner</h1>
          <p className="text-xl font-semibold text-secondary">
            {taglineTexts[currentTextIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLeftSection;
