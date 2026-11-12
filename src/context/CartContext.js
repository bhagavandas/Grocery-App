
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "grocery-app-cart";

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCart);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cartItems]);

  // Add product
  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || product.id == null) return;

    const amount = Math.max(1, Number(quantity) || 1);

    setCartItems((items) => {
      const existing = items.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + amount,
              }
            : item
        );
      }

      return [
        ...items,
        {
          ...product,
          quantity: amount,
        },
      ];
    });
  }, []);

  // Increase / decrease quantity
  const updateQuantity = useCallback((productId, quantity) => {
    const amount = Number(quantity);

    if (!Number.isFinite(amount)) return;

    setCartItems((items) => {
      if (amount <= 0) {
        return items.filter(
          (item) => item.id !== productId
        );
      }

      return items.map((item) =>
        item.id === productId
          ? { ...item, quantity: amount }
          : item
      );
    });
  }, []);

  // Remove product
  const removeFromCart = useCallback((productId) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== productId)
    );
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Total quantity
  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [cartItems]
  );

  // Total price
  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + Number(item.price || 0) * item.quantity,
        0
      ),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};
