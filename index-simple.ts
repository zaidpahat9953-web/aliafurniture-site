import express from "express";
import cors from "cors";
import { MemStorage } from "./storage";

const app = express();
const PORT = parseInt(process.env.PORT || "5000");

// Initialize storage
const storage = new MemStorage();

// Basic middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Products routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await storage.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});