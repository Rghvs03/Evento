import { Client, Account, OAuthProvider, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client); // <-- Create an instance here

export { client, account, OAuthProvider, databases }; // <-- Export the instance, not the class
