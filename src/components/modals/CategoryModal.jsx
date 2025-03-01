import React, { useEffect, useState } from "react";
import ModalLayout from "../layout/ModalLayout";
import InputText from "@/components/input/InputText";
import InputRadio from "@/components/input/InputRadio";
import { RxCross2 } from "react-icons/rx";
import { FaEdit, FaPlus } from "react-icons/fa";
import LoaderButton from "../buttons/LoaderButton";
import imageCompression from "browser-image-compression";
import { useTheme } from "@/context/ThemeContext";

const CategoryModal = ({ isOpen, closeModal, openModal, category, handleSaveCategory }) => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        id: category?.id || "",
        name: category?.name || "",
        status: category?.status || "Active", // Default status: active
        image: category?.image ? { url: category.image, file: null } : null, // Single image
    });

    useEffect(() => {
        if (category) {
            setFormData({
                id: category.id || "",
                name: category.name || "",
                status: category.status || "Active",
                image: category.image ? { url: category.image, file: null } : null,
            });
        }else {
            setFormData({ id: "", name: "", status: "Active", image: null });
        }
    }, [category, isOpen]);

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
            const previewUrl = URL.createObjectURL(compressedFile);
            return { file: compressedFile, url: previewUrl };
        } catch (error) {
            console.error("Image compression failed:", error);
            return null;
        }
    };

    // Handle Image Upload (Single Image)
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const compressedImage = await compressImage(file);
        if (compressedImage) {
            setFormData((prevData) => ({
                ...prevData,
                image: compressedImage, // Replace previous image
            }));
        }
    };

    // Remove Image
    const removeImage = () => {
        setFormData((prevData) => ({ ...prevData, image: null }));
    };

    return (
        <ModalLayout isOpenModal={isOpen} closeModal={closeModal} openModal={openModal}>
            <div className="max-h-[80vh] overflow-auto pr-2 sm:p-4 w-full">
                <h1 className="text-xl font-semibold justify-between mb-4 flex items-center gap-2">
                    {category?.id ? "Edit Category" : "Add Category"} <FaEdit />
                </h1>

                {/* Input Fields */}
                <div className="grid grid-cols-1 gap-4">
                    <InputText
                        label="Category Name"
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                    />

                    {/* Status Dropdown */}
                    <InputRadio
                        label="Status :"
                        ids={['active', 'Inactive']}
                        name='status'
                        values={['Active', 'Inactive']}
                        checked={[formData.status === "Active", formData.status === "Inactive"]}
                        onChange={handleChange}
                        className=""
                    />
                </div>

                {/* Image Upload Section */}
                <div className="mt-4">
                    <p>Category Image</p>
                    <div className="mt-2 flex gap-2">
                        {/* Upload Image Button */}
                        {!formData.image && (
                            <div className={`relative w-24 h-24 rounded-md overflow-hidden border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '}`}>
                                <label className={`text-xl cursor-pointer duration-300 flex items-center justify-center h-full w-full ${isDarkMode ? ' hover:bg-gray-700/20 text-gray-400 ' : ' hover:bg-gray-100 text-gray-700 '}`} htmlFor="img">
                                    <FaPlus className="h-5 w-5" />
                                </label>
                                <input type="file" id="img" name="img" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </div>
                        )}

                        {/* Display Image */}
                        {formData.image && (
                            <div className={`relative w-24 h-24 rounded-md overflow-hidden border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '}`}>
                                <img src={formData.image.url} alt="Category" className="w-full h-full object-cover" />
                                <button
                                    className="absolute top-1 right-1 bg-black/50 hover:bg-black cursor-pointer duration-300 p-1 rounded-full"
                                    onClick={removeImage}
                                >
                                    <RxCross2 className="h-5 w-5 text-white" />
                                </button>
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
