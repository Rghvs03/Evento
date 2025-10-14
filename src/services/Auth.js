import { account, OAuthProvider } from "./appwrite";

// Login with Google (with local redirect URIs for development)
export const loginWithGoogle = () => {
  account.createOAuth2Session(
    OAuthProvider.Google,
    "http://localhost:5173/auth-redirect", // Success redirect (local)
    "http://localhost:5173/auth?error=true" // Failure redirect (local)
  );
};

// Logout user
export const logoutUser = () => {
  return account.deleteSession("current");
};

// Get current user details
export const getUser = () => {
  return account.get();
};
