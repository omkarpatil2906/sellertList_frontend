import React from "react";
import ShopItemsHomePage from "./shopitems/ShopItemsHomePage";
import Hero from "./hero";

// Icons
import { TbTruckDelivery } from "react-icons/tb";
import { FaClock } from "react-icons/fa6";
import { MdLocalOffer } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Images
import descImg2 from "../../Assets/dis-img2.jpg";
import descImg3 from "../../Assets/dis-img3.jpg";
import descImg4 from "../../Assets/dis-img4.jpg";
import descImg5 from "../../Assets/dis-img5.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

// Feature component - optimized with Tailwind
function Feature({ icon, title, description }) {
  return (
    <div className="w-full p-2 md:p-4 hover:shadow-md transition-all duration-300">
      <div className="text-center">
        <div className="border rounded-full h-8 w-8 md:h-16 md:w-16 flex justify-center items-center mx-auto mb-4">
          {icon}
        </div>
        <h4 className="font-bold text-sm md:text-xl mb-2">{title}</h4>
        <p className="text-xs md:text-base text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const images = [
    { url: descImg2, alt: "Product showcase 1" },
    { url: descImg3, alt: "Product showcase 2" },
    { url: descImg4, alt: "Product showcase 3" },
    { url: descImg5, alt: "Product showcase 4" },
  ];

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-70 border border-gray-200 text-gray-600 hover:bg-opacity-90 hover:text-gray-800 transition-all duration-300 focus:outline-none"
      aria-label="Next slide"
    >
      <FaChevronRight className="text-lg" />
    </button>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-70 border border-gray-200 text-gray-600 hover:bg-opacity-90 hover:text-gray-800 transition-all duration-300 focus:outline-none"
      aria-label="Previous slide"
    >
      <FaChevronLeft className="text-lg" />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    // Add appendDots to customize dots position
    appendDots: (dots) => (
      <div>
        <ul className="mt-4"> {dots} </ul>
      </div>
    ),
    dotsClass: "slick-dots",
  };

  return (
    <div className="bg-white mt-28">
      <Hero />

      <div className=" mx-auto px-4 my-12 relative">
        <div className="slider-container">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="px-10">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-96 object-fill rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => navigate("/womenswear")}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Features section */}
      <section className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-screen-xl mx-auto py-12 px-4">
        {[
          {
            icon: <TbTruckDelivery className="text-teal-500 text-4xl mb-4" />,
            title: "Free Shipping",
            description: "Enjoy free shipping on all your orders.",
          },
          {
            icon: <FaClock className="text-purple-500 text-4xl mb-4" />,
            title: "24/7 Support",
            description: "Reach out to us anytime. We’re here to help.",
          },
          {
            icon: <MdLocalOffer className="text-pink-500 text-4xl mb-4" />,
            title: "Exciting Offers",
            description: "Exclusive deals and offers for loyal customers.",
          },
          {
            icon: <FaLock className="text-orange-500 text-4xl mb-4" />,
            title: "Secure Payments",
            description: "Safe transactions with trusted gateways.",
          },
        ].map(({ icon, title, description }, index) => (
          <div
            key={index}
            className="bg-white/90 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center p-6 backdrop-blur-sm border border-gray-200 hover:scale-[1.02] hover:bg-white"
          >
            <div className="flex flex-col items-center">
              {icon}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </section>


      <ShopItemsHomePage />
    </div>
  );
}
