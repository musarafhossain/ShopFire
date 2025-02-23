import React, { useState } from 'react'
import ProfileLayout from '@/components/pages/profile/ProfileLayout'
import { useTheme } from "@/context/ThemeContext";
import { BsThreeDotsVertical } from "react-icons/bs";

const myaddresses = [
    {
        fullName: "Musaraf Hossain",
        phone: "8389989806",
        pincode: "736101",
        locality: "Rail Ghumty, Rail Ghumty",
        address: "Koch Bihar, West Bengal",
        city: "Koch Bihar",
        state: "West Bengal",
        landmark: "",
        alternatePhone: "",
        addressType: "home",
    },
    {
        fullName: "John Doe",
        phone: "1234567890",
        pincode: "543210",
        locality: "Downtown",
        address: "123 Main St, Some City, Some State",
        city: "Some City",
        state: "Some State",
        landmark: "Near the park",
        alternatePhone: "0987654321",
        addressType: "work",
    },
    {
        fullName: "Jane Smith",
        phone: "5555555555",
        pincode: "111222",
        locality: "Suburbia",
        address: "456 Side Rd, Another City, Another State",
        city: "Another City",
        state: "Another State",
        landmark: "Opposite the mall",
        alternatePhone: "4444444444",
        addressType: "home",
    },
]

const EditAddress = ({ className, onClose, address = null }) => {
    const { isDarkMode } = useTheme();

    // State for form fields
    const [formData, setFormData] = useState({
        fullName: address?.fullName || "",
        phone: address?.phone || "",
        pincode: address?.pincode || "",
        locality: address?.locality || "",
        address: address?.address || "",
        city: address?.city || "",
        state: address?.state || "",
        landmark: address?.landmark || "",
        alternatePhone: address?.alternatePhone || "",
        addressType: address?.addressType || "home",
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <div className={className}>
            <span className="text-blue-600 text-sm font-semibold uppercase">
                Add New Address
            </span>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                {/* Full Name & Mobile Number */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`border p-3 focus:outline-none rounded-md w-full ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                                }`}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm" htmlFor="phone">
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`border p-3 focus:outline-none rounded-md w-full ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                                }`}
                        />
                    </div>
                </div>

                {/* Pin Code & Locality */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm" htmlFor="pincode">
                            Pin Code
                        </label>
                        <input
                            type="number"
                            name="pincode"
                            id="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className={`border p-3 focus:outline-none rounded-md w-full ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                                }`}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm" htmlFor="locality">
                            Locality
                        </label>
                        <input
                            type="text"
                            name="locality"
                            id="locality"
                            value={formData.locality}
                            onChange={handleChange}
                            className={`border p-3 focus:outline-none rounded-md w-full ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                                }`}
                        />
                    </div>
                </div>

                {/* Address (Text Area) */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm" htmlFor="address">
                        Address (Area & Street)
                    </label>
                    <textarea
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`border p-3 focus:outline-none rounded-md w-full resize-none h-20 ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                            }`}
                    />
                </div>

                {/* City & State */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm" htmlFor="city">
                            City/District/Town
                        </label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`border p-3 focus:outline-none rounded-md w-full ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                                }`}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm" htmlFor="state">
                            State
                        </label>
                        <input
                            type="text"
                            name="state"
                            id="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={`border p-3 focus:outline-none rounded-md w-full ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                                }`}
                        />
                    </div>
                </div>

                {/* Landmark & Alternate Phone */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm" htmlFor="landmark">
                            Landmark (Optional)
                        </label>
                        <input
                            type="text"
                            name="landmark"
                            id="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            className={`border p-3 focus:outline-none rounded-md w-full ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                                }`}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm" htmlFor="alternatePhone">
                            Alternate Phone (Optional)
                        </label>
                        <input
                            type="tel"
                            name="alternatePhone"
                            id="alternatePhone"
                            value={formData.alternatePhone}
                            onChange={handleChange}
                            className={`border p-3 focus:outline-none rounded-md w-full ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                                }`}
                        />
                    </div>
                </div>

                {/* Address Type */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm">Address Type</p>
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="addressType"
                                value="home"
                                checked={formData.addressType === "home"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Home
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="addressType"
                                value="work"
                                checked={formData.addressType === "work"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Work
                        </label>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        {address ? "Update Address" : "Add Address"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

const Addresses = () => {
    const { isDarkMode } = useTheme();
    const [addAddess, setAddAddress] = useState(false);
    const [editAddres, setEditAddress] = useState(null);
    return (
        <ProfileLayout pageTitle="Manage Addresses">
            {/* Personal Information Header */}
            <h1 className="text-lg font-semibold">Manage Addresses</h1>
            <div className="flex flex-col">
                {addAddess ? (
                    <EditAddress
                        className={`border ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"} px-3 py-4 text-left`}
                        onClose={() => setAddAddress(false)}
                    />
                ) : (
                    <button
                        className={`uppercase cursor-pointer text-blue-600 text-sm font-semibold px-3 py-4 text-left border ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"}`}
                        onClick={() => setAddAddress(true)}
                    >
                        <span>+ Add New Address</span>
                    </button>
                )}
            </div>
            <div className={`border ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"} mt-5`}>
                {myaddresses.map((address, index) => (
                    <div
                        key={index}
                        className={`border-b gap-2 ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"} p-4 flex flex-col relative`}
                    >
                        <div className="flex flex-col gap-2">
                            <p
                                className={`w-fit ${isDarkMode ? "bg-gray-700 text-gray-400" : "text-gray-600 bg-gray-200"} p-1 rounded-sm shadow text-sm font-medium capitalize`}
                            >
                                {address.addressType}
                            </p>
                            <p className="text-sm font-semibold uppercase flex gap-5">
                                <span>{address.fullName}</span>
                                <span>{address.phone}</span>
                            </p>
                            <p className="text-sm flex gap-2">
                                <span>
                                    {address.locality}, {address.address}
                                </span>
                                <span>-</span>
                                <span className="font-semibold">{address.pincode}</span>
                            </p>
                            <div className="group absolute right-4 top-2">
                                <div
                                    className={`${
                                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                                    } p-2 cursor-pointer rounded-full duration-300`}
                                >
                                    <BsThreeDotsVertical />
                                </div>
                                <div className="hidden group-hover:flex flex-col absolute right-3 top-2 overflow-hidden text-sm bg-gray-700 rounded shadow">
                                    <button
                                        className="py-2 px-4 w-full text-left hover:bg-gray-600 cursor-pointer"
                                        onClick={() => setEditAddress(address)}
                                    >
                                        Edit
                                    </button>
                                    <button className="py-2 px-4 hover:bg-gray-600 cursor-pointer">Delete</button>
                                </div>
                            </div>
                        </div>
                        {editAddres === address && (
                            <EditAddress
                                className={`border ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"} px-3 py-4 text-left mt-4`}
                                address={address}
                                onClose={() => setEditAddress(null)}
                            />
                        )}
                    </div>
                ))}
            </div>
        </ProfileLayout>
    );
}

export default Addresses