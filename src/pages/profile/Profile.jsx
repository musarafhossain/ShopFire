import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import ProfileLayout from '@/components/pages/profile/ProfileLayout';
import toast from "react-hot-toast";
import { useAuth } from "@/auth/AuthContext";
import LoaderButton from "@/components/buttons/LoaderButton";
import InputText from "@/components/input/InputText";
import InputRadio from "@/components/input/InputRadio";

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        gender: user.gender,
        email: user.email,
        phoneNumber: user.phoneNumber,
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        const updatedData = {
            name: formData.name,
            gender: formData.gender,
            phoneNumber: formData.phoneNumber,
        };
        const result = await updateUser(updatedData);
        if (result.success) {
            toast.success("Profile has been updated!");
            setIsEditing(false);
        } else {
            toast.error(result.message || "Failed to update profile.");
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
                <InputText
                    label="Full Name"
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='max-w-sm'
                />

                {/* Gender */}
                <InputRadio
                    label="Gender"
                    ids={['male', 'female']}
                    name='gender'
                    values={['Male', 'Female']}
                    checked={[formData.gender === "Male", formData.gender === "Female"]}
                    onChange={handleChange}
                    className=""
                    disabled={[((formData.gender === "Female") && !isEditing), ((formData.gender === "Male") && !isEditing)]}
                />

                {/* Email */}
                <InputText
                    label="Email Address"
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="username"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={true}
                    className='max-w-sm'
                />

                {/* Mobile Number */}
                <InputText
                    label="Mobile Number"
                    type="tel"
                    name="phoneNumber"
                    id="phone"
                    autoComplete="phone"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='max-w-sm'
                />
            </div>

            {/* Save Button */}
            {isEditing && (
                <LoaderButton
                    type='button'
                    text='SAVE'
                    onClick={handleSave}
                    className=' bg-blue-600 hover:scale-105 duration-200 cursor-pointer text-white font-semibold px-6 py-2 rounded-md mt-4 w-32'
                />
            )}
        </ProfileLayout>
    );
};

export default Profile;
