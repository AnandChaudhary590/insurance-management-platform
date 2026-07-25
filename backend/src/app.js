const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Insurance Management Platform API is running",
  });
});

app.use(express.json());

app.use("/api/auth", authRoutes);

//Protected Route
app.get("/api/protected", authMiddleware, (req, res)=>{
    res.status(200).json({
        message: "You accessed a protected route",
        user: req.user,
    });
});

// Admin Only Route
app.get(
  "/api/admin",
  authMiddleware,
  roleMiddleware("ADMIN"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});