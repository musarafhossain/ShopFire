import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { FaUser, FaLock } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const { isDarkMode } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields", {
                position: "top-center",
                style: {
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
            return;
        }

        console.log("Email:", email);
        console.log("Password:", password);
        toast.success("Login successful!", {
            position: "top-center",
            style: {
                background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                color: isDarkMode ? "#fff" : "#333",
            },
        });
    };

    return (
        <Layout>
            <Toaster position="top-right" reverseOrder={false} />
            <div
                className={`flex items-center justify-center px-2 h-[80vh] ${isDarkMode ? "bg-gray-900" : "bg-gray-200"}`}
            >
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
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Login to your account</p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="relative">
                            <FaUser className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300 text-gray-800 border"}`} placeholder="Email Address" required autoComplete="username" />
                        </div>
                        <div className="relative">
                            <FaLock className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300 text-gray-800 border"}`} placeholder="Password" required autoComplete="current-password" />
                        </div>
                        <div className="flex justify-between text-sm">
                            <Link to="/forgot-password" className="text-indigo-500 hover:underline">Forgot password?</Link>
                        </div>
                        <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transform cursor-pointer transition hover:scale-105 duration-300 font-bold">
                            Login
                        </button>
                    </form>
                    <p className={`text-sm text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Don't have an account? <Link to="/signup" className="text-indigo-500 hover:underline">Sign up</Link></p>
                </div>
            </div>
        </Layout>
    );
};

export default Login;