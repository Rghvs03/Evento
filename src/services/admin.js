import { databases } from "./appwrite"; // only databases from local file
import { Query } from "appwrite"; // import Query directly from the SDK

const DATABASE_ID = "68e9e81600378393ccf8";
const ADMINS_TABLE_ID = "admins";

export const checkIsAdmin = async (email) => {
  try {
    const res = await databases.listDocuments(DATABASE_ID, ADMINS_TABLE_ID, [
      Query.equal("email", email),
    ]);
    return res.documents.length > 0;
  } catch (e) {
    console.error("Admin check error:", e);
    return false;
  }
};

