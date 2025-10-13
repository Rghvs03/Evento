import { account, OAuthProvider } from "./appwrite";

// Login with Google (with local redirect URIs for development)
export const loginWithGoogle = () => {
  account.createOAuth2Session(
    OAuthProvider.Google,
    "http://localhost:5173/auth-redirect", // Success redirect (local)
    "http://localhost:5173/auth?error=true" // Failure redirect (local)
  );
};

<<<<<<< HEAD
// Logout user
=======

// Logout
>>>>>>> 8f27a78299589866783ace77ebac27c7dbe658b9
export const logoutUser = () => {
  return account.deleteSession("current");
};

// Get current user details
export const getUser = () => {
  return account.get();
};
