import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate, useLocation } from 'react-router-dom';
import CharAvatar from '../cards/CharAvatar';

const SideMenu = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation(); // 🔥 Get current route

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login"); // fixed typo: was `navigaate`
  };

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-gradient-to-b from-indigo-50 to-purple-50 border-r border-indigo-200/40 backdrop-blur-sm p-6 sticky top-[61px] z-20 shadow-xl shadow-indigo-100/30'>
      {/* Profile Section */}
      <div className='flex flex-col items-center justify-center gap-4 mt-4 mb-8 relative group'>
        <div className='relative'>
          {user?.profileImageUrl ? (
            <img
              src={encodeURI(user.profileImageUrl)}
              alt="Profile"
              className='w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg shadow-indigo-300/40 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-indigo-500/30 ring-2 ring-indigo-400/20 group-hover:ring-indigo-500/40'
            />
          ) : (
            <div className='transform transition-all duration-300 group-hover:scale-105'>
              <CharAvatar
                fullName={user?.fullName}
                width="w-20"
                height="h-20"
                style="text-xl shadow-lg shadow-indigo-300/40 ring-2 ring-indigo-400/20 group-hover:ring-indigo-500/40"
              />
            </div>
          )}
          <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>
        <h5 className='text-indigo-900 font-semibold text-lg leading-6 text-center tracking-wide group-hover:text-indigo-600 transition-colors duration-300'>
          {user?.fullName || ""}
        </h5>
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10'></div>
      </div>

      {/* Menu Items */}
      <div className='space-y-2'>
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = location.pathname.includes(item.path); // ✅ match partial path
          return (
            <button
              key={`menu_${index}`}
              className={`
                w-full flex items-center gap-4 text-[15px] font-medium
                ${isActive 
                  ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/40" 
                  : "text-indigo-700 hover:text-white bg-white/60 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-400/30"
                }
                py-3.5 px-6 rounded-xl transition-all duration-300 ease-out
                transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]
                border border-indigo-100/60 hover:border-indigo-400/30
                backdrop-blur-sm
                relative overflow-hidden group
              `}
              onClick={() => handleClick(item.path)}
            >
              <div className='absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              <item.icon className={`text-xl z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className='z-10 tracking-wide'>{item.label}</span>
              {isActive && (
                <div className='absolute right-3 w-2 h-2 bg-white rounded-full opacity-80 animate-pulse'></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Decoration */}
      <div className='absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent'></div>
      <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-indigo-300 rounded-full'></div>
    </div>
  );
};

export default SideMenu;