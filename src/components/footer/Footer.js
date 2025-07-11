import React from "react";
import { blue } from "@mui/material/colors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  return (
    <footer className="bg-zinc-100 text-zinc-600 pt-10 pb-4  border-t border-zinc-200">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand + Newsletter */}
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-800 mb-4">SellerList</h1>
          <p className="text-sm mb-4">
            Your number one site for selling and buying clothes, cosmetics, and home goods.
          </p>

          <h4 className="text-base font-semibold text-zinc-800 mb-2">
            Join our newsletter
          </h4>

          <div className="flex items-center bg-white border border-zinc-300 rounded-full overflow-hidden shadow-sm">
            <input
              type="email"
              placeholder="Enter your e-mail"
              className="flex-grow px-4 py-2 outline-none text-sm text-zinc-700"
            />
            <button className="bg-sky-500 hover:bg-sky-600 p-2 rounded-full mr-1">
              <ArrowForwardIcon sx={{ color: "white", fontSize: 20 }} />
            </button>
          </div>
        </div>

        {/* Buy */}
        <div>
          <h4 className="text-lg font-semibold text-zinc-800 mb-3">Buy</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/login" className="hover:text-sky-600 transition">Create a profile</Link>
            </li>
            <li className="hover:text-sky-600 cursor-pointer">Set up payment type</li>
            <li className="hover:text-sky-600 cursor-pointer">Inbox</li>
          </ul>
        </div>

        {/* Sell */}
        <div>
          <h4 className="text-lg font-semibold text-zinc-800 mb-3">Sell</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-sky-600 cursor-pointer">Create a profile</li>
            <li className="hover:text-sky-600 cursor-pointer">List your items</li>
            <li className="hover:text-sky-600 cursor-pointer">Boost your items</li>
          </ul>
        </div>

        {/* Help & Policies */}
        <div>
          <h4 className="text-lg font-semibold text-zinc-800 mb-3">Help</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/aboutus" className="hover:text-sky-600 transition">About Us</Link>
            </li>
            <li>
              <Link to="/customerService" className="hover:text-sky-600 transition">Customer Service</Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-sky-600 transition">Careers</Link>
            </li>
            <li>
              <Link to="/contactus" className="hover:text-sky-600 transition">Contact Us</Link>
            </li>
            <li>
              <Link to="/TermsAndCondition" className="hover:text-sky-600 transition">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/Privacy-policy" className="hover:text-sky-600 transition">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-zinc-300 pt-4 flex flex-col md:flex-row items-center justify-between px-6 max-w-screen-xl mx-auto">
        <div className="text-sm text-zinc-500 mb-2 md:mb-0">
          © {new Date().getFullYear()} SellerList. Design & Developed by <span className="font-medium text-zinc-700">Omkar Patil</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://www.instagram.com/tushar_sawant_25/" target="_blank" rel="noreferrer">
            <InstagramIcon sx={{ color: "#E1306C", fontSize: 26 }} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FacebookIcon sx={{ color: blue[600], fontSize: 26 }} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <TwitterIcon sx={{ color: blue[400], fontSize: 26 }} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
