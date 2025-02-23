import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Logo from "@/components/Logo";
import toast from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";
import { useLoading } from "@/context/LoadingContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "@/firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import LoadingSpinner from "@/components/loader/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { isDarkMode } = useTheme();
    const { loading, setLoading } = useLoading(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            toast.error("All fields are required!", {
                style: {
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!", {
                style: {
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
            return;
        }

        setLoading(true); // Start loader

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            const user = {
                uid: users.user.uid,
                name,
                email,
                role: "user",
                gender: "Male", 
                addresses: [],
                wishlist: [],
                coupons: [],
                phone: "",
                city: "",
                country: "",
                zipCode: "",
                createdAt: Timestamp.now(),
            };

            const userRef = collection(fireDB, "users");
            await addDoc(userRef, user);

            toast.success("Account created successfully!", {
                style: {
                    background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
            navigate("/");
            setFormData({ name: "", email: "", password: "", confirmPassword: "" });

        } catch (error) {
            let errorMessage = "Something went wrong. Please try again.";

            if (error.code === "auth/email-already-in-use") {
                errorMessage = "User already exists";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Invalid email address";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "Password should be at least 6 characters";
            } else {
                errorMessage = error.message;
            }

            toast.error(errorMessage, {
                style: {
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
        } finally {
            setLoading(false); // Stop loader
        }
    };

    return (
        <Layout>
            <div
                className={`flex items-center justify-center px-2 h-[80vh] ${isDarkMode ? "bg-gray-900" : "bg-gray-200"}`}
            >
                <div
                    className={`relative w-full max-w-md p-8 space-y-6 rounded-2xl shadow-xl border ${
                        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    }`}
                    style={{
                        background: `linear-gradient(to right bottom, ${
                            isDarkMode
                                ? "rgba(31, 41, 55, 1) 50%, rgba(0, 32, 49, 0.1) 50%"
                                : "rgba(238, 238, 238, 1) 50%, rgba(189, 192, 192, 0.1) 50%"
                        })`,
                    }}
                >
                    <div className="text-center">
                        <Logo className="mx-auto" />
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            Create a new account
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="relative">
                            <FaUser className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <input
                                type="text"
                                name="name"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                    isDarkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300 text-gray-800 border"
                                }`}
                                placeholder="Enter Name"
                            />
                        </div>

                        <div className="relative">
                            <FaEnvelope className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <input
                                type="email"
                                name="email"
                                autoComplete="username"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                    isDarkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300 text-gray-800 border"
                                }`}
                                placeholder="Email Address"
                            />
                        </div>

                        <div className="relative">
                            <FaLock className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <input
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                    isDarkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300 text-gray-800 border"
                                }`}
                                placeholder="Password"
                            />
                        </div>

                        <div className="relative">
                            <FaLock className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <input
                                type="password"
                                name="confirmPassword"
                                autoComplete="new-password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                    isDarkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300 text-gray-800 border"
                                }`}
                                placeholder="Confirm Password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-indigo-600/40 bg-indigo-600 rounded-lg transition transform hover:scale-105 disabled:hover:scale-100 font-bold flex items-center cursor-pointer justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <LoadingSpinner />
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

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
