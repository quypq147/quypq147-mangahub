require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// Routes
const mangaRoutes = require("./routes/mangaRoutes");
const authRoutes = require("./routes/authRoutes");
const forumRoutes = require("./routes/forumRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/manga", mangaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/chapters", require("./routes/chapterRoutes"));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
