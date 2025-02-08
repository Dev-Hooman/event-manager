import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export function EventFilters({
  dateRange,
  setDateRange,
  category,
  setCategory,
  searchQuery,
  setSearchQuery
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex flex-col gap-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-[#DF1F5A] focus:outline-none focus:border-[#131521] transition-colors"
          />
          <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#DF1F5A]" size={20} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#DF1F5A] focus:outline-none focus:border-[#131521] transition-colors appearance-none bg-white"
            >
              <option value="all">All Dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="thisMonth">This Month</option>
              <option value="nextMonth">Next Month</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-[#DF1F5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#DF1F5A] focus:outline-none focus:border-[#131521] transition-colors appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="concert">Concert</option>
              <option value="sports">Sports</option>
              <option value="exhibition">Exhibition</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-[#DF1F5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
