import express from "express";
import cors from "cors";
import path from "path";
import { MemStorage } from "./storage";

const app = express();
const PORT = parseInt(process.env.PORT || "5000");

// Initialize storage
const storage = new MemStorage();

// Middleware
app.use(cors());
app.use(express.json());

// API routes - manually defined to avoid routing issues
app.get("/api/products", async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    
    let products;
    if (search) {
      products = await storage.searchProducts(search as string);
    } else if (category) {
      products = await storage.getProductsByCategory(category as string);
    } else if (featured === 'true') {
      products = await storage.getFeaturedProducts();
    } else {
      products = await storage.getProducts();
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await storage.getReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

app.post("/api/inquiries", async (req, res) => {
  try {
    const inquiry = await storage.addInquiry(req.body);
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ error: "Failed to add inquiry" });
  }
});

// Serve static files from client/dist
app.use(express.static(path.join(process.cwd(), "client/dist")));

// Handle SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "client/dist/index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Alia Star SK Furniture website running at http://localhost:${PORT}`);
  console.log(`📱 Visit the website to see the complete furniture catalog!`);
});