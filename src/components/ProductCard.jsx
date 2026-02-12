import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div className="card">
    <img src={product.thumbnail} />
    <h4>{product.title}</h4>
    <p>${product.price}</p>
    <Link to={`/product/${product.id}`} className="btn-link">
   View 
  </Link>

  </div>
);

export default ProductCard;

