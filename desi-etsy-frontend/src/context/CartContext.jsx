import { createContext, useContext, useState, useEffect } from "react";

// CartContext create kar rahe hain
export const CartContext = createContext();

// Is hook se context use hoga
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  // ⏬ LocalStorage se cart data load karo (first time)
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ⏫ Jaise hi cartItems change honge, localStorage update hoga
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Cart me item add karne ka function
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item._id === product._id);
      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ➖ Remove karne ka function
  const removeFromCart = (productToRemove) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== productToRemove._id)
    );
  };

  // 🔁 Quantity update karne ka function
  const updateQuantity = (productId, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // ✅ Sab kuch export kar rahe hain value ke andar
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  // Provider wrap karta hai pura app
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
