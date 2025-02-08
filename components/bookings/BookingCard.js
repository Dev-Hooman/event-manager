import {
  updateBookingStatus,
  cancelBooking,
} from "@/api/services/bookingService";
import { FiCalendar, FiMapPin, FiClock, FiUsers } from "react-icons/fi";
import { useSession } from "next-auth/react";
import StatusBadge from "./StatusBadge";
import React, { useState } from "react";

const BookingCard = ({ booking, onUpdate }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  const handleUpdateStatus = async (status) => {
    const token = session?.user?.token;
    try {
      setLoading(true);
      await updateBookingStatus(booking._id, { status }, token);
      onUpdate(booking._id, status);
    } catch (error) {
      console.error("Error updating booking:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    const token = session?.user?.token;

    try {
      setIsCanceling(true);
      await cancelBooking(booking._id, token);
      onUpdate(booking._id, null);
    } catch (error) {
      console.error("Error canceling booking:", error);
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto">
          <img
            src={booking.eventId.image}
            alt={booking.eventTitle}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-[#131521]">
                {booking.eventTitle}
              </h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <FiCalendar size={16} className="mr-2 text-[#DF1F5A]" />
                  <span>
                    {new Date(booking.eventId.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiClock size={16} className="mr-2 text-[#DF1F5A]" />
                  <span>{booking.eventId.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiMapPin size={16} className="mr-2 text-[#DF1F5A]" />
                  <span>{booking.eventId.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiUsers size={16} className="mr-2 text-[#DF1F5A]" />
                  <span>{booking.seats} seats reserved</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiUsers size={16} className="mr-2 text-[#DF1F5A]" />
                  <span>Booked by: {booking.userId.name} | {booking.userId.email} </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-4">
              <StatusBadge status={booking.status} />
              <div className="text-2xl font-semibold text-[#DF1F5A]">
                Rs {booking.eventId.price * booking.seats}
              </div>
              <div className="text-sm text-gray-500">
                Booked on {new Date(booking.createdAt).toLocaleDateString()}
              </div>
              {booking.status === "pending" &&
                session?.user?.role === "vendor" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus("confirmed")}
                      disabled={loading}
                      className="px-4 py-2 bg-[#DF1F5A] text-white rounded-full hover:bg-[#DF1F5A]/90 transition-colors"
                    >
                      {loading ? "loading..." : "Confirm"}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="px-4 py-2 border-2 border-[#DF1F5A] text-[#DF1F5A] rounded-full hover:bg-[#DF1F5A]/10 transition-colors"
                    >
                      {isCanceling ? "loading..." : "Cancel"}
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
