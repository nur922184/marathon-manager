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
        <div>
            <nav className='w-11/12 mx-auto'>
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