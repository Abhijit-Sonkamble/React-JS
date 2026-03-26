import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50 top-0">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          ✈️ TravelIndia
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="hover:text-blue-600 transition">Home</a>
          <a href="#destinations" className="hover:text-blue-600 transition">Destinations</a>
          <a href="#services" className="hover:text-blue-600 transition">Services</a>
          <a href="#testimonials" className="hover:text-blue-600 transition">Testimonials</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </div>

        {/* CTA Button */}
        <button className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
          Book Now
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col space-y-3 px-4 py-3">
            <a href="#home" className="hover:text-blue-600 py-2">Home</a>
            <a href="#destinations" className="hover:text-blue-600 py-2">Destinations</a>
            <a href="#services" className="hover:text-blue-600 py-2">Services</a>
            <a href="#testimonials" className="hover:text-blue-600 py-2">Testimonials</a>
            <a href="#contact" className="hover:text-blue-600 py-2">Contact</a>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full w-full">
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;