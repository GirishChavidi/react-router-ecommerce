import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 20;

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  //  Fetch categories once
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error("Category fetch failed", err);
        setCategories([]);
      });
  }, []);

  //  Fetch products (main logic)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let url = "";

        if (query) {
          url = `https://dummyjson.com/products/search?q=${query}`;
        } else if (category === "all") {
          url = `https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`;
        } else {
          url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${page * limit}`;
        }

        const res = await axios.get(url);

        if (query || page === 0) {
          setProducts(res.data.products);
        } else {
          setProducts((prev) => [...prev, ...res.data.products]);
        }
      } catch (err) {
        console.error("Product fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, page, query]);

  //  Reset page when category or search changes
  useEffect(() => {
    setProducts([]);
    setPage(0);
  }, [category, query]);

  //  Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((p) => p + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* SEARCH INFO */}
      {query && <p>Showing results for "{query}"</p>}

      {/* CATEGORIES */}
      {!query && (
        <div className="categories">
          <button
            className={category === "all" ? "active" : ""}
            onClick={() => setCategory("all")}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              className={category === cat.slug ? "active" : ""}
              onClick={() => setCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* PRODUCTS */}
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* LOADING */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* NO RESULTS */}
      {!loading && products.length === 0 && query && (
        <p style={{ textAlign: "center" }}>No products found</p>
      )}
    </div>
  );
};

export default Home;



