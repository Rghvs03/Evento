import React, { useState } from "react";
import {
  loginWithGoogle,
  sendPhoneCode,
  verifyPhoneCode,
  logoutUser,
  getUser,
} from "../services/Auth";

const Auth = () => {
  const [phone, setPhone] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [userId, setUserId] = useState("");
  const [secret, setSecret] = useState("");
  const [user, setUser] = useState(null);

  // Check user session on mount
  React.useEffect(() => {
    getUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  const handlePhoneSubmit = async () => {
    try {
      const response = await sendPhoneCode(phone);
      setUserId(response.userId); // Save for verification
      setCodeSent(true);
    } catch (err) {
      alert("Error sending code", err);
    }
  };

  const handleCodeVerify = async () => {
    try {
      await verifyPhoneCode(userId, secret);
      const currentUser = await getUser();
      setUser(currentUser);
    } catch (err) {
      alert("Invalid code", err);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setCodeSent(false);
    setUserId("");
    setSecret("");
    setPhone("");
  };

  // Auth UI
  if (user) {
    return (
      <div>
        <h2>Welcome, {user.name || user.email || user.phone}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleGoogleLogin}>Continue with Google</button>

      <div>
        <h3>Continue with Phone Number</h3>
        {!codeSent ? (
          <>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
            <button onClick={handlePhoneSubmit}>Send Code</button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter verification code"
            />
            <button onClick={handleCodeVerify}>Verify</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
