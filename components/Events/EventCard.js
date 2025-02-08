import React from 'react';
import { AiOutlineCalendar, AiOutlineEnvironment, AiOutlineUsergroupAdd } from 'react-icons/ai';
import Link from 'next/link';


export function EventCard({ event }) {

  return (
    <Link href={`/event/${event._id}`} className="block h-full group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col transform transition-transform duration-200 hover:scale-[1.02]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-[#131521]">
              {event.title}
            </h3>
            <span className="px-3 py-1 bg-[#DF1F5A]/10 text-[#DF1F5A] rounded-full font-semibold">
              Rs {event.price}
            </span>
          </div>
          <p className="text-gray-600 mb-6 line-clamp-2">
            {event.description}
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center text-gray-600">
              <AiOutlineCalendar size={16} className="mr-2 text-[#DF1F5A]" />
              <span className="text-sm">
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <AiOutlineEnvironment size={16} className="mr-2 text-[#DF1F5A]" />
              <span className="text-sm">{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <AiOutlineUsergroupAdd size={16} className="mr-2 text-[#DF1F5A]" />
              <span className="text-sm">{event.availableSeats} seats available</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
