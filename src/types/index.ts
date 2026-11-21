// Types for QuickCart

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  images: string[];
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
  isFeatured?: boolean;
  discountPercentage?: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
};

export type PromoCode = {
  code: string;
  discountRate: number; // e.g. 0.15 for 15%
  minSpend?: number;
};

export type OrderSummaryType = {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

export type DeliveryAddress = {
  id: string;
  title: string;
  addressLine: string;
  city: string;
  phone: string;
  isDefault: boolean;
};
