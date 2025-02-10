import ProfileSettings from "@/components/SettingsPage/ProfileSettings";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
    const session = await getServerSession(authOptions);
  
    if (!session?.user) {
      redirect("/login");
    }
  
  return (
    <div className="min-h-[calc(100vh)]">
      <ProfileSettings />
    </div>
  );
};

export default ProfilePage;
