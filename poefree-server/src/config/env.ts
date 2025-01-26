import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Destructure the environment variable
export const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in your environment variables.");
}
