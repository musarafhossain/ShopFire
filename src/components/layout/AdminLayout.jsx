//import react libraries
import { useState } from 'react';

//import custom hooks
import { useTheme } from '../../context/ThemeContext';

//import components
import Header from '../pages/admin/header/Header';
import Sidebar from '../pages/admin/sidebar/Sidebar';

//import icons
import { FiHome, FiBarChart2, FiUsers, FiShoppingBag, FiSettings } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { SiHackthebox } from "react-icons/si";

const AdminLayout = ({ children, className }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { isDarkMode } = useTheme();

    const navItems = [
        { label: 'Home', icon: <FiHome className="h-5 w-5" />, link: '/' },
        { label: 'Dashboard', icon: <FiBarChart2 className="h-5 w-5" />, link: '/admin/dashboard' },
        { label: 'Users', icon: <FiUsers className="h-5 w-5" />, link: '/admin/users' },
        { label: 'Orders', icon: <SiHackthebox className="h-5 w-5" />, link: '/admin/orders' },
        { label: 'Products', icon: <FiShoppingBag className="h-5 w-5" />, link: '/admin/products' },
        { label: 'Category', icon: <BiCategory className="h-5 w-5" />, link: '/admin/category' },
        { label: 'Settings', icon: <FiSettings className="h-5 w-5" />, link: '/admin/settings' },
    ];

    return (
        <div className={`min-h-[100dvh] ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} overflow-x-auto flex ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
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
            <div className={` flex-1 w-full`}>
                {/* Header */}
                <Header setIsSidebarOpen={setIsSidebarOpen} />

                {/* Content Area */}
                <main className={`pt-16 min-h-[100dvh] `}>
                    <div className={`p-5 min-h-[calc(100dvh-64px)] w-[100vw] ${className} ${isSidebarCollapsed ? 'md:max-w-[calc(100vw-64px)]' : 'md:max-w-[calc(100vw-256px)]'}`}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;