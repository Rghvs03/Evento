import React from "react";

const dashboardStats = [
  { label: "Total Events", value: 32, bg: "bg-pink-100", text: "text-pink-700" },
  { label: "Active Users", value: 421, bg: "bg-blue-100", text: "text-blue-700" },
  { label: "Tickets Sold", value: 1340, bg: "bg-green-100", text: "text-green-700" },
  { label: "Total Revenue", value: "₹1,29,000", bg: "bg-yellow-100", text: "text-yellow-700" },
];

const upcomingEvents = [
  { name: "Campus Fest 2025", date: "20 Dec 2025", registrations: 230 },
  { name: "Tech Talk Series", date: "12 Nov 2025", registrations: 97 },
];

const recentFeedback = [
  { user: "Ankit Sharma", event: "Campus Fest", feedback: "Great event, super organized!" },
  { user: "Riya Gupta", event: "Tech Talk", feedback: "Loved the sessions and topics." },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-[#f02e65] mb-8 text-center">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl p-4 shadow flex flex-col items-center ${stat.bg} ${stat.text}`}
          >
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Events List */}
        <div className="bg-white rounded-xl shadow p-4 col-span-2">
          <h2 className="text-xl font-bold text-[#f02e65] mb-4">Upcoming Events</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-3">Event</th>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Registrations</th>
                <th className="py-2 px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents.map((ev) => (
                <tr key={ev.name}>
                  <td className="py-2 px-3">{ev.name}</td>
                  <td className="py-2 px-3">{ev.date}</td>
                  <td className="py-2 px-3">{ev.registrations}</td>
                  <td className="py-2 px-3">
                    <button className="px-3 py-1 rounded bg-pink-100 text-pink-600 font-semibold hover:bg-pink-200 transition">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions & Feedback */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <button className="rounded py-2 px-4 bg-[#f02e65] text-white font-medium hover:bg-pink-600 transition">
                Create Event
              </button>
              <button className="rounded py-2 px-4 bg-pink-100 text-[#f02e65] font-medium hover:bg-pink-200 transition">
                Manage Users
              </button>
              <button className="rounded py-2 px-4 bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition">
                View Reports
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Recent Feedback</h2>
            <ul className="flex flex-col gap-2">
              {recentFeedback.map((f, idx) => (
                <li key={idx} className="text-sm">
                  <span className="font-semibold">{f.user}</span>: "{f.feedback}"
                  <span className="block text-gray-500 text-xs">({f.event})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
