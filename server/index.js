import express from "express";
import dotenv from "dotenv";
import { projectData } from "./data.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
const port = process.env.PORT || 8000;

app.get("/projects", (req, res) => {
  res.json(projectData);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
