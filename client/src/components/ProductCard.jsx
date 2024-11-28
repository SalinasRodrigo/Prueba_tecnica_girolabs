/* eslint-disable react/prop-types */
import { useCart } from "../hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";
import "./ProductCard.css";
import { formatPrice } from "../utility";
import StarRatings from "react-star-ratings";

export const ProductCard = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const handleClick = () => {
    console.log("hola");
  };

  return (
    <div onClick={handleClick}>
      <span className="discount">-{product.discountPercentage}%</span>
      <div key={product.id} className="product-card">
        <div className="thumbnail">
          <img src={product.thumbnail} alt={product.title} />
          <div className="product-btns">
            <div>
              {checkProductInCart(product) ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Detiene la propagación del evento hacia los padres
                    removeFromCart(product);
                  }}
                >
                  <RemoveFromCartIcon />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Detiene la propagación del evento hacia los padres
                    addToCart(product);
                  }}
                >
                  <AddToCartIcon />
                </button>
              )}
            </div>
          </div>
        </div>
        <h5>{product.title}</h5>
        <StarRatings
          rating={product.rating}
          starRatedColor="#fdcb6e"
          starEmptyColor="#d4d4d8"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="4px"
        />
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
