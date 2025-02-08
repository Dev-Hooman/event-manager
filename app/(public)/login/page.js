"use client";
import AuthLeftSection from "@/components/core/AuthLeftSection";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { CUSTOM_COLORS } from "@/theme/colors";

const LoginPage = () => {
  const { data: session } = useSession();
  const [isPending, setIsPending] = useState(false);

  if (session?.user) {
    redirect("/dashboard");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);

      const data = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (data?.ok) {
        toast.success("Login Success!");
      } else {
        toast.error("Invalid Credentials !");
      }
    } catch (error) {
      toast.error("Error during login:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AuthLeftSection />
      <div className="lg:w-1/2 w-full flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-md space-y-4">
          <div className="font-medium text-2xl flex justify-center">
            <span className="text-secondary">Event </span>
            <span className="text-primary">Planner</span>
          </div>
          <h2 className="text-xl font-medium mb-6 text-secondary">
            Welcome Back.
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-secondary mb-1">
                Email
              </label>
              <input
                required
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                name="email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-secondary mb-1">
                Password
              </label>
              <input
                required
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                name="password"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              disabled={isPending}
              type="submit"
              className={` ${
                isPending ? "opacity-50" : "hover:bg-secondary/50"
              } primary-btn`}
            >
              {isPending ? (
                <CircularProgress
                  size={18}
                  style={{ color: CUSTOM_COLORS.WHITE }}
                />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
