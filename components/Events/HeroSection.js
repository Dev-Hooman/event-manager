import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";

const HeroSection = () => {
  return (
    <div className="relative text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#131521] to-[#DF1F5A] opacity-90" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-4 mb-8">
          <AiOutlineCalendar size={40} />
          <h1 className="text-4xl font-bold">Event Planner</h1>
        </div>
        <p className="text-xl font-light max-w-2xl mb-8">
          Discover and book amazing events happening around you. From
          conferences to concerts, find your next unforgettable experience.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
