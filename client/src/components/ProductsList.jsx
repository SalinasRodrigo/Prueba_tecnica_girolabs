import { useCart } from "../hooks/useCart";
import { ProductCard } from "./ProductCard";
import "./ProductList.css";

export const ProductList = () => {
  const { productos } = useCart();

  return (
    <div className="container">
      <div className="product-list">
        {productos.length > 0 ? (
          productos.map((item) => {
            return (
              <div key={item.id}>
                <ProductCard product={item}/>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};