import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import useUserAuth from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/cards/InfoCard';
import { addThousandsSeperator } from '../../utils/helper';
import { IoMdCard } from 'react-icons/io';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart   from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log("Home component rendered");
  
  useEffect(() => {
    let isMounted = true; // track if component is still mounted

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
        if (isMounted && response.data) {
          setDashboardData(response.data);

          // Debug logging (disable in production)
          if (process.env.NODE_ENV !== 'production') {
            console.log("Dashboard data fetched:", response.data);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Dashboard fetch error:", err);
          setError("Failed to load dashboard data.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-6 mx-auto px-4 animate-fadeInUp">
        
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-indigo-400/20"></div>
            </div>
            <p className="text-lg text-indigo-600 font-medium animate-pulse">Loading your dashboard...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p className="text-center text-red-600 font-medium text-lg">{error}</p>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && !error && dashboardData && (
          <div className="space-y-8">
            
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl shadow-indigo-500/25 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5"></div>
              <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-slideInLeft">Welcome Back!</h1>
                <p className="text-indigo-100 text-lg animate-slideInLeft [animation-delay:0.2s]">Here's your financial overview for today</p>
              </div>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
              <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-purple-400/20 rounded-full animate-float [animation-delay:1s]"></div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-staggerFadeIn">
              <div className="transform hover:scale-105 transition-all duration-300 animate-slideInUp [animation-delay:0.1s]">
                <InfoCard
                  icon={<IoMdCard />}
                  label="Total Balance"
                  value={addThousandsSeperator(dashboardData.totalBalance || 0)}
                  color="bg-gradient-to-r from-indigo-500 to-indigo-600"
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-300 animate-slideInUp [animation-delay:0.2s]">
                <InfoCard
                  icon={<IoMdCard />}
                  label="Total Income"
                  value={addThousandsSeperator(dashboardData.totalIncome || 0)}
                  color="bg-gradient-to-r from-emerald-500 to-emerald-600"
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-300 animate-slideInUp [animation-delay:0.3s]">
                <InfoCard
                  icon={<IoMdCard />}
                  label="Total Expense"
                  value={addThousandsSeperator(dashboardData.totalExpense || 0)}
                  color="bg-gradient-to-r from-rose-500 to-rose-600"
                />
              </div>
            </div>

            {/* Dashboard Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-staggerFadeIn">
              
              {/* First Row */}
              <div className="transform hover:scale-[1.02] transition-all duration-300 animate-slideInLeft [animation-delay:0.4s]">
                <div className="bg-white rounded-2xl shadow-lg shadow-indigo-100/50 border border-indigo-100/50 hover:shadow-xl hover:shadow-indigo-200/60 transition-all duration-300 overflow-hidden">
                  <RecentTransactions
                    transactions={dashboardData.recentTransactions}
                    onSeeMore={() => navigate("/expense")}
                  />
                </div>
              </div>

              <div className="transform hover:scale-[1.02] transition-all duration-300 animate-slideInRight [animation-delay:0.4s]">
                <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 border border-purple-100/50 hover:shadow-xl hover:shadow-purple-200/60 transition-all duration-300 overflow-hidden">
                  <FinanceOverview 
                    totalBalance = {dashboardData ?.totalBalance || 0 }
                    totalIncome = {dashboardData?.totalIncome || 0}
                    totalExpense = {dashboardData?.totalExpense|| 0}
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="transform hover:scale-[1.02] transition-all duration-300 animate-slideInLeft [animation-delay:0.5s]">
                <div className="bg-white rounded-2xl shadow-lg shadow-rose-100/50 border border-rose-100/50 hover:shadow-xl hover:shadow-rose-200/60 transition-all duration-300 overflow-hidden">
                  <ExpenseTransactions
                    transactions = {dashboardData?.last30DaysExpenses?.transactions || []}
                    onSeeMore = {() => navigate("/expense")}
                  />
                </div>
              </div>

              <div className="transform hover:scale-[1.02] transition-all duration-300 animate-slideInRight [animation-delay:0.5s]">
                <div className="bg-white rounded-2xl shadow-lg shadow-orange-100/50 border border-orange-100/50 hover:shadow-xl hover:shadow-orange-200/60 transition-all duration-300 overflow-hidden">
                  <Last30DaysExpenses 
                    data = {dashboardData?.last30DaysExpenses?.transactions || []}
                  />
                </div>
              </div>

              {/* Third Row */}
              <div className="transform hover:scale-[1.02] transition-all duration-300 animate-slideInLeft [animation-delay:0.6s]">
                <div className="bg-white rounded-2xl shadow-lg shadow-emerald-100/50 border border-emerald-100/50 hover:shadow-xl hover:shadow-emerald-200/60 transition-all duration-300 overflow-hidden">
                  <RecentIncomeWithChart
                    data = {dashboardData?.last60DaysIncome?.transactions.slice(0,4) || []}
                    totalIncome= {dashboardData?.totalIncome || 0}
                  />
                </div>
              </div>

              <div className="transform hover:scale-[1.02] transition-all duration-300 animate-slideInRight [animation-delay:0.6s]">
                <div className="bg-white rounded-2xl shadow-lg shadow-teal-100/50 border border-teal-100/50 hover:shadow-xl hover:shadow-teal-200/60 transition-all duration-300 overflow-hidden">
                  <RecentIncome  
                    transactions = {dashboardData?.last60DaysIncome?.transactions || []}
                    onSeeMore= {() => navigate("/income")}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes slideInLeft {
            from { 
              opacity: 0; 
              transform: translateX(-30px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          
          @keyframes slideInRight {
            from { 
              opacity: 0; 
              transform: translateX(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          
          @keyframes slideInUp {
            from { 
              opacity: 0; 
              transform: translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes staggerFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out;
          }
          
          .animate-slideInLeft {
            animation: slideInLeft 0.6s ease-out;
          }
          
          .animate-slideInRight {
            animation: slideInRight 0.6s ease-out;
          }
          
          .animate-slideInUp {
            animation: slideInUp 0.6s ease-out;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-staggerFadeIn {
            animation: staggerFadeIn 0.8s ease-out;
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default Home;