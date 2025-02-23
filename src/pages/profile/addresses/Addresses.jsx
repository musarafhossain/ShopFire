import React, { useState } from 'react'
import ProfileLayout from '@/components/pages/profile/ProfileLayout'
import { useTheme } from "@/context/ThemeContext";
import EditAddress from '@/components/pages/profile/addresses/EditAddress';
import AddressCard from './AddressCard';

const Addresses = () => {
    const { isDarkMode } = useTheme();
    const [myaddresses, setMyAddresses] = useState([
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
    ]);

    const [addAddress, setAddAddress] = useState(false);
    const [editAddress, setEditAddress] = useState(null);

    const addNewAddress = (address) => {
        setMyAddresses([...myaddresses, address]);
        setAddAddress(false); // Close the form after adding an address
    };

    const editExistingAddress = (updatedAddress, index) => {
        const updatedAddresses = myaddresses.map((addr, i) =>
            i === index ? updatedAddress : addr
        );
        setMyAddresses(updatedAddresses);
        setEditAddress(null); // Close the edit form
    };

    const deleteAddress = (index) => {
        const updatedAddresses = myaddresses.filter((_, i) => i !== index);
        setMyAddresses(updatedAddresses);
    };

    return (
        <ProfileLayout pageTitle="Manage Addresses">
            <h1 className="text-lg font-semibold">Manage Addresses</h1>

            <div className="flex flex-col">
                {addAddress ? (
                    <EditAddress
                        className={`border ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"} px-3 py-4 text-left`}
                        onClose={() => setAddAddress(false)}
                        onSubmit={addNewAddress}
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

            <div className={`border ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"}`}>
                {myaddresses.length > 0 ? (
                    myaddresses.map((address, index) => (
                        <div key={index}>
                            {editAddress === address ? (
                                <EditAddress
                                    className={`${index === myaddresses.length - 1 ? "" : `border-b ${isDarkMode ? "border-[#2f2f2f] bg-gray-800" : "border-[#dcdada] bg-gray-100"}`} px-3 py-4 text-left shadow-inner`}
                                    address={address}
                                    onClose={() => setEditAddress(null)}
                                    onSubmit={(updatedAddress) => editExistingAddress(updatedAddress, index)}
                                />
                            ) : (
                                <AddressCard
                                    address={address}
                                    setEditAddress={setEditAddress}
                                    onDelete={() => deleteAddress(index)}
                                    isLast={index === myaddresses.length - 1}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p className='py-5 text-center'>No Addresses</p>
                )}
            </div>
        </ProfileLayout>
    );
}

export default Addresses;
