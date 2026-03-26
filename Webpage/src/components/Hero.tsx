const Hero = () => {
  return (
    <section id="home" className="pt-20 min-h-screen flex items-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}>
      <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Explore the Beauty of India
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Discover amazing destinations, rich culture, and unforgettable experiences with TravelIndia.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition">
            Start Your Journey
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;