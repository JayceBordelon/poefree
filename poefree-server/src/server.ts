import app from "./app";
import prisma from "./config/db";

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown logic
const shutdown = async () => {
  console.log("\nShutting down gracefully...");
  try {
    // Close database connection
    await prisma.$disconnect();
    console.log("Database connection closed.");

    // Close the HTTP server
    server.close(() => {
      console.log("HTTP server closed.");
      process.exit(0); // Exit the process
    });
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1); // Exit with failure
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
