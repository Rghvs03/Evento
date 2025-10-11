import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Uses .env variable
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Uses .env variable

const account = new Account(client);

export { client, account };
