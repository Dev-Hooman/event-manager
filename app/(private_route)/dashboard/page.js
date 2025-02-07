'use client'
import { custom_styling } from "@/theme/mui-theme";
import React from "react";
import { redirect } from "next/navigation";
import { Button } from "@mui/material";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh)]">
      <div className="text-2xl flex flex-col items-center justify-center">
        <p className="text-center">
          Welcome to the <span className="text-secondary font-bold">EVENT-PLANNER Dashboard</span>, your central hub for managing your application.
        </p>
        <p className="text-center mt-2">
          Click the button below to explore the features.
        </p>
        <div className="mt-4">
          <Button
           
            sx={custom_styling.primaryButton}
          >
           Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
