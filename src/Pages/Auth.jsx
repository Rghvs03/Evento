import React, { useState, useEffect } from "react";
import {
  loginWithGoogle,
  logoutUser,
  getUser,
  sendMagicLink,
} from "../services/Auth";
import { Boxes } from "lucide-react";
import { RiBardFill, RiGoogleFill } from "@remixicon/react";

const Auth = () => {
  const [user, setUser] = useState(null);
  const [magicEmail, setMagicEmail] = useState("");
  const [magicSent, setMagicSent] = useState(false);
  const [magicError, setMagicError] = useState("");
  const [showMagicForm, setShowMagicForm] = useState(false);

  useEffect(() => {
    getUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setMagicSent(false);
    setMagicError("");
    try {
      await sendMagicLink(magicEmail);
      setMagicSent(true);
      setShowMagicForm(false); // Optional: hide form after sending
    } catch (err) {
      setMagicError("Magic link send failed. Please check your email.");
    }
  };

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="bg-white shadow-md p-8 rounded-2xl border border-gray-100 flex flex-col items-center max-w-md w-full">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            You are logged in as{" "}
            <span className="font-semibold">{user.name || user.email}</span> 🎉
          </p>
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold shadow hover:bg-gray-800 transition mb-2"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full overflow-hidden flex-col items-center justify-center max-h-screen bg-white px-6 sm:px-4 md:px-2">
      <div className="w-full sm:mt-18 max-w-2xl sm:w-[75%] md:w-[60%] lg:w-[38%] flex flex-col gap-5">
        <div className="flex w-full flex-col items-center gap-5 pt-4 pb-8">
          <Boxes className="mt-10 text-[#f02e65] animate-bounce" size={50} />
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-[#f02e65] mb-2 drop-shadow-md text-center">
            Welcome to EventO{" "}
          </h1>
          <div>
            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-semibold text-center">
              Ready to Rock Your Campus? Register Now!
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-semibold text-center">
              Where Campus Life Meets Non-Stop Fun!
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-3 w-full sm:w-1/2 justify-center px-4 py-2.5 rounded-xl bg-white border-2 border-[#f02e65] shadow text-gray-800 font-large text-lg focus:outline-none hover:border-pink-600 transition"
          >
            <RiGoogleFill />
            Continue with Google
          </button>
          <button
            onClick={() => setShowMagicForm((v) => !v)}
            className="flex items-center gap-3 w-full sm:w-1/2 justify-center px-4 py-2.5 rounded-xl bg-white border-2 border-[#f02e65] shadow text-gray-800 font-large text-lg focus:outline-none hover:border-pink-600 transition"
          >
            <RiBardFill />
            Continue with Magic link
          </button>
        </div>
        {/* Magic Link Form */}
        {showMagicForm && (
          <form onSubmit={handleMagicLink} className="flex flex-col gap-2 mt-3">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={magicEmail}
              onChange={(e) => setMagicEmail(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#f02e65] text-white hover:bg-pink-700 transition"
            >
              Send Magic Link
            </button>
          </form>
        )}
        {magicSent && (
          <span className="mt-2 text-green-600 font-semibold">
            Check your email for the magic link!
          </span>
        )}
        {magicError && <span className="mt-2 text-red-600">{magicError}</span>}
      </div>
    </div>
  );
};

export default Auth;
