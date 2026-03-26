const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "Amazing experience! TravelIndia made our Kerala trip unforgettable. Highly recommended! ⭐⭐⭐⭐⭐"
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Delhi",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "Best travel agency ever! Great service, affordable prices, and wonderful destinations."
  },
  {
    id: 3,
    name: "Anjali Reddy",
    location: "Bangalore",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "The Goa package was amazing! Everything was well organized. Will book again!"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from our happy customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
              <div className="mt-3 text-yellow-500">
                {"★★★★★"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;