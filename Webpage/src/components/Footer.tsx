const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">✈️ TravelIndia</h3>
            <p className="text-gray-400">
              Making your travel dreams come true with unforgettable experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#destinations" className="hover:text-white transition">Destinations</a></li>
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +91 98765 43210</li>
              <li>✉️ info@travelindia.com</li>
              <li>📍 New Delhi, India</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">📘</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">📷</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">🐦</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">🎵</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2024 TravelIndia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;