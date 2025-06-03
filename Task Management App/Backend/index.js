import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/db/index.js";

import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello MongoDB");
});

// define routes
app.use("/api/v1", todosRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo DB connection failed !!! ", error);
  });