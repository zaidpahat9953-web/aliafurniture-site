import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

// Product schema for mattresses and furniture
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.enum(["bonded", "foam", "memorial", "hr", "spring", "furniture"]),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
});

// Customer review schema
export const ReviewSchema = z.object({
  id: z.number(),
  customerName: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  productId: z.number().optional(),
  date: z.string(),
});

// Contact inquiry schema
export const InquirySchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email().optional(),
  message: z.string(),
  productInterest: z.string().optional(),
  date: z.string(),
});

// Cart item schema
export const CartItemSchema = z.object({
  id: z.number(),
  productId: z.number(),
  quantity: z.number().min(1),
  price: z.number(),
});

// Insert schemas (for forms)
export const insertProductSchema = ProductSchema.omit({ id: true });
export const insertReviewSchema = ReviewSchema.omit({ id: true, date: true });
export const insertInquirySchema = InquirySchema.omit({ id: true, date: true });
export const insertCartItemSchema = CartItemSchema.omit({ id: true });

// Types
export type Product = z.infer<typeof ProductSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type Inquiry = z.infer<typeof InquirySchema>;
export type CartItem = z.infer<typeof CartItemSchema>;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;