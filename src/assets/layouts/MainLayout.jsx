import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {

    const isLoggedIn = true; // Replace with auth state
    const user = { name: 'John Doe', photoURL: 'https://via.placeholder.com/40' };

    const handleLogout = () => {
        console.log("User logged out");
      };

    return (
        <div className='dark:bg-gray-900  text-black dark:text-white'>
            <nav className='sticky top-0 backdrop-blur bg-opacity-0 z-50 bg-base-100'>
            <Navbar isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout}></Navbar>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
               <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;