import React from "react";
import Swiper from "../components/Swiper";

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <section className="bg-gray-900 text-white">
        <div className="">
            <Swiper></Swiper>
        </div>
      </section>

      {/* Marathons Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Marathons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Marathon Card */}
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-lg bg-white"
              >
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Marathon"
                  className="w-full"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Marathon Title</h3>
                  <p className="text-gray-600">Location: City Name</p>
                  <p className="text-gray-600">Registration Dates: Start - End</p>
                  <button className="mt-4 btn btn-primary w-full">See Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Marathons Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Upcoming Marathons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Static Marathon Card */}
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-lg bg-white"
              >
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Upcoming Marathon"
                  className="w-full"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Marathon Title</h3>
                  <p className="text-gray-600">Location: City Name</p>
                  <p className="text-gray-600">Date: Event Date</p>
                  <button className="mt-4 btn btn-secondary w-full">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Sections */}
      <section className="py-12 mb-6 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why Join Us?</h2>
          <p className="text-lg">
            Join thousands of participants and organizers in making marathons more accessible and fun. 
            Enjoy features like easy registration, real-time updates, and personalized dashboards!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
