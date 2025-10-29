import React from "react";

const Event = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff0f7] via-[#ffebf1] to-white px-3 py-10">
      {/* Decorative SVG Shape */}
      <svg
        viewBox="0 0 420 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-1/2 -translate-x-1/2 sm:w-[440px] w-[320px] pointer-events-none select-none opacity-30 z-0"
      >
        <ellipse
          cx="210"
          cy="100"
          rx="185"
          ry="80"
          fill="#f02e65"
          fillOpacity="0.13"
        />
        <ellipse
          cx="130"
          cy="80"
          rx="45"
          ry="18"
          fill="#f02e65"
          fillOpacity="0.18"
        />
        <ellipse
          cx="305"
          cy="165"
          rx="38"
          ry="18"
          fill="#f02e65"
          fillOpacity="0.20"
        />
      </svg>

      <div className="relative z-10 w-full max-w-md bg-white border-2 border-[#f02e65] shadow-2xl rounded-2xl flex flex-col items-center px-7 py-12 mt-6 mb-1">
        {/* Event Icon SVG */}
        <svg
          viewBox="0 0 56 56"
          fill="none"
          width={54}
          height={54}
          className="mb-6"
        >
          <circle cx="28" cy="28" r="28" fill="#ffebf1" />
          <rect
            x="14"
            y="20"
            width="28"
            height="16"
            rx="6"
            fill="#f02e65"
            fillOpacity="0.15"
          />
          <rect x="18" y="26" width="20" height="4" rx="2" fill="#f02e65" />
          <rect
            x="23"
            y="16"
            width="10"
            height="5"
            rx="2.5"
            fill="#f02e65"
            fillOpacity="0.85"
          />
        </svg>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif mb-2 text-[#f02e65] drop-shadow-lg">
          Coming Soon!
        </h1>
        <h2 className="mb-3 text-lg sm:text-xl font-medium text-[#374151] text-center">
          Event Page
        </h2>
        <p className="text-sm sm:text-base text-[#7a6479] mb-7 text-center">
          We’re building an awesome event experience.
          <br />
          Check back soon to see event schedules, details, and more!
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

export default Event;
