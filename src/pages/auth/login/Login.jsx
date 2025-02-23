import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { FaUser, FaLock } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoading } from "@/context/LoadingContext";
import { auth } from '@/firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoadingSpinner from "@/components/loader/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { isDarkMode } = useTheme();
    const { loading, setLoading } = useLoading();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
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

        setLoading(true);

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful!", {
                position: "top-center",
                style: {
                    background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });

            // Redirect to homepage or dashboard
            navigate("/");
        } catch (error) {
            let errorMessage = "Something went wrong. Please try again.";

            switch (error.code) {
                case "auth/user-not-found":
                    errorMessage = "No user found with this email.";
                    break;
                case "auth/wrong-password":
                    errorMessage = "Incorrect password. Please try again.";
                    break;
                case "auth/invalid-email":
                    errorMessage = "Invalid email address.";
                    break;
                case "auth/too-many-requests":
                    errorMessage = "Too many failed attempts. Please try again later.";
                    break;
                case "auth/invalid-credential":
                    errorMessage = "Invalid username or password.";
                    break;
                default:
                    errorMessage = error.message;
            }

            toast.error(errorMessage, {
                style: {
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div
                className={`flex items-center justify-center px-2 h-[80vh] ${isDarkMode ? "bg-gray-900" : "bg-gray-200"}`}
            >
                <div
                    className={`relative w-full max-w-md p-8 space-y-6 rounded-2xl shadow-xl border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
                    style={{
                        background: `linear-gradient(to right bottom, ${isDarkMode
                            ? "rgba(31, 41, 55, 1) 50%, rgba(0, 32, 49, 0.1) 50%"
                            : "rgba(238, 238, 238, 1) 50%, rgba(189, 192, 192, 0.1) 50%"
                            })`,
                    }}
                >
                    <div className="text-center">
                        <Logo className='mx-auto' />
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Login to your account</p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="relative">
                            <FaUser className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300 text-gray-800 border"}`} placeholder="Email Address" autoComplete="username" />
                        </div>
                        <div className="relative">
                            <FaLock className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300 text-gray-800 border"}`} placeholder="Password" autoComplete="current-password" />
                        </div>
                        <div className="flex justify-between text-sm">
                            <Link to="/forgot-password" className="text-indigo-500 hover:underline">Forgot password?</Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-indigo-600/40 bg-indigo-600 rounded-lg transition transform hover:scale-105 disabled:hover:scale-100 font-bold flex items-center cursor-pointer justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <LoadingSpinner />
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                    <p className={`text-sm text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Don't have an account? <Link to="/signup" className="text-indigo-500 hover:underline">Sign up</Link></p>
                </div>
            </div>
        </Layout>
    );
};

export default Login;