import React from "react";
import Swiper from "../components/Swiper";
import Marathon from "./Marathon";
import UpcomingMarathons from "./UpcomingMarathons";

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
     <Marathon></Marathon>

      {/* Upcoming Marathons Section */}
      <UpcomingMarathons></UpcomingMarathons>

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
