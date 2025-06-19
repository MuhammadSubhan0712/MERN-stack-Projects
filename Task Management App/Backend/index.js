import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/db/index.js";
import authRoute from "./src/routes/auth.route.js";
import taskRoute from "./src/routes/task.route.js";

import cors from "cors";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello Task Management App");
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// define routes :

app.use("/api/v1/auth", authRoute);
app.use("/api/v1", taskRoute);


connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`📡   Server is running at port: ${process.env.PORT}  ⚙️`);
    });
  })
  .catch((error) => {
    console.log("❌ Mongo DB connection failed !!! ❌", error);
  });
