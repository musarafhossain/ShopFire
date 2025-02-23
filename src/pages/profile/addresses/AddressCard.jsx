import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTheme } from "@/context/ThemeContext";

const AddressCard = ({ address, setEditAddress, onDelete, isLast }) => {
    const { isDarkMode } = useTheme();
    return (
        <div
            className={`gap-2 ${isLast ? "" : `border-b ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"}`} p-4 flex flex-col relative`}
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
                        className={`${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} p-2 cursor-pointer rounded-full duration-300`}
                    >
                        <BsThreeDotsVertical />
                    </div>
                    <div className={`hidden group-hover:flex flex-col absolute right-3 top-2 overflow-hidden text-sm ${isDarkMode ? "bg-gray-800" : "bg-white"} rounded shadow`}>
                        <button
                            className={`py-2 px-4 w-full text-left ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} cursor-pointer`}
                            onClick={() => setEditAddress(address)}
                        >
                            Edit
                        </button>
                        <button
                            className={`py-2 px-4 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} cursor-pointer`}
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressCard;
