// Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const crudRoutes = require("./routes/crudRoutes");

// Initialize dotenv to use environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api", crudRoutes); // CRUD routes

// Define a PORT for the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
