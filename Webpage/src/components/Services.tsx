const services = [
  {
    id: 1,
    icon: "✈️",
    title: "Flight Booking",
    description: "Best deals on domestic and international flights with 24/7 support."
  },
  {
    id: 2,
    icon: "🏨",
    title: "Hotel Reservation",
    description: "Luxury to budget hotels with exclusive discounts and offers."
  },
  {
    id: 3,
    icon: "🚗",
    title: "Car Rentals",
    description: "Comfortable and affordable car rentals for your entire trip."
  },
  {
    id: 4,
    icon: "🎒",
    title: "Tour Guides",
    description: "Experienced local guides to enhance your travel experience."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide everything you need for a perfect vacation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;