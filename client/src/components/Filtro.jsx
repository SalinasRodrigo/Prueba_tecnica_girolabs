
import { useProduct } from "../hooks/useProduct";
import "./Filtro.css";

export const Filtro = () => {
  const { filter, setFilter } = useProduct();

  const handleSubmit = (event) => {
    event.preventDefault();
    const remove = ["min_price", "max_price", "rating"];
    const newFilters = filter.filter((item) => {
      //Elimina instancias anteriores de filtrados del mismo tipo.
      const [word1] = item.split("="); 
      return !remove.includes(word1);
    });

    const newState = [
      ...newFilters,
      `min_price=${event.target.min_price.value}`,
      `max_price=${event.target.max_price.value}`,
      `rating=${event.target.rating.value}`,
    ];

    setFilter(newState);
  };

  return (
    <aside className="filtro">
      <h3>Filtrar por</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="precio">Precio</label>
          <div className="precio">
            <input type="number" name="min_price" />
            <span>-</span>
            <input type="number" name="max_price" />
          </div>
        </div>
        <div>
          <label htmlFor="val">Valoracio minima</label>
          <div className="val">
            <input type="number" name="val-min" id="rating" min={0} max={5} />
          </div>
        </div>
        <input type="submit" value={"Aplicar"} />
      </form>
    </aside>
  );
};
