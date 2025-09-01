import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createRoutes } from "./routes";
import { MemStorage } from "./storage";

const app = express();
const PORT = parseInt(process.env.PORT || "3000");

// Initialize storage
const storage = new MemStorage();

// Middleware
// app.use(helmet({
//   contentSecurityPolicy: false,
//   crossOriginEmbedderPolicy: false,
// }));
app.use(cors());
app.use(express.json());

// API routes
app.use(createRoutes(storage));

// Serve static files from the built frontend
app.use(express.static("client/dist"));

// Handle SPA routing - serve index.html for all non-API routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    res.status(404).json({ error: "API endpoint not found" });
  } else {
    res.sendFile("index.html", { root: "client/dist" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});