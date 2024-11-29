import { useParams } from "react-router-dom";
import "./ProductPage.css";
import { useProduct } from "../hooks/useProduct";
import { useEffect } from "react";
import { formatPrice } from "../utility";
import StarRatings from "react-star-ratings";
import { useCart } from "../hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "../components/Icons";

export const ProductPage = () => {
  const { id } = useParams();
  const { getOneProduct, producto } = useProduct();
  const { cart, removeFromCart, addToCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  useEffect(() => {
    getOneProduct(id);
  }, []);
  return (
    <div className="product-container">
      <section className="detail-card">
        <div className="col-1">
          <img src={producto.thumbnail} alt={producto.title} />
          <h2>{producto.title}</h2>
        </div>
        <div className="col-1">
          <p>{producto.description}</p>
          <div className="price">
            <b>
              {formatPrice(
                Math.round(
                  producto.price -
                    (producto.price * producto.discountPercentage) / 100
                )
              )}
            </b>
            <small>
              <del>{formatPrice(producto.price)}</del>
            </small>
          </div>
          <div className="col-2-f">
            <StarRatings
              rating={producto.rating}
              starRatedColor="#fdcb6e"
              starEmptyColor="#d4d4d8"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="4px"
            />
            <div className="btn">
              {checkProductInCart(producto) ? (
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Detiene la propagación del evento hacia los padres
                    removeFromCart(producto);
                  }}
                >
                  <RemoveFromCartIcon />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Detiene la propagación del evento hacia los padres
                    addToCart(producto);
                  }}
                >
                  <AddToCartIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
