import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
    const { isDarkMode } = useTheme();
    const [email, setEmail] = useState("");
    const [showPasswordField, setShowPasswordField] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email", { position: "top-center" });
            return;
        }
        // Simulate email verification
        toast.success("Email verified! Enter your new password", { position: "top-center" });
        setShowPasswordField(true);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (!newPassword) {
            toast.error("Please enter a new password", { position: "top-center" });
            return;
        }
        toast.success("Password reset successfully!", { position: "top-center" });
    };

    return (
        <Layout>
            <Toaster position="top-right" reverseOrder={false} />
            <div className={`flex items-center justify-center px-2 h-[80vh] ${isDarkMode ? "bg-gray-900" : "bg-gray-200"}`}>
                <div
                    className={`relative w-full max-w-md p-8 space-y-6 rounded-2xl shadow-xl border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
                    style={{
                        background: `linear-gradient(to top right, ${isDarkMode
                            ? "#1F2937 50%, #002031 50%"
                            : "#eee 50%, #bdc0c0 50%"
                            })`
                    }}
                >
                    <div className="text-center">
                        <Logo className='mx-auto' />
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Reset your password</p>
                    </div>
                    {!showPasswordField ? (
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            <div className="relative">
                                <FaEnvelope className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300 text-gray-800 border"}`} placeholder="Email Address" required />
                            </div>
                            <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transform cursor-pointer transition hover:scale-105 duration-300 font-bold">
                                Verify Email
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div className="relative">
                                <FaLock className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300 text-gray-800 border"}`} placeholder="New Password" required />
                            </div>
                            <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transform cursor-pointer transition hover:scale-105 duration-300 font-bold">
                                Reset Password
                            </button>
                        </form>
                    )}
                    <p className={`text-sm text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Remember your password? <Link to="/login" className="text-indigo-500 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
