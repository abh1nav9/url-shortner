import express from "express";
import cors from "cors";
import urlRoutes from "./routes/routes.js";
const app = express();

app.use(cors());
app.use(express.json());

// API endpoint
app.use("/api/url", urlRoutes);

// SHORT URL endpoint (root-level)
app.use("/", urlRoutes);

export default app;
