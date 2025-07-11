import React, { useContext } from "react";
import { AdminContext } from "../Context/AdminContext/AdminContext";
import { CardContext } from "../Context/CardContext/CardContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useContext(AdminContext);
  const {
    cartItems,
    haddleRemoveProduct,
    handleAddProduct,
    removeUniqueProduct,
    CarttotalPrice,
    TotalShippingChrges,
    loading,
  } = useContext(CardContext);

  const handleCheckout = () => {
    if (user) {
      toast.success("Checkout success");
      navigate("/checkoutpage");
    } else {
      toast.error("Login first");
    }
  };

  return (
    <div className="mt-32 px-4 py-10 bg-gray-100 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin h-10 w-10 border-4 border-black border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Your Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-600">No Items Added 😜</h1>
              <img
                src="https://i.postimg.cc/15bjqxCP/Make-it-rain-amico.png"
                alt="No Items"
                className="mx-auto mt-6 w-full max-w-md"
              />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <ul className="divide-y">
                {cartItems.map((item, i) => (
                  <li key={i} className="flex flex-col md:flex-row items-center gap-4 py-6">
                    <img
                      src={item.main_img}
                      alt={item.name}
                      className="h-28 w-24 rounded-lg object-cover"
                    />
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-500">Size: {item.size}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border rounded overflow-hidden">
                          <button
                            onClick={() => haddleRemoveProduct(item)}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 text-gray-800 bg-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleAddProduct(item)}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeUniqueProduct(item._id, item.size)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Order Summary */}
              <div className="mt-8 border-t pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-lg font-semibold">₹{CarttotalPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Shipping Charges</span>
                  <span className="text-lg font-semibold">₹{TotalShippingChrges}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>
                    ₹{CarttotalPrice + TotalShippingChrges}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-md transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
