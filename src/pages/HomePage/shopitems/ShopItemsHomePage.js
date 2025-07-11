import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CommonApiUrl } from "../../../HttpCommon";
import { useNavigate } from "react-router-dom";

function ShopItemsHomePage() {
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const res = await axios.get(`${CommonApiUrl}/products/random?count=4`);
        setRandomProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch random products", err);
      }
    };

    fetchRandomProducts();
  }, []);

  return (
    <div className="px-4 py-5 md:px-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recently Listed</h2>
        <div className="flex gap-3 text-gray-600">
          <FaArrowLeft className="cursor-pointer hover:text-black transition" />
          <FaArrowRight className="cursor-pointer hover:text-black transition" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {randomProducts.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(`/productDetails/${item._id}`)}
            className="relative bg-white rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
          >
            {/* Product Image */}
            <div className="h-48 md:h-96 overflow-hidden relative">
              <img
                src={item.main_img}
                alt={item.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />

              {/* Like Icon */}
              <div className="absolute top-3 right-3 bg-white bg-opacity-80 rounded-full p-2 backdrop-blur-sm shadow-sm">
                <FaHeart className="text-gray-400 group-hover:text-red-500 transition" />
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col">
              <h4 className="text-base font-semibold text-gray-800 truncate mb-1">{item.name}</h4>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">₹{item.price}</span>
                <span className="text-xs text-gray-400">208 likes</span>
              </div>
            </div>

            {/* Hover Action Button */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 flex items-center justify-center">
              <button className="opacity-0 group-hover:opacity-100 px-4 py-2 text-sm bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopItemsHomePage;
