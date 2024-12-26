import React from "react";

const MarathonHomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to Marathon Management</h2>
        <p className="text-lg mb-6">
          Join the ultimate platform for managing, registering, and tracking marathons seamlessly.
        </p>
        <a
          href="/marathons"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100"
        >
          Explore Marathons
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Dynamic Registration</h3>
              <p>
                Easily register for marathons with real-time updates on registration status.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Personalized Dashboard</h3>
              <p>
                Track your applications and registrations in one convenient location.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Event Management</h3>
              <p>
                Organizers can manage marathon details and monitor registrations effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Our Marathon Management platform is designed to simplify the way
            participants and organizers interact. Whether you’re an athlete
            looking to participate in marathons or an organizer managing events,
            we’ve got you covered.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-6">
            Have questions or need help? Reach out to us anytime!
          </p>
          <a
            href="mailto:support@marathon.com"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer Section */}
    </div>
  );
};

export default MarathonHomePage;
