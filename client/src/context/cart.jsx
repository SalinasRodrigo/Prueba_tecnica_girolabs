/* eslint-disable react/prop-types */
import { createContext, useEffect, useMemo, useState } from "react";

const cartInitialState = JSON.parse(window.localStorage.getItem("cart")) || [];
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(cartInitialState);
  const [productos, setProductos] = useState([]);
  const [sortedProducts, setSortedProducts] = useState(productos);
  const [filter, setFilter] = useState([]);
  const [sortCriteria, setSortCriteria] = useState({ criteria: null, asc: true });

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const getProducts = () => {
    let productFilter = "";
    filter.length > 1
      ? (productFilter = filter.join("&"))
      : (productFilter = filter.join(""));
    fetch(`/api/products/?${productFilter}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        const products = response;
        console.log(products);
        setProductos(products);
      });
  };

  const addToCart = (product) => {
    const productCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productCartIndex].quantity += 1;
      setCart(newCart);
      window.localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
      setCart(newCart);
      window.localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    window.localStorage.setItem("cart", JSON.stringify([]));
  };

  // const addProductsFilter = (newFilter, remove) => {
  //   const newFilters = filter.filter((item) => { //Elimina instancias anteriores de filtrados
  //       const [word1] = item.split("=");         //del mismo tipo.
  //       return word1 != remove;
  //     })
  //   setFilter([...newFilters, newFilter]);
  // };
  // const removeProductsFilter = (remove) => {
  //   const newFilters = structuredClone(filter)
  //   const removed = newFilters.filter((item) => { //Elimina instancias anteriores de filtrados
  //     const [word1] = item.split("=");            //del mismo tipo.
  //     return word1 != remove;
  //   })
  //   setFilter(removed)
  //};

  useMemo(() => {
    console.log(productos, sortCriteria)
    const sorted = [...productos].sort((a, b) => {
      if (sortCriteria.criteria) {
        return sortCriteria.asc
          ? a[sortCriteria.criteria] - b[sortCriteria.criteria]
          : b[sortCriteria.criteria] - a[sortCriteria.criteria];
      }
      return 0;
    });
    setSortedProducts(sorted);
  }, [sortCriteria, productos]);

  // const sortedProducts = useMemo(() => {
  //   return sort
  //     ? [...productos].sort((a, b) => a.title.localeCompare(b.title))
  //     : productos
  // }, [sort, filter])

  return (
    <CartContext.Provider
      value={{
        cart,
        productos,
        setProductos,
        addToCart,
        clearCart,
        removeFromCart,
        filter,
        setFilter,
        getProducts,
        sortedProducts,
        sortCriteria,
        setSortCriteria
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
