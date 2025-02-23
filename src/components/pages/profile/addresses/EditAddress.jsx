import React, { useState } from 'react'
import { useTheme } from "@/context/ThemeContext";

const EditAddress = ({ className, onClose, address = null, onSubmit }) => {
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
        if (address) {
            onSubmit(formData);
        } else {
            onSubmit(formData);
        }
    };

    return (
        <div className={className}>
            <span className="text-blue-600 text-sm font-semibold uppercase">
                {address ? "EDIT EXISTING ADDRESS" : "ADD NEW ADDRESS"}
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
                            className={`border p-3 focus:outline-none rounded-md w-full ${
                                isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
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
                            className={`border p-3 focus:outline-none rounded-md w-full ${
                                isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
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
                            className={`border p-3 focus:outline-none rounded-md w-full ${
                                isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
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
                            className={`border p-3 focus:outline-none rounded-md w-full ${
                                isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
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
                        className={`border p-3 focus:outline-none rounded-md w-full resize-none h-20 ${
                            isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
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
                            className={`border p-3 focus:outline-none rounded-md w-full ${
                                isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
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
                            className={`border p-3 focus:outline-none rounded-md w-full ${
                                isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
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
                            className={`border p-3 focus:outline-none rounded-md w-full ${
                                isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
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
                            className={`border p-3 focus:outline-none rounded-md w-full ${
                                isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
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
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer duration-300"
                    >
                        {address ? "Update Address" : "Add Address"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};


export default EditAddress