import type { Product, Review, Inquiry, CartItem, InsertProduct, InsertReview, InsertInquiry, InsertCartItem } from "../shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | null>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Reviews
  getReviews(): Promise<Review[]>;
  getProductReviews(productId: number): Promise<Review[]>;
  addReview(review: InsertReview): Promise<Review>;
  
  // Inquiries
  getInquiries(): Promise<Inquiry[]>;
  addInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  // Cart
  getCartItems(): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | null>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(): Promise<void>;
}

export class MemStorage implements IStorage {
  private products: Product[] = [
    {
      id: 1,
      name: "Premium Bonded Mattress",
      category: "bonded",
      description: "High quality bonded foam mattress with excellent support and durability",
      price: 8500,
      image: "/api/placeholder-mattress-1.jpg",
      inStock: true,
      featured: true,
    },
    {
      id: 2,
      name: "Memory Foam Mattress",
      category: "foam",
      description: "Comfortable memory foam mattress that contours to your body",
      price: 12000,
      image: "/api/placeholder-mattress-2.jpg",
      inStock: true,
      featured: true,
    },
    {
      id: 3,
      name: "Spring Comfort Mattress",
      category: "spring",
      description: "Traditional spring mattress with superior bounce and support",
      price: 15000,
      image: "/api/placeholder-mattress-3.jpg",
      inStock: true,
      featured: false,
    },
    {
      id: 4,
      name: "HR Foam Mattress",
      category: "hr",
      description: "High resilience foam mattress for ultimate comfort",
      price: 10000,
      image: "/api/placeholder-mattress-4.jpg",
      inStock: true,
      featured: true,
    },
    {
      id: 5,
      name: "Memorial Foam Mattress",
      category: "memorial",
      description: "Special memorial foam technology for perfect sleep",
      price: 14000,
      image: "/api/placeholder-mattress-5.jpg",
      inStock: true,
      featured: false,
    },
  ];

  private reviews: Review[] = [
    {
      id: 1,
      customerName: "Rajesh Kumar",
      rating: 5,
      comment: "बहुत बढ़िया गद्दा है। बहुत आरामदायक है और नींद अच्छी आती है।",
      productId: 1,
      date: "2024-08-15",
    },
    {
      id: 2,
      customerName: "Priya Sharma",
      rating: 4,
      comment: "Good quality mattress. Value for money.",
      productId: 2,
      date: "2024-08-20",
    },
    {
      id: 3,
      customerName: "Amit Singh",
      rating: 5,
      comment: "Excellent service and product quality. Highly recommended!",
      date: "2024-08-25",
    },
  ];

  private inquiries: Inquiry[] = [];
  private cartItems: CartItem[] = [];
  private nextId = {
    product: 6,
    review: 4,
    inquiry: 1,
    cartItem: 1,
  };

  async getProducts(): Promise<Product[]> {
    return [...this.products];
  }

  async getProduct(id: number): Promise<Product | null> {
    return this.products.find(p => p.id === id) || null;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return this.products.filter(p => p.featured);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.products.filter(p => p.category === category);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getReviews(): Promise<Review[]> {
    return [...this.reviews];
  }

  async getProductReviews(productId: number): Promise<Review[]> {
    return this.reviews.filter(r => r.productId === productId);
  }

  async addReview(review: InsertReview): Promise<Review> {
    const newReview: Review = {
      ...review,
      id: this.nextId.review++,
      date: new Date().toISOString().split('T')[0],
    };
    this.reviews.push(newReview);
    return newReview;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return [...this.inquiries];
  }

  async addInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: this.nextId.inquiry++,
      date: new Date().toISOString().split('T')[0],
    };
    this.inquiries.push(newInquiry);
    return newInquiry;
  }

  async getCartItems(): Promise<CartItem[]> {
    return [...this.cartItems];
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const existingItem = this.cartItems.find(ci => ci.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      return existingItem;
    }

    const newCartItem: CartItem = {
      ...item,
      id: this.nextId.cartItem++,
    };
    this.cartItems.push(newCartItem);
    return newCartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | null> {
    const item = this.cartItems.find(ci => ci.id === id);
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return null;
  }

  async removeFromCart(id: number): Promise<boolean> {
    const index = this.cartItems.findIndex(ci => ci.id === id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      return true;
    }
    return false;
  }

  async clearCart(): Promise<void> {
    this.cartItems = [];
  }
}