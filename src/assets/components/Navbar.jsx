import React, { useContext, useEffect, useState } from 'react';
import Logo from '../Images/marathon-logo2.png'
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import UsrsPic from '../Images/user-profile-icon-free-vector.png'
import { BsMoon, BsSun } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';

const Navbar = () => {

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light" // Default to light theme
    );

    // Toggle theme and save to localStorage
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    // Apply theme class to the root element
    useEffect(() => {
        const rootElement = document.documentElement;
        if (theme === "dark") {
            rootElement.classList.add("dark");
        } else {
            rootElement.classList.remove("dark");
        }
    }, [theme]);

    const { user, Logout } = useContext(AuthContext)
    const Links = <>
        <li><NavLink to='/'>Home</NavLink> </li>
        <li><NavLink to='/marathons'>Marathons</NavLink> </li>

        {
            user && <>
                <li><NavLink to='/dashboard'>Dashboard</NavLink> </li>
            </>
        }
    </>

    return (
        <div className="navbar dark:text-white sticky top-0 z-50 bg-base-50 dark:bg-slate-800 dark:bg-opacity-50 ">
            <div className="navbar-start h-11">

                <NavLink to='/'> <img className='w-20 h-20' src={Logo} alt="" /></NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {Links}
                </ul>
            </div>
            <div className="navbar-end gap-4">
                <div>
                    {user && user?.displayName
                    }
                </div>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full ml-6 bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
                >
                    {theme === "light" ? <BsMoon size={18} /> : <BsSun size={18} />}
                </button>
                {
                    user && user?.email ? (<div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className='flex gap-3'>
                            <div className="w-10 h-10 border rounded-full border-sky-500 ">
                                <div className="rounded-full ">
                                    {
                                        user && user?.photoURL ? (<img className="rounded-full w-10 h-10" src={user.photoURL} alt="" />) : (<img className="rounded-full w-10 h-10" src={UsrsPic} alt="" />)
                                    }
                                </div>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2">
                            <li className='bg-red-300 rounded-full hover:bg-red-400 hover:text-white'>
                                <Link to={'profile'} className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>{user && user.email}</li>
                            <button onClick={Logout} className='btn btn-sm'>LogOut</button>
                        </ul>
                    </div>) :
                        (<div className="dropdown dropdown-end flex items-center gap-4">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="">
                                    {/* <img
                                        alt="Tailwind CSS Navbar component"
                                        src={UsrsPic} /> */}
                                        <FaRegUserCircle size={28} />
                                </div>
                            </div>
                            <div>
                                <NavLink to='/login'>
                                    <button
                                        class="group flex items-center justify-start w-11 h-11 bg-gray-700 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                                    >
                                        <div
                                            class="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
                                        >
                                            <svg class="w-4 h-4" viewBox="0 0 512 512" fill="white">
                                                <path
                                                    d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div
                                            class="absolute right-8 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                        >
                                            Login
                                        </div>
                                    </button>
                                </NavLink>
                            </div>
                        </div>)
                }
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] -ml-8 mt-2 p-2 shadow">
                        {Links}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;