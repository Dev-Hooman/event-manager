import BookingList from "@/components/bookings/BookingList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import React from "react";

const MyBookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (session?.user?.role === "user") {
    return <BookingList />;
  } else {
    redirect("/");
  }
};

export default MyBookingsPage;
