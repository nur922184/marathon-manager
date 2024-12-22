import React, { useContext } from 'react';
import Logo from '../Images/marathon-logo2.png'
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import UsrsPic from '../Images/user-profile-icon-free-vector.png'

const Navbar = () => {
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
        <div className="navbar sticky top-0 z-50 bg-base-200 bg-opacity-90 ">
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
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={UsrsPic} />
                                </div>
                            </div>
                            <div>
                                <NavLink to='/login'><a className="btn btn-neutral">Login</a></NavLink>
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