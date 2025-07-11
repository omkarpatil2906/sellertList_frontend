import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { CardContext } from "../../Context/CardContext/CardContext";
import { AdminContext } from "../../Context/AdminContext/AdminContext";
import Admin from "../../pages/AdminPage/Admin";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Hamburger from "hamburger-react";

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [slide, setSlide] = useState(false);
  const { cartItems } = useContext(CardContext);
  const { user } = useContext(AdminContext);
  const { pathname } = useLocation();

  const CloseSilder = () => {
    setOpen(false);
    setSlide(false);
  };

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/womenswear", name: "Womenswear" },
    { path: "/menswear", name: "Menswear" },
    { path: "/kidswear", name: "Kidswear" },
    { path: "/shoes", name: "Shoes" },
  ];

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      {/* MAIN TOP NAV */}
      <nav className="flex items-center justify-between px-4 md:px-10 py-3 bg-white">
        {/* Logo */}
        <div className="flex items-center space-x-3 text-cyan-600">
          <FaShopify className="text-3xl" />
          <h1 className="text-2xl font-bold">SellerList</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/sign-up">
                <button className="text-cyan-600 border border-cyan-600 rounded-full px-4 py-1 hover:bg-cyan-600 hover:text-white transition">
                  Signup
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-cyan-600 text-white rounded-full px-4 py-1 hover:bg-cyan-700 transition">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <Admin user={user} />
          )}
        </div>
      </nav>

      {/* SECONDARY NAV */}
      {pathname !== "/Account" && (
        <div className="bg-white shadow-sm border-t">
          <div className="flex justify-between items-center px-4 md:px-10 py-2">
            {/* Hamburger for mobile */}
            <div className="md:hidden">
              <Hamburger toggled={isOpen} toggle={() => {
                setOpen(!isOpen);
                setSlide(!slide);
              }} />
            </div>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-6 text-cyan-700 font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-cyan-500 hover:underline underline-offset-4 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Orders + Cart */}
            <div className="flex items-center gap-4">
              <Link to="/OrderHistory">
                <button className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-white rounded-full px-4 py-1 text-sm hover:from-cyan-500 hover:to-cyan-700 transition">
                  My Orders
                </button>
              </Link>
              <Link to="/cart">
                <Badge
                  badgeContent={cartItems.length || ""}
                  color="primary"
                  className="cursor-pointer"
                >
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </div>
          </div>

          {/* Mobile Slide Menu */}
          {slide && (
            <div className="fixed top-0 left-0 w-full h-screen bg-white z-40 transition-all">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-cyan-600">Menu</h2>
                <MdOutlineClose
                  className="text-3xl cursor-pointer"
                  onClick={CloseSilder}
                />
              </div>
              <ul className="flex flex-col gap-6 text-lg p-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={CloseSilder}
                      className="block py-2 border-b text-gray-800 hover:text-cyan-600"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
