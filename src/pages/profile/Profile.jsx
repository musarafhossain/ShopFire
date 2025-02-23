import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaEdit } from "react-icons/fa";
import ProfileLayout from '@/components/pages/profile/ProfileLayout'
import toast from "react-hot-toast";

const Profile = () => {
    const { isDarkMode } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "Musaraf Hossain",
        gender: "male",
        email: "",
        phone: "",
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    return (
        <ProfileLayout pageTitle="Profile Information">
            {/* Personal Information Header */}
            <div className="flex place-items-baseline gap-3">
                <h1 className="text-lg font-semibold">Personal Information</h1>
                <button
                    className="text-blue-600 text-sm font-semibold flex place-items-baseline gap-1 hover:underline cursor-pointer"
                    onClick={handleEditToggle}
                >
                    {isEditing ? "Cancel" : "Edit"} <FaEdit />
                </button>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm">Full Name</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`border p-3 focus:outline-0 text-gray-600 rounded-md max-w-sm ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                            }`}
                    />
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm">Gender</p>
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="mr-2"
                            />
                            Female
                        </label>
                    </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm">Email Address</p>
                    <input
                        type="email"
                        name="email"
                        autoComplete="username"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`border p-3 focus:outline-0 text-gray-600 rounded-md max-w-sm ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                            }`}
                    />
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm">Mobile Number</p>
                    <input
                        type="tel"
                        name="phone"
                        autoComplete="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`border p-3 focus:outline-0 text-gray-600 rounded-md max-w-sm ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                            }`}
                    />
                </div>
            </div>

            {/* Save Button */}
            {isEditing && (
                <button
                    className="bg-blue-600 hover:scale-105 duration-200 cursor-pointer text-white font-semibold px-6 py-2 rounded-md mt-4 w-32"
                    onClick={() => {
                        handleEditToggle();
                        toast.success("Profile has been updated!", {
                            style: {
                                background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                                color: isDarkMode ? "#fff" : "#333",
                            },
                        });
                    }
                    }
                >
                    SAVE
                </button>
            )}
        </ProfileLayout>
    )
}

export default Profile