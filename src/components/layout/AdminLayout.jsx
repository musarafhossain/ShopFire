import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Header from '../admin/header/Header';
import Sidebar from '../admin/sidebar/Sidebar';
import { FiHome, FiBarChart2, FiUsers, FiShoppingBag, FiSettings } from "react-icons/fi";


const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { isDarkMode } = useTheme();

    const navItems = [
        { label: 'Home', icon: <FiHome className="h-5 w-5" /> },
        { label: 'Dashboard', icon: <FiBarChart2 className="h-5 w-5" /> },
        { label: 'Users', icon: <FiUsers className="h-5 w-5" /> },
        { label: 'Products', icon: <FiShoppingBag className="h-5 w-5" /> },
        { label: 'Settings', icon: <FiSettings className="h-5 w-5" /> },
    ];

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
            {/* Mobile Sidebar Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                isSidebarCollapsed={isSidebarCollapsed}
                setIsSidebarCollapsed={setIsSidebarCollapsed}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                navItems={navItems}
            />

            {/* Main Content */}
            <div className={`transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"}`}>
                {/* Header */}
                <Header setIsSidebarOpen={setIsSidebarOpen} />

                {/* Content Area */}
                <main className="pt-16 p-4 min-h-screen">
                    <div className="rounded-lg p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;