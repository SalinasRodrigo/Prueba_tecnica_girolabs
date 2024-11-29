import { useCallback, useRef } from "react";
import { Cart } from "./Cart";
import SearchIcon from "./Icons";
import "./MyHeader.css";
import debounce from "just-debounce-it";
import { useProduct } from "../hooks/useProduct";
import { Link } from "react-router-dom";
export const MyHeader = () => {
  const { filter, setFilter } = useProduct();
  const inputRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debauncedFilterSearch = useCallback(
    debounce((search) => {
      setFilter(search);
    }, 300),
    []
  );

  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = inputRef.current.value;
    const remove = ["title"];
    const newFilters = filter.filter((item) => {
      //Elimina instancias anteriores de filtrados del mismo tipo.
      const [word1] = item.split("=");
      return !remove.includes(word1);
    });

    const newState = [...newFilters, `title=${searchValue}`];
    debauncedFilterSearch(newState);
  };

  return (
    <header>
      <Link to={'/'}>
        <h1>MiniStore 🛒</h1>
      </Link>
      <form className="search" id="search">
        <input
          type="text"
          name="title"
          ref={inputRef}
          onChange={handleSearch}
        />
        <button className="search-btn" type="submit" onClick={handleSearch}>
          <SearchIcon />
        </button>
      </form>
      <div className="btns">
        <button className="btn">Login</button>
        <Cart />
      </div>
    </header>
  );
};
