import React from 'react';
import { FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      icon: FiClock,
      className: 'bg-yellow-100 text-yellow-800',
    },
    confirmed: {
      icon: FiCheckCircle,
      className: 'bg-green-100 text-green-800',
    },
    cancelled: {
      icon: FiXCircle,
      className: 'bg-red-100 text-red-800',
    },
  }[status.toLowerCase()];

  const Icon = statusConfig.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.className}`}>
      <Icon size={16} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
