import React, { useState } from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { FaRegWindowClose } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Aside = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-full z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <FaRegWindowClose className="text-red-500" size={24} />
        ) : (
          <AiOutlineProfile size={24} />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col transform transition-transform duration-300 z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:static md:translate-x-0`}
      >
        <div className="p-4 font-bold text-xl text-center">Dashboard</div>
        <nav className="flex flex-col mt-4">
          <NavLink
            to="/dashboard/add-marathon"
            className={({ isActive }) =>
              isActive ? "p-3 bg-gray-700" : "p-3 hover:bg-gray-700"
            }
          >
            Add Marathon
          </NavLink>
          <NavLink
            to="/dashboard/my-marathon-list"
            className={({ isActive }) =>
              isActive ? "p-3 bg-gray-700" : "p-3 hover:bg-gray-700"
            }
          >
            My Marathon List
          </NavLink>
          <NavLink
            to="/dashboard/my-apply-list"
            className={({ isActive }) =>
              isActive ? "p-3 bg-gray-700" : "p-3 hover:bg-gray-700"
            }
          >
            My Apply List
          </NavLink>
        </nav>
        <hr className="mt-2 mb-3" />

        <NavLink className={({ isActive }) =>
          isActive ? "p-3 bg-gray-700" : "p-3 hover:bg-gray-700"
        } to='/'>Home</NavLink>
        <NavLink className={({ isActive }) =>
          isActive ? "p-3 bg-gray-700" : "p-3 hover:bg-gray-700"
        } to='/marathons'>Marathons</NavLink>
        <NavLink className={({ isActive }) =>
          isActive ? "p-3 bg-gray-700" : "p-3 hover:bg-gray-700"
        } to='/about'>About</NavLink>
        <NavLink className={({ isActive }) =>
          isActive ? "p-3 bg-gray-700" : "p-3 hover:bg-gray-700"
        } to='/contact'>Contact</NavLink>
      </aside>
    </div>
  );
};

export default Aside;
