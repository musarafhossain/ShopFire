import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaEdit } from "react-icons/fa";
import ProfileLayout from '@/components/pages/profile/ProfileLayout';
import toast from "react-hot-toast";
import { useAuth } from "@/auth/AuthContext";
import { fireDB } from "@/firebase/FirebaseConfig"; // Import Firestore instance
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import LoaderButton from "@/components/buttons/LoaderButton";
import { useLoading } from "@/context/LoadingContext";

const Profile = () => {
    const { loading, setLoading } = useLoading();
    const { isDarkMode } = useTheme();
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        gender: user.gender,
        email: user.email,
        phone: user.phoneNumber,
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    /* useEffect(() => {
        console.log("User Data:", user);
    }, [user]); */

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 🔥 Function to Update Firestore Document
    const handleSave = async () => {
        setLoading(true);
        try {
            // 1️⃣ Query Firestore to find the document where `uid` matches
            const usersRef = collection(fireDB, "users");
            const q = query(usersRef, where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref; // Get document reference

                // 2️⃣ Update Firestore Document
                await updateDoc(userDocRef, {
                    name: formData.name,
                    gender: formData.gender,
                    email: formData.email,
                    phoneNumber: formData.phone,
                });

                toast.success("Profile has been updated!", {
                    style: {
                        background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                        color: isDarkMode ? "#fff" : "#333",
                    },
                });

                // 3️⃣ Update UI after saving
                setIsEditing(false);
            } else {
                toast.error("User not found in Firestore.", {
                    style: {
                        background: isDarkMode ? "#333" : "#fff",
                        color: isDarkMode ? "#fff" : "#333",
                    },
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.", {
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
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                                disabled={(formData.gender === "Female") && !isEditing}
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                                className="mr-2"
                                disabled={(formData.gender === "Male") && !isEditing}
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
                <LoaderButton
                    type='button'
                    text='SAVE'
                    onClick={handleSave}
                    className='w-[100px]'
                />
               /*  <button
                    className="bg-blue-600 hover:scale-105 duration-200 cursor-pointer text-white font-semibold px-6 py-2 rounded-md mt-4 w-32"
                    onClick={handleSave}
                >
                    SAVE
                </button> */
            )}
        </ProfileLayout>
    );
};

export default Profile;
