
import { useEffect } from "react";
import { Filtro } from "../components/Filtro";
import { ProductList } from "../components/ProductsList";
import { useProduct } from "../hooks/useProduct";
import "./SearchPage.css";

export const SearchPage = () => {
  const {sortCriteria, setSortCriteria, getProducts, filter } = useProduct()

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  const handleSort = (value) => {
    const newCriteria = {
      criteria: value,
      asc: sortCriteria.asc!==null ? !sortCriteria.asc : true,  
    }
    setSortCriteria(newCriteria)
  }
  return (
    <div className="search-page">
      <Filtro />
      <div>
        <div className="sort-layer">
          <label htmlFor="">Ordenar por: </label>
          <div className="btns">
            <button onClick={() => handleSort("price")}>
              Precio{" "}
              {sortCriteria.criteria === "price"
                ? sortCriteria.asc
                  ? "↑"
                  : "↓"
                : ""}
            </button>
            <button onClick={() => handleSort("rating")}>
              Valoración{" "}
              {sortCriteria.criteria === "rating"
                ? sortCriteria.asc
                  ? "↑"
                  : "↓"
                : ""}
            </button>
          </div>
        </div>
        <ProductList />
      </div>
    </div>
  );
};
