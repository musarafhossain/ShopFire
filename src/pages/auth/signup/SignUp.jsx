import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import Logo from "@/components/Logo";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
    const { isDarkMode } = useTheme();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!", {
                style: {
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
            return;
        }

        console.log("User Data:", { username, email, password });
        toast.success("Account created successfully!", {
            style: {
                background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                color: isDarkMode ? "#fff" : "#333",
            },
        });
    };

    return (
        <Layout>
            <Toaster position="top-center" reverseOrder={false} />
            <div
                className={`flex items-center justify-center px-2 h-[80vh] ${isDarkMode ? "bg-gray-900" : "bg-gray-200"
                    }`}
            >
                <div
                    className={`relative w-full max-w-md p-8 space-y-6 rounded-2xl shadow-xl border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                        }`}
                    style={{
                        background: `linear-gradient(to top right, ${isDarkMode
                            ? "#1F2937 50%, #002031 50%"
                            : "#eee 50%, #bdc0c0 50%"
                            })`
                    }}
                >
                    {/* Brand Logo */}
                    <div className="text-center">
                        <Logo className="mx-auto" />
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            Create a new account
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="relative">
                            <FaUser
                                className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                    }`}
                            />
                            <input
                                type="text"
                                name="username"
                                autoComplete="name"
                                value={formData.username}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDarkMode
                                    ? "bg-gray-700 text-white border-gray-600"
                                    : "border-gray-300 text-gray-800 border"
                                    }`}
                                placeholder="Username"
                                required
                            />
                        </div>

                        <div className="relative">
                            <FaEnvelope
                                className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                    }`}
                            />
                            <input
                                type="email"
                                name="email"
                                autoComplete="username"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDarkMode
                                    ? "bg-gray-700 text-white border-gray-600"
                                    : "border-gray-300 text-gray-800 border"
                                    }`}
                                placeholder="Email Address"
                                required
                            />
                        </div>

                        <div className="relative">
                            <FaLock
                                className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                    }`}
                            />
                            <input
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDarkMode
                                    ? "bg-gray-700 text-white border-gray-600"
                                    : "border-gray-300 text-gray-800 border"
                                    }`}
                                placeholder="Password"
                                required
                            />
                        </div>

                        <div className="relative">
                            <FaLock
                                className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                    }`}
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                autoComplete="new-password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDarkMode
                                    ? "bg-gray-700 text-white border-gray-600"
                                    : "border-gray-300 text-gray-800 border"
                                    }`}
                                placeholder="Confirm Password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 cursor-pointer text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 font-bold flex items-center justify-center gap-2"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className={`text-sm text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Signup;
