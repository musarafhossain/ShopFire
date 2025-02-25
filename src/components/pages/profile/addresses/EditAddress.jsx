import React, { useState } from 'react'
import { useTheme } from "@/context/ThemeContext";
import LoaderButton from "@/components/buttons/LoaderButton";
import toast from "react-hot-toast";
import InputText from '../../../input/InputText';
import InputRadio from '../../../input/InputRadio';
import InputTextarea from '../../../input/InputTextarea';

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
        addressType: address?.addressType || "Home",
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const { fullName, phone, pincode, locality, address, city, state, addressType } = formData;

        if (!fullName || !phone || !pincode || !locality || !address || !city || !state || !addressType) {
            toast.error("All fields are required.", {
                style: {
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
            return;
        }

        onSubmit(formData);
    };


    return (
        <div className={className}>
            <span className="text-blue-600 text-sm font-semibold uppercase">
                {address ? "EDIT EXISTING ADDRESS" : "ADD NEW ADDRESS"}
            </span>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                {/* Full Name & Mobile Number */}
                <div className="flex flex-col md:flex-row gap-4">
                    <InputText
                        label="Full Name"
                        type="text"
                        name="fullName"
                        id="fullName"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className='w-full'
                    />
                    <InputText
                        label="Mobile Number"
                        type="tel"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className='w-full'
                    />
                </div>

                {/* Pin Code & Locality */}
                <div className="flex flex-col md:flex-row gap-4">
                    <InputText
                        label="Pin Code"
                        type="text"
                        name="pincode"
                        id="pincode"
                        autoComplete='postal-code'
                        value={formData.pincode}
                        onChange={handleChange}
                        className='w-full'
                    />
                    <InputText
                        label="Locality"
                        type="text"
                        name="locality"
                        id="locality"
                        autoComplete='address-line2'
                        value={formData.locality}
                        onChange={handleChange}
                        className='w-full'
                    />
                </div>

                {/* Address (Text Area) */}
                <InputTextarea
                    label='Address (Area & Street)'
                    name="address"
                    id="address"
                    autoComplete='address-line1'
                    value={formData.address}
                    onChange={handleChange}
                    className='w-full'
                />

                {/* City & State */}
                <div className="flex flex-col md:flex-row gap-4">
                    <InputText
                        label="City/District/Town"
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        value={formData.city}
                        onChange={handleChange}
                        className='w-full'
                    />
                    <InputText
                        label="State"
                        type="text"
                        name="state"
                        id="state"
                        autoComplete="address-level1"
                        value={formData.state}
                        onChange={handleChange}
                        className='w-full'
                    />
                </div>

                {/* Landmark & Alternate Phone */}
                <div className="flex flex-col md:flex-row gap-4">
                    <InputText
                        label="Landmark (Optional)"
                        type="text"
                        name="landmark"
                        id="landmark"
                        autoComplete="additional-name"
                        value={formData.landmark}
                        onChange={handleChange}
                        className='w-full'
                    />
                    <InputText
                        label="Alternate Phone (Optional)"
                        type="text"
                        name="alternatePhone"
                        id="alternatePhone"
                        autoComplete="tel"
                        value={formData.alternatePhone}
                        onChange={handleChange}
                        className='w-full'
                    />
                </div>

                {/* Address Type */}
                <InputRadio
                    label="Address Type"
                    ids={['home', 'work']}
                    name='addressType'
                    values={['Home', 'Work']}
                    checked={[formData.addressType === "Home", formData.addressType === "Work"]}
                    onChange={handleChange}
                />

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                    <LoaderButton
                        type="submit"
                        text={address ? "Update Address" : "Add Address"}
                        className='font-semibold rounded min-w-32'
                    />
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 hover:scale-105  text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};


export default EditAddress