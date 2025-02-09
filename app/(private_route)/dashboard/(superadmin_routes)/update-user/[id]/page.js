"use client";
import React, { useEffect, useState } from "react";
import EventForm from "@/components/CreateEvents/EventForm";
import { useSession } from "next-auth/react";
import { getSingleUser, updateUser } from "@/api/services/userService";
import UserForm from "@/components/CreateUsers/UserForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UpdateUser = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const resolvedParams = React.use(params);
  const userId = resolvedParams.id;
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setIsDataLoading(true);
      try {
        if (userId) {
          const { user } = await getSingleUser(userId);
          setData(user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  async function updateUserAPI(userData) {
    const token = session?.user?.token;
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      if (userData.password) {
        formData.append("password", userData.password);
      }
      formData.append("role", userData.role);

      const response = await updateUser(formData, token);

      if (response.success) {
        toast.success(response.message);
        router.push("/dashboard/users");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!");
    }
  }

  return (
    <>
      {isDataLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div>Loading...</div>
        </div>
      ) : (
        <UserForm
          isUpdate={true}
          userData={data}
          onSubmit={updateUserAPI}
          loading={loading}
        />
      )}
    </>
  );
};

export default UpdateUser;
