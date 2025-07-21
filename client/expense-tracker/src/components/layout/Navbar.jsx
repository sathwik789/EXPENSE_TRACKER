import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu, user }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className='flex items-center justify-between gap-5 bg-gradient-to-r from-indigo-50 via-white to-purple-50 border-b border-indigo-200/40 backdrop-blur-md shadow-lg shadow-indigo-100/30 py-4 px-7 sticky top-0 z-30'>
            {/* Left Section: Menu Icon + Title */}
            <div className='flex items-center gap-5'>
                <button
                    className='block lg:hidden text-indigo-700 hover:text-indigo-600 p-2 rounded-xl hover:bg-indigo-100/50 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md hover:shadow-indigo-200/40'
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                >
                    <div className='relative'>
                        {openSideMenu ? (
                            <HiOutlineX className='text-2xl transition-transform duration-300 rotate-0 hover:rotate-90' />
                        ) : (
                            <HiOutlineMenu className='text-2xl transition-transform duration-300 hover:rotate-12' />
                        )}
                        <div className='absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10'></div>
                    </div>
                </button>
                
                <div className='relative group'>
                    <h2 className='text-xl font-bold bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-800 bg-clip-text text-transparent tracking-wide hover:scale-105 transition-transform duration-300 cursor-default'>
                        Expense Tracker
                    </h2>
                    <div className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500 ease-out'></div>
                    <div className='absolute inset-0 bg-gradient-to-r from-indigo-100/10 to-purple-100/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10 scale-110'></div>
                </div>
            </div>

            {/* Right Section - Optional user info or actions */}
            <div className='hidden md:flex items-center gap-3'>
                <div className='w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20 animate-pulse'></div>
                <div className='w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='w-2 h-2 bg-indigo-400 rounded-full animate-bounce'></div>
            </div>

            {/* Mobile SideMenu */}
            {openSideMenu && (
                <>
                    {/* Backdrop */}
                    <div 
                        className='fixed inset-0 top-[61px] bg-black/20 backdrop-blur-sm z-40 animate-fadeIn'
                        onClick={() => setOpenSideMenu(false)}
                    ></div>
                    
                    {/* Sidebar */}
                    <div className='fixed top-[61px] left-0 bg-gradient-to-b from-indigo-50 to-purple-50 shadow-2xl shadow-indigo-200/50 z-50 animate-slideInLeft border-r border-indigo-200/40'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                </>
            )}

            {/* Add custom animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideInLeft {
                    from { 
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    to { 
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                
                .animate-slideInLeft {
                    animation: slideInLeft 0.4s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Navbar;