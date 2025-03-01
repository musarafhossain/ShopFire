import React, { useEffect, useState } from "react";
import ModalLayout from "../layout/ModalLayout";
import InputText from "@/components/input/InputText";
import InputRadio from "@/components/input/InputRadio";
import { FaEdit, FaPlus } from "react-icons/fa";
import LoaderButton from "../buttons/LoaderButton";
import imageCompression from "browser-image-compression";
import { useTheme } from "@/context/ThemeContext";

const CategoryModal = ({ isOpen, closeModal, openModal, editingCategory, handleSaveCategory }) => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        status: "Active",
        image: "",
    });

    useEffect(() => {
        if (editingCategory) {
            setFormData({
                id: editingCategory?.id || "",
                name: editingCategory?.name || "",
                status: editingCategory?.status || "Active",
                image: editingCategory?.image || "",
            });
        } else {
            setFormData({ id: "", name: "", status: "Active", image: "" });
        }
    }, [editingCategory, isOpen]);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Compress Image Before Upload
    const compressImage = async (file) => {
        const options = {
            maxSizeMB: 0.1, // Compress to ~100KB
            maxWidthOrHeight: 800, // Resize large images
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            return URL.createObjectURL(compressedFile); // Return only URL
        } catch (error) {
            console.error("Image compression failed:", error);
            return null;
        }
    };

    // Handle Image Upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const compressedImageUrl = await compressImage(file);
        if (compressedImageUrl) {
            setFormData((prevData) => ({
                ...prevData,
                image: compressedImageUrl, // Store only the image URL
            }));
        }
    };

    return (
        <ModalLayout isOpenModal={isOpen} closeModal={closeModal} openModal={openModal}>
            <div className="overflow-auto pr-2 sm:p-4 w-full">
                <h1 className="text-xl font-semibold justify-between mb-4 flex items-center gap-2">
                    {editingCategory?.id ? "Edit Category" : "Add Category"} <FaEdit />
                </h1>

                {/* Responsive Grid Layout */}
                <div className="flex flex-col gap-2">
                    <InputText
                        label="Category Name :"
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <InputRadio
                        label="Status :"
                        ids={['active', 'deactive']}
                        name='status'
                        values={['Active', 'Deactive']}
                        checked={[formData.status === "Active", formData.status === "Deactive"]}
                        onChange={handleChange}
                        className=""
                    />
                </div>

                {/* Image Upload Section */}
                <div className="mt-4">
                    <p className="text-sm">Category Image :</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {/* Upload Image Button */}
                        <div
                            className={`relative w-24 h-24 rounded-md overflow-hidden border ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                                }`}
                        >
                            <label
                                className={`text-xl cursor-pointer duration-300 flex items-center justify-center h-full w-full ${isDarkMode ? "hover:bg-gray-700/20 text-gray-400" : "hover:bg-gray-100 text-gray-700"
                                    }`}
                                htmlFor="imgs"
                            >
                                <FaPlus className="h-5 w-5" />
                            </label>
                            <input type="file" id="imgs" name="imgs" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </div>

                        {/* Display Uploaded Image */}
                        {formData.image && (
                            <div
                                className={`relative w-24 h-24 rounded-md overflow-hidden border ${isDarkMode ? "border-[#2f2f2f]" : "border-[#dcdada]"
                                    }`}
                            >
                                <img src={formData.image} alt={`Category ${formData.name}`} className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-3">
                    <LoaderButton
                        type="button"
                        text="Save Category"
                        onClick={() => handleSaveCategory(formData)}
                        className="bg-indigo-600 hover:scale-105 duration-200 cursor-pointer text-white font-semibold px-6 py-2 rounded-md w-fit flex"
                    />
                    <button
                        className="bg-gray-300 hover:scale-105 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer duration-300"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </ModalLayout>
    );
};

export default CategoryModal;
