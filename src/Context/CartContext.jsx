import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { showToastHandler, isLoggedIn } = useContext(AuthContext);

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Add to Cart
  const addToCart = (product) => {
  if (!isLoggedIn) {
    showToastHandler(
      "Login Required",
      "Please login to add items",
      "error"
    );
    return;
  }

  setCart((prev) => {
    const alreadyExists = prev.some(
      (item) => String(item.id) === String(product.id) 
    );

    if (alreadyExists) {
      console.log("------------")
      showToastHandler(
        "Already Added",
        `${product.title} is already in cart`,
        "info"
      );
      return prev; 
    }

    showToastHandler(
      "Added to Cart",
      `${product.title} added to cart 🛒`,
      "success"
    );

    return [...prev, product]; 
  });
};


  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((ele) => ele.id !== id));

    showToastHandler("Removed", "Item removed from cart", "info");
  };

  const clearCart = () => {
    localStorage.removeItem("cartItems")
  }


  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,showToastHandler,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};