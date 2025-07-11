import React, { useState, useEffect } from "react";
import hero_bg from "../../Assets/hero.jpg"; // Use your classy reference-like image here
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CommonApiUrl } from "../../HttpCommon";

function Hero() {
  const [productNames, setProductNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState({ name: "", id: null });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductNames = async () => {
      try {
        const res = await axios.get(`${CommonApiUrl}/products/names`);
        setProductNames(res.data);
      } catch (err) {
        console.error("Failed to fetch product names:", err);
      }
    };

    fetchProductNames();
  }, []);

  const filteredProducts = productNames.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    if (selected && selected.id) {
      navigate(`productDetails/${selected.id}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSelected({ name: "", id: null });
  };

  const handleItemSelect = (name, id) => {
    setSelected({ name, id });
    setSearchTerm(name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative h-[28rem] md:h-[36rem] lg:h-[42rem] w-full overflow-hidden ">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero_bg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 md:px-8">
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight drop-shadow-md mb-6 leading-tight">
          Redefine Your Style.
          <br />
          Discover Elegance in Every Thread.
        </h1>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mb-8">
          <SearchIcon className="absolute left-4 top-3.5 text-gray-500 z-20" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for products"
            className="w-full h-12 pl-12 pr-28 rounded-full border border-gray-300 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />

          {searchTerm && !selected.id && (
            <ul className="absolute w-full bg-white shadow-xl max-h-60 overflow-auto mt-2 rounded-lg z-30 text-left">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li
                    key={product._id}
                    className="cursor-pointer px-6 py-2 hover:bg-teal-100 transition"
                    onClick={() => handleItemSelect(product.name, product._id)}
                  >
                    {product.name}
                  </li>
                ))
              ) : (
                <li className="px-6 py-2 text-gray-500">No results found</li>
              )}
            </ul>
          )}

          <button
            onClick={handleSearch}
            className="absolute top-1.5 right-2 bg-teal-600 hover:bg-teal-700 text-white h-9 px-6 rounded-full text-sm transition"
          >
            Search
          </button>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 px-4">
          {[
            { name: "Women's Fashion", path: "/womenswear" },
            { name: "Shoes", path: "/shoes" },
            { name: "Men's Style", path: "/menswear" },
            { name: "Kids Wear", path: "/kidswear" },
          ].map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="bg-white/90 hover:bg-white backdrop-blur-sm px-6 py-2.5 rounded-full text-gray-800 font-medium text-sm md:text-base shadow-sm hover:shadow-lg hover:scale-105 transition"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
