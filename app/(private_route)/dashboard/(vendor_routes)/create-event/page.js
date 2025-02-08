"use client";
import { createEvent } from "@/api/services/eventService";
import EventForm from "@/components/CreateEvents/EventForm";
import { useSession } from "next-auth/react";
import { useState } from "react";

const CreateEventPage = () => {
  const [loading, setLoading] = useState(false);
  const {data: session} = useSession();

  async function createEventApi(eventData) {
    setLoading(true);

    const token = session.user.token;

    console.log("Token: ", token)

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

      await createEvent(formData, token);

      alert("Event Created Successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return <EventForm onSubmit={createEventApi} loading={loading} />;
};

export default CreateEventPage;
