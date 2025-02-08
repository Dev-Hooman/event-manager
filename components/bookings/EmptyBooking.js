import React from 'react';
import Link from 'next/link';

const EmptyBookings = () => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-md">
      <div className="text-gray-500 mb-4">
        You haven't made any bookings yet
      </div>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-[#DF1F5A] text-white rounded-full hover:bg-[#DF1F5A]/90 transition-colors"
      >
        Browse Events
      </Link>
    </div>
  );
};

export default EmptyBookings;
