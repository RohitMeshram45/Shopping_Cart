"use client";
import React, { createContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';

// Creating the Cart context
export const CartContext = createContext();

// Creating the Cart provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  console.log(cartItems);

  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    try {
      const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
      if (savedCartItems) {
        setCartItems(savedCartItems);
      }
    } catch (error) {
      toast.error("Failed to load cart items from local storage");
    }
  }, []);

  // Save cart data to localStorage whenever cartItems state changes
  useEffect(() => {
    try {
      if (cartItems.length > 0) {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        localStorage.removeItem("cartItems"); // Clear if the cart is empty
      }
    } catch (error) {
      toast.error("Failed to save cart items to local storage");
    }
  }, [cartItems]);

  // Function to decrease the quantity of a product in the cart
  const minusProduct = (item) => {
    try {
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          toast.success(`${item.name} quantity decreased`);
          setCartItems(
            cartItems.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            )
          );
        } else {
          removeItem(item.id); // Remove item if quantity reaches 0
        }
      } else {
        toast.error("Product not found in cart");
      }
    } catch (error) {
      toast.error("Something went wrong while updating the cart");
    }
  };

  // Function to add an item to the cart
  const addToCart = (item) => {
    try {
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        toast.success(`${item.name} quantity increased`);
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
      } else {
        toast.success(`${item.name} added to cart`);
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
    } catch (error) {
      toast.error("Something went wrong while adding to the cart");
    }
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    try {
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);

      toast.success("Item removed successfully!");
    } catch (error) {
      toast.error("Something went wrong while removing the item");
    }
  };

  // Function to calculate the total price of all items in the cart
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, minusProduct, removeItem, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
