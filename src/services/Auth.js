import { account, OAuthProvider } from "./appwrite";

// Login with Google
export const loginWithGoogle = () => {
  account.createOAuth2Session(OAuthProvider.Google);
};


// Logout
export const logoutUser = () => {
  return account.deleteSession("current");
};

// Get current user details
export const getUser = () => {
  return account.get();
};
