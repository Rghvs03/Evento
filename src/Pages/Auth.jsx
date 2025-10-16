import React, { useState, useEffect } from "react";
import {
  loginWithGoogle,
  logoutUser,
  getUser,
  registerWithEmail,
  loginWithEmail,
} from "../services/Auth";
import { Boxes } from "lucide-react";
import { RiGoogleFill } from "@remixicon/react";

const Auth = () => {
  const [user, setUser] = useState(null);
  const [formType, setFormType] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For signup only
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (formType === "signup") {
        await registerWithEmail(email, password, name);
        await loginWithEmail(email, password); // Immediately log them in after signup
      } else {
        await loginWithEmail(email, password);
      }
      const account = await getUser();
      setUser(account);
      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      setError(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
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
            className="flex items-center gap-3 w-full justify-center px-4 py-2.5 rounded-xl bg-white border-2 border-[#f02e65] shadow text-gray-800 font-large text-lg focus:outline-none hover:border-pink-600 transition"
          >
            <RiGoogleFill />
            Continue with Google
          </button>
        </div>
        <div className="flex justify-center gap-6 pt-6">
          <button
            className={`px-4 py-2 rounded-xl font-bold ${
              formType === "login"
                ? "bg-[#f02e65] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFormType("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-xl font-bold ${
              formType === "signup"
                ? "bg-[#f02e65] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFormType("signup")}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4 pt-4">
          {formType === "signup" && (
            <input
              type="text"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          )}
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-[#f02e65] text-white font-bold hover:bg-pink-700 transition"
          >
            {loading
              ? "Please wait..."
              : formType === "signup"
              ? "Sign Up"
              : "Log In"}
          </button>
        </form>
        {error && (
          <div className="text-red-600 font-semibold pt-2">{error}</div>
        )}
      </div>
    </div>
  );
};

export default Auth;
