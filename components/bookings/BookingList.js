'use client';
import { getUserBookings } from '@/api/services/bookingService';
import BookingCard from '@/components/bookings/BookingCard';
import EmptyBookings from '@/components/bookings/EmptyBooking';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

function BookingList() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = session?.user?.token;
        if (!token) return;

        const allBookings = await getUserBookings(token);
        setBookings(allBookings.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [session]);

  
  const updateBookingInState = (bookingId, newStatus) => {
    setBookings((prev) =>
      newStatus
        ? prev.map((booking) =>
            booking._id === bookingId ? { ...booking, status: newStatus } : booking
          )
        : prev.filter((booking) => booking._id !== bookingId)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#131521]">All Bookings</h1>
          <p className="mt-2 text-gray-600">Manage your event bookings and reservations</p>
        </div>

        <div className="space-y-6">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} onUpdate={updateBookingInState} />
            ))
          ) : (
            <EmptyBookings />
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingList;
