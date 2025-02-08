"use client";
import React, { useEffect, useState } from "react";
import {
  getSingleEvent,
  updateEvent,
} from "@/api/services/eventService";
import EventForm from "@/components/CreateEvents/EventForm";
import { useSession } from "next-auth/react";

const UpdateEvent = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const resolvedParams = React.use(params);
  const eventId = resolvedParams.id;

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const token = session?.user.token;
      try {
        if (eventId) {
          const events = await getSingleEvent(eventId, token);
          setData(events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  async function updateEventAPI(eventData) {
    setLoading(true);

    const token = session.user.token;
    try {
      const formData = new FormData();
      formData.append("title", eventData.title);
      formData.append("description", eventData.description);
      formData.append("date", eventData.date);
      formData.append("time", eventData.time);
      formData.append("location", eventData.location);
      formData.append("category", eventData.category);
      formData.append("price", eventData.price);
      formData.append("availableSeats", eventData.availableSeats);

      if (eventData.image?.file) {
        formData.append("image", eventData.image.file);
      }

      await updateEvent(eventId, formData, token);

      alert("Event Created Successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div>Loading...</div>

        </div>
      ) : (
        <EventForm isUpdate={true} eventData={data} onSubmit={updateEventAPI} loading={loading} />
      )}
    </>
  );
};

export default UpdateEvent;
