import React from 'react';
import ExpenseImage from '../../assets/images/ExpenseClaimMain-1024x838.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Section: Auth Form */}
      <div className="w-full md:w-[60vw] h-screen px-12 py-16 bg-white shadow-lg flex flex-col justify-center rounded-r-3xl relative overflow-hidden">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10 drop-shadow-sm">
          Expense Tracker
        </h2>

        {children}
      </div>

      {/* Right Section: Image Panel */}
      <div className="hidden md:flex w-[40vw] h-screen flex-col items-center justify-center bg-gray-100 p-10 rounded-l-3xl shadow-inner">
        <img
          src={ExpenseImage}
          alt="Expense Chart Illustration"
          className="w-[90%] max-w-[380px] rounded-3xl shadow-lg border border-gray-300 transition-transform duration-500 hover:scale-105 hover:shadow-xl mb-8"
        />

        <blockquote className="text-center text-gray-600 italic max-w-xs">
          “Beware of little expenses; a small leak will sink a great ship.”<br /> 
          <span className="not-italic font-semibold mt-2 block">— Benjamin Franklin</span>
        </blockquote>
      </div>
    </div>
  );
};

export default AuthLayout;
