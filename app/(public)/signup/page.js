"use client";

import { useState } from "react";
import AuthLeftSection from "@/components/core/AuthLeftSection"; 
import Link from "next/link";

const SignupPage = () => {
  const [data, setData] = useState({ success: null, error: null });
  const [isPending, setIsPending] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  async function registerUser(formData, role) {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setData({ success: null, error: null });

    const formData = new FormData(e.target);
    formData.append("role", selectedRole); 

    const response = await registerUser(formData, selectedRole); 

    setData(response);
    setIsPending(false);
  };

  return (
    <div className="flex h-screen">
      <AuthLeftSection />
      
      <div className="lg:w-1/2 w-full flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-md space-y-4">
          <div className="font-medium text-2xl">
            <span className="text-secondary">Event</span>
            <span className="text-primary">Planner</span>
          </div>
          <h2 className="text-xl font-medium mb-6 text-secondary">USER SIGNUP</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-secondary mb-1">
                Name
              </label>
              <input
                required
                type="text"
                name="name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-secondary mb-1">
                Email
              </label>
              <input
                required
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
                type="password"
                name="password"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-6">
              <label className="block text-secondary mb-1">Select Role</label>
              <div className="flex space-x-4">
                <div
                  onClick={() => setSelectedRole("user")}
                  className={`w-1/2 p-4 border rounded-lg cursor-pointer text-center ${
                    selectedRole === "user" ? "bg-secondary text-white" : "bg-gray-200"
                  }`}
                >
                  <h3>User</h3>
                </div>
                <div
                  onClick={() => setSelectedRole("vendor")}
                  className={`w-1/2 p-4 border rounded-lg cursor-pointer text-center ${
                    selectedRole === "vendor" ? "bg-secondary text-white" : "bg-gray-200"
                  }`}
                >
                  <h3>Vendor</h3>
                </div>
              </div>
            </div>

            <div className="mb-4">
              {data?.success && <p className="text-green-500 font-bold">{data.success}</p>}
              {data?.error && <p className="text-red-500 font-bold">{data.error}</p>}
            </div>

            <button
              disabled={isPending}
              type="submit"
              className="w-full bg-secondary text-white py-3 px-4 hover:bg-secondary/50 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {isPending ? "Loading..." : "Signup"}
            </button>
          </form>

          <p className="font-medium text-secondary">
            Already have an account?{" "}
            <Link className="hover:underline transition-all" href="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
