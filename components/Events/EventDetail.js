"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiArrowLeft,
  FiShare2,
  FiHeart,
} from "react-icons/fi";
import { getSingleEvent } from "@/api/services/eventService";
import { useRouter } from "next/navigation";
import { createBooking } from "@/api/services/bookingService";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export function EventDetail({ eventId }) {
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventsData = await getSingleEvent(eventId);
        setEvent(eventsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#131521] mb-4">
            {error || "Event not found"}
          </h1>
          <Link href="/" className="text-[#DF1F5A] hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  async function bookEvent() {
    const token = session?.user?.token;
    const userId = session?.user?.userId;
    if (!token || !userId) {
      toast.error("Please login to book event");
      return;
    }
    try {

      const response = await createBooking(
        { eventId: event._id, userId , seats: 1},
        token
      ); //JUST TO MAKE IT MORE SIMPLE I AM HARDCODING SEATS TO 1

      if (response.success) {
        toast.success("Event booked successfully");
        router.push("/bookings");
      }
    } catch (error) {
      toast.error(error.response.data.error || "Error booking event");
      console.error("Error booking event:", error);
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[500px]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 p-2 rounded-full bg-white hover:bg-white/90 transition-colors"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg p-8 -mt-32 relative shadow-md">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#131521] mb-4">
                {event.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="px-4 py-1 bg-[#DF1F5A]/10 text-[#DF1F5A] rounded-full font-medium">
                  {event.category}
                </span>
                <span className="text-3xl font-semibold text-[#DF1F5A]">
                  Rs {event.price}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 text-[#DF1F5A]">
                <FiShare2 className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-[#DF1F5A]">
                <FiHeart className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-gray-50 rounded-lg border border-[#DF1F5A]/10">
              <div className="flex items-center gap-4">
                <FiCalendar className="text-[#DF1F5A]" />
                <div>
                  <p className="text-gray-600 text-sm">Date & Time</p>
                  <p className="font-medium">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border border-[#DF1F5A]/10">
              <div className="flex items-center gap-4">
                <FiMapPin className="text-[#DF1F5A]" />
                <div>
                  <p className="text-gray-600 text-sm">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border border-[#DF1F5A]/10">
              <div className="flex items-center gap-4">
                <FiUsers className="text-[#DF1F5A]" />
                <div>
                  <p className="text-gray-600 text-sm">Available Seats</p>
                  <p className="font-medium">{event.availableSeats}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#131521] mb-6">
              About This Event
            </h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>

          <button onClick={bookEvent} className="primary-btn w-full">Book Now</button>
        </div>
      </div>
    </div>
  );
}
