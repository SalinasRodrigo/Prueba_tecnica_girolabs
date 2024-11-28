import { useCart } from "../hooks/useCart";
import { ProductCard } from "./ProductCard";
import "./ProductList.css";

export const ProductList = () => {
  const { sortedProducts } = useCart();

  return (
    <div className="container">
      <div className="product-list">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((item) => {
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