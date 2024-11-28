
import { Filtro } from "../components/Filtro";
import { ProductList } from "../components/ProductsList";
import { useCart } from "../hooks/useCart";
import "./SearchPage.css";

export const SearchPage = () => {
  const {sortCriteria, setSortCriteria } = useCart()
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
          <label htmlFor="">Ordenar por</label>
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
        <ProductList />
      </div>
    </div>
  );
};
