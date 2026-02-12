import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { cart } = useCart();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/home?q=${search}`);
    setSearch("");
  };

  return (
    <nav className="amazon-nav">

      {/* LEFT */}
      <div className="nav-left">
        <Link to="/home" className="logo">G MART</Link>
      </div>

      {/* SEARCH */}
      <form className="nav-search" onSubmit={handleSearch}>
        <input
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
        <button className="search-btn">🔍</button>
      </form>

      {/* RIGHT */}
      <div className="nav-right">
        <Link to="/cart" className="cart-link">
          🛒 Cart
          <span className="cart-count">{cart.length}</span>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;

