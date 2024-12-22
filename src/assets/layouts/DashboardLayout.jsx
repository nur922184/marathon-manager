import React from 'react';
import Aside from '../Dashboard/Aside';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className='grid md:grid-cols-12 border'>
            <aside className='col-span-3 border'>
             <Aside></Aside>
            </aside>
            <main className='col-span-9 border'>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default DashboardLayout;