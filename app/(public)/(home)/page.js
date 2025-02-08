'use client'
import React, { useState, useEffect, useMemo } from 'react';

import { getEvents } from '@/api/services/eventService';
import { EventFilters } from '@/components/Events/EventFilters';
import { EventCard } from '@/components/Events/EventCard';
import HeroSection from '@/components/Events/HeroSection';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dateRange, setDateRange] = useState('all');
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getEvents()
          setEvents(allEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = category === 'all' || event.category === category;
      
      const eventDate = new Date(event.date);
      const today = new Date();
      const thisMonth = today.getMonth();
      const nextMonth = (thisMonth + 1) % 12;
      
      let matchesDate = true;
      if (dateRange === 'upcoming') {
        matchesDate = eventDate >= today;
      } else if (dateRange === 'thisMonth') {
        matchesDate = eventDate.getMonth() === thisMonth;
      } else if (dateRange === 'nextMonth') {
        matchesDate = eventDate.getMonth() === nextMonth;
      }
      
      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [events, dateRange, category, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection/>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EventFilters
          dateRange={dateRange}
          setDateRange={setDateRange}
          category={category}
          setCategory={setCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="mt-12">
          {loading ? (
            <p className="text-center text-xl text-gray-600">Loading events...</p>
          ) : error ? (
            <p className="text-center text-xl text-red-500">{error}</p>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-[#131521] mb-8">
                {filteredEvents.length} Events Found
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-600">
                    No events found matching your criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


export default HomePage;