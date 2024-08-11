import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const UrlParams = new URLSearchParams(location.search);
    const tabFromUrl = UrlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);
  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-dark-theme-bg md:flex-row bg-[url('/polishlight.jpeg')] dark:bg-[url('/polishdark.jpg')] bg-cover">
      <div className="md:w-[1/5]">
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
    </div>
  );
};

export default Dashboard;
