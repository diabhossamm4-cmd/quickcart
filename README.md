# 🛍️ QuickCart - Modern E-Commerce Mobile App

![React Native](https://img.shields.io/badge/React_Native-0.76-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK_52-black?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/NativeWind-Tailwind_CSS-38BDF8?logo=tailwindcss)
![State](https://img.shields.io/badge/State-Zustand-orange)
![License](https://img.shields.io/badge/License-MIT-green)

A production-ready, beautifully designed cross-platform e-commerce mobile application built with **React Native**, **Expo Router**, **TypeScript**, and **NativeWind (Tailwind CSS)**.

Designed with clean architecture and performance in mind, featuring seamless cart management, instant wishlist toggling, promo code deductions, and a multi-step checkout workflow.

---

## ✨ Features

- **📱 Tab-Based Navigation:** Powered by Expo Router with deep-linking support (`Home`, `Explore`, `Wishlist`, `Cart`, `Profile`).
- **🔍 Catalog & Instant Search:** Real-time keyword filtering, category pills, and multi-criteria sorting (Price Low/High, Rating, Featured).
- **🛒 Dynamic Cart & State Management:** Powered by **Zustand** with persistent storage support, quantity increment/decrement, and live badge counters.
- **🏷️ Promo Code Engine:** Validates promo codes (e.g. `WELCOME10`, `SAVE20`) with spend thresholds and automatic price adjustments.
- **❤️ Wishlist & Saved Items:** One-tap save for later with reactive syncing across the app.
- **💳 Multi-Step Checkout:** Address selection, payment method choices (Apple Pay / Credit Card / Cash on Delivery), and order confirmation modal.
- **🎨 Modern UI/UX:** Styled with Tailwind CSS (NativeWind) with fluid layouts, responsive image galleries, star ratings, and empty-state placeholders.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Framework** | [Expo SDK 52](https://expo.dev/) (Managed Workflow) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Routing** | [Expo Router v4](https://docs.expo.dev/router/introduction/) (File-based navigation) |
| **Styling** | [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Icons** | [@expo/vector-icons](https://icons.expo.fyi/) (Feather Icons) |

---

## 📂 Project Structure

```text
quickcart/
├── app/                        # Expo Router file-based screens
│   ├── (tabs)/                 # Bottom tab bar navigation
│   │   ├── _layout.tsx         # Tab bar configuration & badges
│   │   ├── index.tsx           # Home screen with banners & categories
│   │   ├── explore.tsx         # Search & filtering catalog
│   │   ├── wishlist.tsx        # Saved products
│   │   ├── cart.tsx            # Cart items & order summary
│   │   └── profile.tsx         # User profile & settings
│   ├── product/
│   │   └── [id].tsx            # Product details & image gallery
│   ├── checkout.tsx            # Checkout & payment workflow
│   └── _layout.tsx             # Root Stack navigation provider
├── src/
│   ├── components/
│   │   ├── cart/               # CartItemRow, OrderSummary
│   │   ├── common/             # Header, SearchBar, EmptyState, StarRating
│   │   ├── home/               # BannerCarousel
│   │   └── product/            # ProductCard, CategoryPill
│   ├── data/                   # Mock products & categories
│   ├── store/                  # Zustand global stores (Cart & Wishlist)
│   ├── types/                  # TypeScript interface definitions
│   └── utils/                  # Currency formatters & tax calculators
├── tailwind.config.js          # Tailwind theme & color extensions
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18+` (or `20+`)
- npm / yarn / pnpm
- [Expo Go](https://expo.dev/go) app on your iOS or Android device

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/diabhossamm4-cmd/quickcart.git
   cd quickcart
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on your device:**
   - Scan the QR code with **Expo Go** (Android) or the **Camera app** (iOS).
   - Or press `i` for iOS Simulator / `a` for Android Emulator.

---

## 🧪 Promo Codes (Try them out!)

| Code | Discount | Conditions |
|---|---|---|
| `WELCOME10` | **10% OFF** | No minimum spend |
| `SAVE20` | **20% OFF** | Minimum spend: $100 |

---

## 📄 License

This project is licensed under the MIT License - feel free to use it in your personal and commercial projects.
