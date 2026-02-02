import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  addToCart,
  removeQtyFormcart,
  getCartData
} from "../Service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {

  // ✅ STATE DEFINITIONS
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuentities] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // ================= CART =================
  const loadCartData = async (token) => {
    if (!token) return;
    const items = await getCartData(token);
    setQuentities(items || {});
  };

  const increaseQty = async (foodId) => {
    if (!token) return;

    setQuentities(prev => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));

    await addToCart(foodId, token);
  };

  const decreaseQty = async (foodId) => {
    if (!token) return;

    setQuentities(prev => ({
      ...prev,
      [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
    }));

    await removeQtyFormcart(foodId, token);
  };

  const removeFromCart = (foodId) => {
    setQuentities(prev => {
      const updated = { ...prev };
      delete updated[foodId];
      return updated;
    });
  };

  // ================= FOOD LIST =================
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8084/api/public/foods"
      );
      setFoodList(response.data);

      if (token) {
        await loadCartData(token);
      }

    } catch (error) {
      console.error("Error fetching food list", error);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  // ================= PROVIDER =================
  return (
    <StoreContext.Provider
      value={{
        foodList,
        quantities,
        increaseQty,
        decreaseQty,
        removeFromCart,
        token,
        setToken,
        setQuentities,
        loadCartData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
