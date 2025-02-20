import React from 'react'
import { useTheme } from '../../../context/ThemeContext';
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, isSidebarCollapsed, setIsSidebarCollapsed, navItems }) => {
    const { isDarkMode } = useTheme();
    return (
        <aside
            className={`fixed top-0 left-0 text-nowrap h-screen transform transition-transform
                        ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                        ${isSidebarCollapsed ? 'w-fit' : 'w-[250px]'} md:translate-x-0 z-50 flex flex-col`}
        >
            <div className={`flex items-center justify-between h-16 ${isSidebarCollapsed && ' pl-4 '} border-b ${isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'}`}>
                {!isSidebarCollapsed &&
                    <img
                        src={`${isDarkMode ? '/logo-invert.png' : '/logo.png'}`}
                        alt="Logo"
                        className='w-[170px] hidden sm:block lg:w-[200px] py-1.5 rounded-xl'
                    />
                }
                <div className="flex items-center">
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className={`hidden cursor-pointer md:block p-2 ${isDarkMode ? ' hover:bg-gray-700 ' : ' hover:bg-gray-200 '} rounded-lg`}
                    >
                        {isSidebarCollapsed ? <FiChevronRight className="h-6 w-6" /> : <FiChevronLeft className="h-6 w-6" />}
                    </button>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className={`md:hidden cursor-pointer p-2 ${isDarkMode ? ' bg-gray-700 ' : ' bg-gray-200 '} rounded-lg ${!isSidebarCollapsed && ' ml-4 '}`}
                    >
                        <FiX className="h-6 w-6" />
                    </button>
                </div>
            </div>

            <div className="flex-1 shadow-[1px_2px_5px_rgba(0,0,0,0.3)] flex flex-col">
                <nav className="p-4 flex-1 overflow-y-auto">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a
                                    href="#"
                                    className={`flex items-center p-2 gap-2 rounded-lg ${isDarkMode ? ' hover:bg-gray-700 ' : ' hover:bg-gray-200 '}`}
                                >
                                    {item.icon}
                                    <span className={`${isSidebarCollapsed && 'hidden'}`}>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={`p-4 py-2 border-t ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '}`}>
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className={`flex cursor-pointer items-center w-full p-2 rounded-lg ${isDarkMode ? ' hover:bg-gray-700 ' : ' hover:bg-gray-200 '}`}
                    >
                        {isSidebarCollapsed ? <FiChevronRight className="h-5 w-5" /> : <FiChevronLeft className="h-5 w-5" />}
                        {!isSidebarCollapsed && <span className="ml-2">Collapse Sidebar</span>}
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar