import React from "react";

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff0f7] via-[#ffebf1] to-white px-3 py-10">
      {/* SVG Blob */}
      <svg
        viewBox="0 0 400 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-1/2 -translate-x-1/2 sm:w-[420px] w-[320px] pointer-events-none select-none opacity-30 z-0"
      >
        <ellipse
          cx="200"
          cy="110"
          rx="180"
          ry="90"
          fill="#f02e65"
          fillOpacity="0.13"
        />
        <ellipse
          cx="120"
          cy="80"
          rx="50"
          ry="24"
          fill="#f02e65"
          fillOpacity="0.22"
        />
        <ellipse
          cx="280"
          cy="170"
          rx="40"
          ry="18"
          fill="#f02e65"
          fillOpacity="0.18"
        />
      </svg>

      <div className="relative z-10 w-full max-w-md bg-white border-2 border-[#f02e65] shadow-2xl rounded-2xl flex flex-col items-center px-7 py-12 mt-6 mb-1">
        {/* Beautiful Clock/Hourglass SVG */}
        <svg
          viewBox="0 0 60 60"
          width={54}
          height={54}
          fill="none"
          className="mb-6"
        >
          <circle cx="30" cy="30" r="28" fill="#ffebf1" />
          <ellipse
            cx="30"
            cy="22"
            rx="12"
            ry="6"
            fill="#f02e65"
            fillOpacity="0.16"
          />
          <rect
            x="27"
            y="22"
            width="6"
            height="16"
            rx="3"
            fill="#f02e65"
            fillOpacity="0.7"
          />
          <ellipse
            cx="30"
            cy="38"
            rx="12"
            ry="6"
            fill="#f02e65"
            fillOpacity="0.2"
          />
          <rect
            x="15"
            y="12"
            width="30"
            height="36"
            rx="14"
            stroke="#f02e65"
            strokeWidth="2"
          />
        </svg>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif mb-2 text-[#f02e65] drop-shadow-lg">
          Coming Soon!
        </h1>
        <h2 className="mb-3 text-lg sm:text-xl font-medium text-[#374151] text-center">
          User Dashboard
        </h2>
        <p className="text-sm sm:text-base text-[#7a6479] mb-7 text-center">
          We're working hard to bring{" "}
          <span className="text-[#f02e65] font-semibold">
            personalized event features
          </span>{" "}
          for all users.
          <br />
          Watch this space or check back soon!
        </p>
        <button
          className="bg-[#f02e65] hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-150"
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
