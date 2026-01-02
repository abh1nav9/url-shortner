import express from "express";
import cors from "cors";
import urlRoutes from "./routes/routes.js";

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// API endpoint
app.use("/api/url", urlRoutes);

// SHORT URL endpoint (root-level)
app.use("/", urlRoutes);

export default app;
