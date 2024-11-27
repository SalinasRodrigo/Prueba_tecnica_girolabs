/* eslint-disable react/prop-types */
import { useCart } from "../hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";
import "./ProductCard.css";


export const ProductCard = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };
  
  const formatPrice = (value) => {
    return new Intl.NumberFormat("es-PY", {
      style: "currency",
      currency: "PYG",
      useGrouping: true,
    }).format(value);
  };


  return (
    <div>
      <span className="discount">-{product.discountPercentage}%</span>
      <div key={product.id} className="product-card">
        <div className="thumbnail">
          <img src={product.thumbnail} alt={product.title} />
          <div className="product-btns">
            <div>
              {checkProductInCart(product) ? (
                <button
                  onClick={() => removeFromCart(product)}
                  style={{ color: "#242424", backgroundColor: "#ffffff" }}
                >
                  <RemoveFromCartIcon />
                </button>
              ) : (
                <button onClick={() => addToCart(product)}>
                  <AddToCartIcon />
                </button>
              )}
            </div>
          </div>
        </div>
        <h5>{product.title}</h5>
        <small className="text">{product.description}</small>
        <div className="price">
          <b>
            {formatPrice(
              Math.round(
                product.price -
                  (product.price * product.discountPercentage) / 100
              )
            )}
          </b>
          <small>
            <del>{formatPrice(product.price)}</del>
          </small>
        </div>
      </div>
    </div>
  );
};
