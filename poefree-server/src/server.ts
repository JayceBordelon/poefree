import app from "./app";
import prisma from "./config/db";

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

const shutdown = async () => {
  console.log("\nShutting down gracefully...");
  try {
    await prisma.$disconnect();
    console.log("Database connection closed.");

    server.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
    });
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
