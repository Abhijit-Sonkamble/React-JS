const destinations = [
  {
    id: 1,
    name: "Goa",
    price: "$299",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    days: "5 Days"
  },
  {
    id: 2,
    name: "Kerala",
    price: "$399",
    image: "https://images.unsplash.com/photo-1593693411518-c2028e251de4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    days: "6 Days"
  },
  {
    id: 3,
    name: "Rajasthan",
    price: "$449",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    days: "7 Days"
  },
  {
    id: 4,
    name: "Himachal",
    price: "$349",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    days: "6 Days"
  }
];

const Destinations = () => {
  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Popular Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most popular travel destinations handpicked just for you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group">
              <div className="relative overflow-hidden h-56">
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                  {dest.price}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{dest.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{dest.days}</span>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;