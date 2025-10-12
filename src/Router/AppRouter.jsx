import React from "react";
import { Route, Routes } from "react-router";
import Home from "../Pages/Home";
import AdminDashboard from "../Pages/AdminDashboard";
import Event from "../Pages/Event";
import EventDetails from "../Pages/EventDetails";
import Auth from "../Pages/Auth";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/events" element={<Event />} />
      <Route path="/events/:id" element={<EventDetails />} />
    </Routes>
  );
};

export default AppRouter;
