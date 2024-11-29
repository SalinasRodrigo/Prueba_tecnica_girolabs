/* eslint-disable react/prop-types */
import { createContext, useMemo, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState([]);
  const [sortedProducts, setSortedProducts] = useState(productos);
  const [filter, setFilter] = useState([]);
  const [sortCriteria, setSortCriteria] = useState({ criteria: null, asc: true });


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
        setProductos(products);
      });
  };

  const getOneProduct = (id) => {
    fetch(`/api/products/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        const product = response;
        setProducto(product);
      });
  };
  useMemo(() => {
    const sorted = [...productos].sort((a, b) => {
      if (sortCriteria.criteria) {
        return !sortCriteria.asc
          ? a[sortCriteria.criteria] - b[sortCriteria.criteria]
          : b[sortCriteria.criteria] - a[sortCriteria.criteria];
      }
      return 0;
    });
    setSortedProducts(sorted);
  }, [sortCriteria, productos]);

  return (
    <ProductContext.Provider
      value={{
        productos,
        setProductos,
        filter,
        setFilter,
        getProducts,
        sortedProducts,
        sortCriteria,
        setSortCriteria,
        getOneProduct,
        producto
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
