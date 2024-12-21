import React from "react";
import { Link, NavLink } from "react-router-dom";
import UsrsPic from '../Images/user-profile-icon-free-vector.png'
import logo from '../Images/marathon-logo2.png'
// { isLoggedIn, user, handleLogout }
const Navbar = ({ isLoggedIn, user, handleLogout }) => {
    const userLoginLink = <>
        <li><NavLink to='/register'>Register</NavLink> </li>
        <li><NavLink to='/login'>Login</NavLink> </li>
    </>
    const Links = <>
        <li><NavLink to='/'>Home</NavLink> </li>
        <li><NavLink to='/marathons'>Marathons</NavLink> </li>
        {
            user && <>

            </>
        }

    </>

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('users sign out successfully')
                navigate('/login')
            })
            .catch(error => console.log('ERROR', error.massage))
    }

    return (
        <div className="navbar sticky top-0 z-50 bg-base-200 bg-opacity-90 ">
            <div className="navbar-start h-11">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-52 p-2 shadow">
                        {Links}
                    </ul>
                </div>
                <NavLink to='/'> <img className='w-28 h-20' src={logo} alt="" /></NavLink>
            </div>
            <div className="navbar-center hidden lg:flex ">
                <ul className="menu menu-horizontal px-1">
                    {Links}
                </ul>
            </div>
            <div className="navbar-end gap-4">
                <div className="hidden md:block">
                </div>
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
                            <button onClick={handleLogout} className='btn btn-sm'>LogOut</button>
                        </ul>
                    </div>) :
                        (<div className="dropdown dropdown-end flex items-center gap-1">
                            <ul className="menu menu-horizontal px-1 border">
                                {userLoginLink}
                            </ul>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={UsrsPic} />
                                </div>
                            </div>
                        </div>)
                }

            </div>
        </div>
    );
};

export default Navbar;
