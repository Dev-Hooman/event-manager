"use client";
import React, { useEffect, useState } from "react";
import {
  getSingleEvent,
  updateEvent,
} from "@/api/services/eventService";
import EventForm from "@/components/CreateEvents/EventForm";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const UpdateEvent = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const resolvedParams = React.use(params);
  const eventId = resolvedParams.id;

  useEffect(() => {
    const fetchEvents = async () => {
      setIsFetching(true);
      const token = session?.user.token;
      try {
        if (eventId) {
          const events = await getSingleEvent(eventId, token);
          setData(events);
        }
      } catch (error) {
        toast.error(error.response.data.message || "Something went wrong!");
      } finally {
        setIsFetching(false);
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

      toast.success("Event Updated Successfully!");
    } catch (error) {
      toast.error("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isFetching ? (
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
