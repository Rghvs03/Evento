import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUser } from "../services/Auth";
import { checkIsAdmin } from "../services/admin";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const user = await getUser();
        if (!user?.email) {
          throw new Error("Could not fetch user email.");
        }

        const isAdmin = await checkIsAdmin(user.email);
        console.log("DEBUG: checking admin", user.email, isAdmin); // Debug log

        if (mounted) setLoading(false);

        if (isAdmin) {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/user/dashboard", { replace: true });
        }
      } catch (e) {
        if (mounted) {
          setError("Authentication failed. Please login again.");
          setLoading(false);
        }
        console.error(e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <span className="text-xl font-semibold mb-4">Authenticating...</span>
        <div className="animate-spin h-8 w-8 border-4 border-pink-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <span className="text-lg font-semibold text-red-600 mb-2">{error}</span>
      <button
        onClick={() => navigate("/auth")}
        className="px-5 py-2 rounded bg-pink-600 text-white font-semibold"
      >
        Back to Login
      </button>
    </div>
  );
};

export default AuthRedirect;
