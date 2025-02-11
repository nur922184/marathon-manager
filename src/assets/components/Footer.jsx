import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
          {/* Logo and Description */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-white">MarathonManager</h2>
            <p className="mt-2 text-sm">
              Your ultimate platform to organize and participate in marathon events. 
              Manage, explore, and join events seamlessly!
            </p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-2">Useful Links</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="hover:underline text-sm text-gray-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/marathons"
                  className="hover:underline text-sm text-gray-400"
                >
                  Marathons
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:underline text-sm text-gray-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:underline text-sm text-gray-400"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:underline text-sm text-gray-400"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-600 mb-4" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} MarathonManager. All Rights Reserved.</p>
          <p>
            Built with ❤️ by the Marathon Management Team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
