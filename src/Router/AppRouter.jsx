import React from "react";
import { Route, Routes } from "react-router";
import Home from "../Pages/Home";
import AdminDashboard from "../Pages/AdminDashboard";
import Event from "../Pages/Event";
import EventDetails from "../Pages/EventDetails";
import Auth from "../Pages/Auth";
import AuthRedirect from "../Pages/AuthRedirect"; // <-- Import the new page

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth-redirect" element={<AuthRedirect />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route path="/events" element={<Event />} />
      <Route path="/events/:id" element={<EventDetails />} />
    </Routes>
  );
};

export default AppRouter;
