import { account, OAuthProvider } from "./appwrite";

// Production Google OAuth and Magic Link redirect URL
const PROD_REDIRECT = "https://evento-orcin.vercel.app/auth-redirect";

// Login with Google (production configuration only)
export const loginWithGoogle = () => {
  account.createOAuth2Session(
    OAuthProvider.Google,
    PROD_REDIRECT, // Success redirect (production)
    PROD_REDIRECT // Failure redirect (production, or use a dedicated failure page if desired)
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

// **NEW**: Send Magic Link for login
export const sendMagicLink = (email) => {
  // Use a unique session ID, e.g. current timestamp
  const sessionId = String(Date.now());
  return account.createMagicURLSession(sessionId, email, PROD_REDIRECT);
};
