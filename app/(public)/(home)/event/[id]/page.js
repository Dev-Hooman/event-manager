import { EventDetail } from "@/components/Events/EventDetail";
import React from "react";

const EventDetailPage = ({ params }) => {
  const resolvedParams = React.use(params);
  const eventId = resolvedParams.id;

  return <EventDetail eventId={eventId} />;
};

export default EventDetailPage;
