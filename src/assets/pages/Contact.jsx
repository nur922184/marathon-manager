import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

      {/* Contact Details Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow">
          <FaPhoneAlt className="text-blue-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Phone</h2>
            <p className="text-gray-600">+123 456 7890</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow">
          <FaEnvelope className="text-red-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Email</h2>
            <p className="text-gray-600">contact@example.com</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow">
          <FaMapMarkerAlt className="text-green-600 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Location</h2>
            <p className="text-gray-600">123 Street, City, Country</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
        <form>
          <div className="mb-4">
            <label className="block font-medium">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Type your message..."
              className="w-full p-2 border rounded-lg"
            ></textarea>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </div>

      {/* Google Map */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-center mb-4">Find Us on Map</h2>
        <div className="w-full h-64">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902857016223!2d90.3994523153852!3d23.750885284588192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85d11d9c39f%3A0x4b24386e4a72e3f2!2sDhaka%2C+Bangladesh!5e0!3m2!1sen!2sbd!4v1647883778207!5m2!1sen!2sbd"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
