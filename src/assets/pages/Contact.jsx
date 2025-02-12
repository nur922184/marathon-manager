import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

      {/* Contact Details Section */}
      <div className="flex items-center gap-5">
        <div className=" w-[35%]">
          <div className="flex items-center space-x-4 p-4 mb-2 bg-gray-100 dark:bg-white/5 dark:text-yellow-50 rounded-lg shadow">
            <FaPhoneAlt className="text-blue-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold">Phone</h2>
              <p className="text-gray-600">+123 456 7890</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 mb-2 bg-gray-100 dark:bg-white/5 dark:text-yellow-50  rounded-lg shadow">
            <FaEnvelope className="text-red-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold">Email</h2>
              <p className="text-gray-600">contact@example.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4  mb-2 bg-gray-100 dark:bg-white/5 dark:text-yellow-50  rounded-lg shadow">
            <FaMapMarkerAlt className="text-green-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold">Location</h2>
              <p className="text-gray-600">123 Street, City, Country</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-10 bg-white dark:bg-white/5 dark:text-yellow-50  p-6 rounded-lg shadow-lg w-[65%] mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
          <form>
            <div className="mb-4">
              <label className="block font-medium ">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 border rounded-lg dark:bg-white/5 dark:text-yellow-50 "
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded-lg dark:bg-white/5 dark:text-yellow-50 "
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full p-2 border rounded-lg dark:bg-white/5 dark:text-yellow-50 "
              ></textarea>
            </div>
            <button
              className=" card-button font-sans flex justify-center gap-2 items-center shadow-xl text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 rounded-2xl group"
              type="submit"
            >
              Send Message
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 19"
                class="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
              >
                <path
                  class="fill-gray-800 group-hover:fill-gray-800"
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                ></path>
              </svg>
            </button>
          </form>
        </div>
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
