import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/layout/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/layout/DeleteAlert';
import { toast } from 'react-hot-toast';

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
        console.log("Fetched updated data:", response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income 
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source, amount, date, icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      await fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding income:", error.response?.data?.message || error.message);
    }
  };

  // Delete income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      await fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income:", error.response?.data?.message || error.message);
    }
  };

  // Download income
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error in downloading income details:", error);
      toast.error("Failed to download income details. Please try again!");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-6 mx-auto px-4 animate-fadeInUp space-y-6">

        <div className="bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 rounded-2xl p-6 text-white shadow-2xl shadow-green-500/30 relative overflow-hidden animate-slideInLeft">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-1">Manage Your Income</h1>
            <p className="text-green-100 text-lg">Add, track, and download your income records.</p>
          </div>
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 animate-staggerFadeIn">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 animate-slideInUp [animation-delay:0.2s]">
            <IncomeOverview 
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 animate-slideInUp [animation-delay:0.4s]">
            <IncomeList
              transactions={incomeData}
              onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
              onDownload={handleDownloadIncomeDetails}
            />
          </div>
        </div>

        {/* Add Income Modal */}
        <Modal
          isOpen={OpenAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* Delete Alert Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes staggerFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
          .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
          .animate-slideInUp { animation: slideInUp 0.6s ease-out; }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-staggerFadeIn { animation: staggerFadeIn 0.8s ease-out; }
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default Income;
