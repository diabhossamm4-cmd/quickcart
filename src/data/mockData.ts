import { Category, DeliveryAddress, Product, PromoCode } from "../types";

export const CATEGORIES: Category[] = [
  { id: "all", name: "All Items", icon: "grid" },
  { id: "electronics", name: "Electronics", icon: "smartphone" },
  { id: "clothing", name: "Fashion", icon: "shopping-bag" },
  { id: "footwear", name: "Shoes", icon: "disc" },
  { id: "accessories", name: "Watches", icon: "watch" },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Noise Cancelling Wireless Headphones Pro",
    description: "Industry-leading active noise cancellation with 40-hour battery life, high-res audio drivers, and supreme memory foam comfort.",
    price: 199.99,
    originalPrice: 249.99,
    discountPercentage: 20,
    rating: 4.8,
    reviewsCount: 324,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80"
    ],
    inStock: true,
    colors: ["#111827", "#E5E7EB", "#1E3A8A"],
    isFeatured: true,
  },
  {
    id: "prod-2",
    title: "Minimalist Chronograph Smart Watch",
    description: "Stainless steel case, sapphire crystal glass, health sensors, AMOLED always-on display with 7-day battery life.",
    price: 159.00,
    originalPrice: 189.00,
    discountPercentage: 15,
    rating: 4.6,
    reviewsCount: 182,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80"
    ],
    inStock: true,
    colors: ["#000000", "#94A3B8", "#D97706"],
    isFeatured: true,
  },
  {
    id: "prod-3",
    title: "Air Cushion Lightweight Running Sneakers",
    description: "Breathable engineered mesh upper, responsive responsive foam midsole, and durable rubber traction outsole for daily runs.",
    price: 89.99,
    originalPrice: 119.99,
    discountPercentage: 25,
    rating: 4.7,
    reviewsCount: 450,
    category: "footwear",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"
    ],
    inStock: true,
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    colors: ["#EF4444", "#1E293B", "#3B82F6"],
    isFeatured: true,
  },
  {
    id: "prod-4",
    title: "Heavyweight Cotton Oversized Hoodie",
    description: "450 GSM organic French terry cotton with a relaxed silhouette, drop shoulders, and reinforced ribbed cuffs.",
    price: 64.50,
    originalPrice: 79.99,
    discountPercentage: 19,
    rating: 4.9,
    reviewsCount: 290,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80"
    ],
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#334155", "#0F172A", "#64748B"],
    isFeatured: false,
  },
  {
    id: "prod-5",
    title: "Ultra-Portable Bluetooth Speaker IPX7",
    description: "360-degree immersive sound with deep bass, fully waterproof IPX7 design, and 24 hours of continuous playback.",
    price: 49.99,
    originalPrice: 69.99,
    discountPercentage: 28,
    rating: 4.5,
    reviewsCount: 98,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"
    ],
    inStock: true,
    colors: ["#1E293B", "#059669", "#EA580C"],
    isFeatured: false,
  },
  {
    id: "prod-6",
    title: "Polarized UV400 Classic Sunglasses",
    description: "Handcrafted acetate frame with scratch-resistant polarized lenses that eliminate glare and provide 100% UV protection.",
    price: 39.00,
    rating: 4.4,
    reviewsCount: 65,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
    ],
    inStock: true,
    colors: ["#000000", "#78350F"],
    isFeatured: false,
  }
];

export const PROMO_CODES: PromoCode[] = [
  { code: "WELCOME10", discountRate: 0.10 },
  { code: "SAVE20", discountRate: 0.20, minSpend: 100 },
];

export const DEFAULT_ADDRESSES: DeliveryAddress[] = [
  {
    id: "addr-1",
    title: "Home",
    addressLine: "742 Evergreen Terrace, Apt 4B",
    city: "Cairo, Egypt",
    phone: "+20 100 123 4567",
    isDefault: true,
  },
  {
    id: "addr-2",
    title: "Office",
    addressLine: "Tech Hub Tower, 12th Floor, New Cairo",
    city: "Cairo, Egypt",
    phone: "+20 100 987 6543",
    isDefault: false,
  }
];
