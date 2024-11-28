import { useContext } from "react";
import { ProductContext } from "../context/product";

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error("useCart necesita de CartProvider");
  }

  return context;
};
