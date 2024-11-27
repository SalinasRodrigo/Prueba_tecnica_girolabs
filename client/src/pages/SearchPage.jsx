import { Filtro } from "../components/Filtro";
import { ProductList } from "../components/ProductsList";
import "./SearchPage.css";

export const SearchPage = () => {
  return (
    <div className="search-page">
      <Filtro/>
      <ProductList/>
    </div>
  );
};
