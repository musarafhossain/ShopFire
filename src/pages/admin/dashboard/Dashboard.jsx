import React from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import StatCard from '../../../components/cards/StatCard';
import { FaDollarSign, FaClipboardList, FaChartLine, FaUsers } from 'react-icons/fa';
import { useTheme } from '../../../context/ThemeContext';

const Dashboard = () => {
  const { isDarkMode } = useTheme();

  const cardData = [
    { title: 'Total Sales', value: "$54,230", colorClass: "text-purple-600", icon: <FaDollarSign className="w-6 h-6" />, status: 37 },
    { title: 'Total Orders', value: "1,234", colorClass: "text-blue-600", icon: <FaClipboardList className="w-6 h-6" />, status: -10 },
    { title: 'Total Revenue', value: "$32,450", colorClass: "text-green-600", icon: <FaChartLine className="w-6 h-6" />, status: -41 },
    { title: 'Total Customers', value: "2,543", colorClass: "text-orange-600", icon: <FaUsers className="w-6 h-6" />, status: 49 },
  ]

  return (
    <AdminLayout className={`w-full`}>
      <div className="p-2">
        <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Dashboard Overview
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {cardData.map((card) =>
            <StatCard
              title={card.title}
              value={card.value}
              colorClass={card.colorClass}
              icon={card.icon}
              status={card.status}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;