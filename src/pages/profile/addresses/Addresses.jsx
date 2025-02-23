import React, { useState } from 'react'
import ProfileLayout from '@/components/pages/profile/ProfileLayout'
import { useTheme } from "@/context/ThemeContext";
import EditAddress from '@/components/pages/profile/addresses/EditAddress';
import AddressCard from '@/components/pages/profile/addresses/AddressCard';
import { useLoading } from "@/context/LoadingContext";
import { updateDoc } from "firebase/firestore";
import useUserDoc from "@/hooks/useUserDoc";
import { useAuth } from "@/auth/AuthContext";
import toast from "react-hot-toast";

const Addresses = () => {
    const { loading, setLoading } = useLoading();
    const { userDoc } = useUserDoc();
    const { user } = useAuth();
    const { isDarkMode } = useTheme();

    const [myaddresses, setMyAddresses] = useState(user.addresses);

    const [addAddress, setAddAddress] = useState(false);
    const [editAddress, setEditAddress] = useState(null);


    const addNewAddress = async (address) => {
        setLoading(true);
        const newAddresses = [...myaddresses, address]
        try {
            if (userDoc) {
                await updateDoc(userDoc, {
                    addresses: newAddresses,
                });
                setMyAddresses(newAddresses);
                toast.success("New address has been added!", {
                    style: {
                        background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                        color: isDarkMode ? "#fff" : "#333",
                    },
                });
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
        setAddAddress(false);
    };

    const editExistingAddress = async (updatedAddress, index) => {
        setLoading(true);
        const updatedAddresses = myaddresses.map((addr, i) =>
            i === index ? updatedAddress : addr
        );
        try {
            if (userDoc) {
                await updateDoc(userDoc, {
                    addresses: updatedAddresses,
                });
                setMyAddresses(updatedAddresses);
                toast.success("Address has been edited!", {
                    style: {
                        background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                        color: isDarkMode ? "#fff" : "#333",
                    },
                });
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
        setEditAddress(null);
    };

    const deleteAddress = async (index) => {
        const updatedAddresses = myaddresses.filter((_, i) => i !== index);
        setLoading(true);
        try {
            if (userDoc) {
                await updateDoc(userDoc, {
                    addresses: updatedAddresses,
                });
                setMyAddresses(updatedAddresses);
                toast.success("Address has been deleted!", {
                    style: {
                        background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                        color: isDarkMode ? "#fff" : "#333",
                    },
                });
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
                    <p className='py-5 text-center'>No Addresses Found</p>
                )}
            </div>
        </ProfileLayout>
    );
}

export default Addresses;
