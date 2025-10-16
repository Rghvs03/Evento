import { account, OAuthProvider } from "./appwrite";

// Production Google OAuth redirect URL
const PROD_REDIRECT = "https://evento-orcin.vercel.app/auth-redirect";

// Login with Google (production configuration only)
export const loginWithGoogle = () => {
  account.createOAuth2Session(
    OAuthProvider.Google,
    PROD_REDIRECT, // Success redirect (production)
    PROD_REDIRECT // Failure redirect (production, or use a dedicated failure page if desired)
  );
};

// Email/Password Signup
export const registerWithEmail = (email, password, name = "") => {
  // Generate a unique userId for each new signup
  const userId = String(Date.now());
  return account.create(userId, email, password, name);
};

// Email/Password Login
export const loginWithEmail = (email, password) => {
  return account.createEmailSession(email, password);
};

// Logout user
export const logoutUser = () => {
  return account.deleteSession("current");
};

// Get current user details
export const getUser = () => {
  return account.get();
};
