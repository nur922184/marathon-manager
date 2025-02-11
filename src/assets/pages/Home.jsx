import React from "react";
import Swiper from "../components/Swiper";
import Marathon from "./Marathon";
import UpcomingMarathons from "./UpcomingMarathons";
import SponsorsNewsletter from "../components/SponsorsNewsletter";

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
      <section className="py-12 mb-6">
        <div className="container mx-auto text-center bg-white/10 backdrop-blur-lg p-16 rounded-full">
          <h2 className="text-3xl font-bold mb-4">Why Join Us?</h2>
          <p className="text-lg">
            Join thousands of participants and organizers in making marathons more accessible and fun.
            Enjoy features like easy registration, real-time updates, and personalized dashboards! We use proven facilitation methods to help individuals and teams connect with their strengths and find their collective sense of purpose.
            Workshop content is researched to deliver cutting-edge knowledge that is holistic, relevant and practicable.
          </p>
        </div>
      </section>
      <SponsorsNewsletter></SponsorsNewsletter>
    </div>
  );
};

export default Home;


