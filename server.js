const express = require("express");
const connectDB = require("./db/connectDB");
require("dotenv").config();

const userRoute = require("./routes/userRoute");
const courseRoute = require("./routes/coursRoute");

const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

// ✅ CONNECT DB
connectDB();

// ✅ CORS
app.use(cors({
  origin: "*", // your frontend
  credentials: true,
}));

// ✅ BODY PARSERS (MUST be BEFORE routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("server is running");
});

// ✅ ROUTES
app.use("/api/user", userRoute);
app.use("/api/course", courseRoute);

// ✅ START SERVER
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
