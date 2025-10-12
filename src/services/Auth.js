import { account, OAuthProvider } from "./appwrite";

// Login with Google
export const loginWithGoogle = () => {
  account.createOAuth2Session(OAuthProvider.Google);
};

// Phone Authentication
export const sendPhoneCode = (phone) => {
  return account.createPhoneToken(phone);
};

export const verifyPhoneCode = (userId, secret) => {
  return account.createSession(userId, secret);
};

// Logout
export const logoutUser = () => {
  return account.deleteSession("current");
};

// Get current user details
export const getUser = () => {
  return account.get();
};
