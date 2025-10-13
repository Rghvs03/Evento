import React from "react";

const pastEvents = [
  {
    id: 1,
    name: "Tech Symposium",
    date: "2025-09-18",
    attendees: 120,
    banner:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Cultural Fest",
    date: "2025-08-10",
    attendees: 240,
    banner:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Sports Meet",
    date: "2025-07-16",
    attendees: 89,
    banner:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
];

const upcomingEvents = [
  {
    id: 10,
    name: "Hackathon 2025",
    date: "2025-10-25",
    status: "Upcoming",
  },
  {
    id: 11,
    name: "Seminar on AI",
    date: "2025-11-05",
    status: "Upcoming",
  },
];

const totalAttendees = pastEvents.reduce((sum, ev) => sum + ev.attendees, 0);

const AdminDashboard = () => (
  <div className="min-h-screen bg-white text-black flex flex-col px-2 sm:px-6 md:px-14 py-6">
    {/* Create New Event button */}
    <div className="w-full flex flex-row justify-center md:justify-between items-center mb-6 gap-4">
      <h2 className="text-3xl font-bold text-[#f02e65] flex-1">
        Admin Dashboard
      </h2>
      <button className="bg-[#f02e65] hover:bg-pink-800 text-white font-bold px-6 py-3 rounded-2xl transition shadow-lg">
        + Create New Event
      </button>
    </div>

    {/* Horizontal carousel of past events */}
    <div className="mb-8 w-full overflow-x-auto">
      <div
        className="flex gap-6 px-1 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {pastEvents.map((ev) => (
          <div
            key={ev.id}
            className="min-w-[220px] sm:min-w-[300px] bg-white rounded-xl shadow-lg border border-gray-200 flex-shrink-0"
          >
            <img
              src={ev.banner}
              alt={ev.name}
              className="w-full h-28 object-cover rounded-t-xl"
              loading="lazy"
            />
            <div className="p-4">
              <div className="font-bold text-[#f02e65] text-lg mb-2">
                {ev.name}
              </div>
              <div className="text-xs text-gray-600 mb-1">Date: {ev.date}</div>
              <div className="text-xs text-black font-semibold mb-2">
                Attendees: {ev.attendees}
              </div>
              <button className="text-xs font-semibold text-[#f02e65] hover:underline transition">
                View Users
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Stats Row */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
      <div className="bg-[#f02e65] text-white rounded-xl p-6 text-center shadow font-bold">
        <div className="mb-1">Total Events</div>
        <div className="text-2xl">
          {pastEvents.length + upcomingEvents.length}
        </div>
      </div>
      <div className="bg-black text-white rounded-xl p-6 text-center shadow font-bold">
        <div className="mb-1">Total Attendees</div>
        <div className="text-2xl">{totalAttendees}</div>
      </div>
      <div className="bg-[#f02e65] text-white rounded-xl p-6 text-center shadow font-bold hidden sm:block">
        <div className="mb-1">Upcoming Events</div>
        <div className="text-2xl">{upcomingEvents.length}</div>
      </div>
    </div>

    {/* Events table */}
    <div className="bg-white rounded-xl shadow-xl p-6 w-full overflow-auto">
      <h3 className="text-xl font-bold text-[#f02e65] mb-4">Upcoming Events</h3>
      <table className="w-full text-center border-separate border-spacing-y-1">
        <thead>
          <tr>
            <th className="py-2">Event Name</th>
            <th className="py-2">Date</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {upcomingEvents.map((ev) => (
            <tr key={ev.id} className="bg-gray-50 rounded-xl">
              <td className="px-2 py-2 font-semibold">{ev.name}</td>
              <td className="px-2 py-2">{ev.date}</td>
              <td className="px-2 py-2 text-green-700">{ev.status}</td>
              <td className="px-2 py-2">
                <button className="text-blue-600 font-medium hover:underline mr-3">
                  Edit
                </button>
                <button className="text-red-600 font-medium hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminDashboard;
