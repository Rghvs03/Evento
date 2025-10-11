import { Boxes, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 sm:px-12 py-3 bg-white text-black shadow-md shadow-gray-300 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif flex items-center gap-2 text-[#f02e65] drop-shadow-lg">
          <Boxes size={30} className="animate-bounce" />
          EventO
        </h1>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-10 text-lg font-semibold font-sans">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "text-[#f02e65] border-b-2 border-[#f02e65] pb-1 px-1 transition-all"
              : "hover:text-[#f02e65] transition-all"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive
              ? "text-[#f02e65] border-b-2 border-[#f02e65] pb-1 px-1 transition-all"
              : "hover:text-[#f02e65] transition-all"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive
              ? "text-[#f02e65] border-b-2 px-1 border-[#f02e65] pb-1 transition-all"
              : "hover:text-[#f02e65] transition-all"
          }
        >
          Events
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-[#f02e65]"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-5 py-5 text-lg font-semibold font-sans md:hidden">
          <NavLink
            to="/"
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-[#f02e65] border-b-2 border-[#f02e65] pb-1"
                : "hover:text-[#f02e65]"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/admin"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-[#f02e65] border-b-2 border-[#f02e65] pb-1"
                : "hover:text-[#f02e65]"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/events"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-[#f02e65] border-b-2 border-[#f02e65] pb-1"
                : "hover:text-[#f02e65]"
            }
          >
            Events
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
