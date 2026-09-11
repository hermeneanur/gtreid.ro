"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

export interface CartItem {
  slug: string;
  quantity: number;
  selectedColor?: string;
  selectedMaterial?: string;
}

interface AppContextProps {
  theme: Theme;
  toggleTheme: () => void;
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  quoteItems: string[];
  addToQuote: (slug: string) => void;
  removeFromQuote: (slug: string) => void;
  clearQuote: () => void;
  isQuoteModalOpen: boolean;
  setQuoteModalOpen: (open: boolean) => void;
  
  // Cart properties
  cartItems: CartItem[];
  addToCart: (slug: string, quantity?: number, color?: string, material?: string) => void;
  removeFromCart: (slug: string) => void;
  updateCartQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("dark"); // Default to dark for a premium premium look
  const [favorites, setFavorites] = useState<string[]>([]);
  const [quoteItems, setQuoteItems] = useState<string[]>([]);
  const [isQuoteModalOpen, setQuoteModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("gtreid-theme") as Theme;
    if (savedTheme && savedTheme === "light") {
      React.startTransition(() => {
        setTheme("light");
      });
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    React.startTransition(() => {
      const savedFavs = localStorage.getItem("gtreid-favorites");
      if (savedFavs) {
        try {
          setFavorites(JSON.parse(savedFavs));
        } catch (e) {
          console.error(e);
        }
      }

      const savedQuote = localStorage.getItem("gtreid-quotes");
      if (savedQuote) {
        try {
          setQuoteItems(JSON.parse(savedQuote));
        } catch (e) {
          console.error(e);
        }
      }

      const savedCart = localStorage.getItem("gtreid-cart");
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error(e);
        }
      }
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("gtreid-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleFavorite = (slug: string) => {
    let updated: string[];
    if (favorites.includes(slug)) {
      updated = favorites.filter((item) => item !== slug);
    } else {
      updated = [...favorites, slug];
    }
    setFavorites(updated);
    localStorage.setItem("gtreid-favorites", JSON.stringify(updated));
  };

  const addToQuote = (slug: string) => {
    if (!quoteItems.includes(slug)) {
      const updated = [...quoteItems, slug];
      setQuoteItems(updated);
      localStorage.setItem("gtreid-quotes", JSON.stringify(updated));
    }
    setQuoteModalOpen(true); // Open modal automatically when added
  };

  const removeFromQuote = (slug: string) => {
    const updated = quoteItems.filter((item) => item !== slug);
    setQuoteItems(updated);
    localStorage.setItem("gtreid-quotes", JSON.stringify(updated));
  };

  const clearQuote = () => {
    setQuoteItems([]);
    localStorage.removeItem("gtreid-quotes");
  };

  // Cart operations
  const addToCart = (slug: string, quantity: number = 1, color?: string, material?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.slug === slug);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.slug === slug ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updated = [...prev, { slug, quantity, selectedColor: color, selectedMaterial: material }];
      }
      localStorage.setItem("gtreid-cart", JSON.stringify(updated));
      return updated;
    });
    setCartOpen(true); // Open the cart panel immediately on addition
  };

  const removeFromCart = (slug: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.slug !== slug);
      localStorage.setItem("gtreid-cart", JSON.stringify(updated));
      return updated;
    });
  };

  const updateCartQuantity = (slug: string, quantity: number) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.slug === slug ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      localStorage.setItem("gtreid-cart", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("gtreid-cart");
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        favorites,
        toggleFavorite,
        quoteItems,
        addToQuote,
        removeFromQuote,
        clearQuote,
        isQuoteModalOpen,
        setQuoteModalOpen,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
