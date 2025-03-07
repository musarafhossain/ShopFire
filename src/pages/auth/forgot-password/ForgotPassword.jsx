import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { FaEnvelope } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/auth/AuthContext";
import LoaderButton from "../../../components/buttons/LoaderButton";

const ForgotPassword = () => {
    const { isDarkMode } = useTheme();
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const { resetPassword } = useAuth();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        const response = await resetPassword(email);
        if (response.success) {
            toast.success(response.message);
            setEmailSent(true);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <Layout>
            <div className={`flex items-center justify-center px-2 h-[80vh] ${isDarkMode ? "bg-gray-900" : "bg-gray-200"}`}>
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
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Reset your password</p>
                    </div>

                    {emailSent ? (
                        <p className="text-center text-green-500 font-semibold">
                            A password reset link has been sent to your email. Please check your inbox.
                        </p>
                    ) : (
                        <form onSubmit={handlePasswordReset} className="space-y-4">
                            <div className="relative">
                                <FaEnvelope className={`absolute top-3 left-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300 text-gray-800 border"}`}
                                    placeholder="Email Address"
                                />
                            </div>
                            <LoaderButton
                                type='submit'
                                text='Send Reset Email'
                                className='w-full rounded-lg font-bold'
                            />
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
