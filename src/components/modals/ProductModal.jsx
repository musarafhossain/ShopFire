import React, { useEffect, useState } from "react";
import ModalLayout from "../layout/ModalLayout";
import InputText from "@/components/input/InputText";
import InputSelect from "@/components/input/InputSelect";
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaPlus } from "react-icons/fa";
import LoaderButton from "../buttons/LoaderButton";
import imageCompression from "browser-image-compression";
import { useTheme } from "@/context/ThemeContext";
import useCategoryCollection from '@/hooks/useCategoryCollection';

const ProductModal = ({ isOpen, closeModal, openModal, product, handleSaveProduct }) => {
    const { categories } = useCategoryCollection();
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        id: product?.id || "",
        name: product?.name || "",
        brand: product?.brand || "",
        price: product?.price || "",
        mrp: product?.mrp || "",
        stock: product?.stock || "",
        category: product?.category || categories[0]?.name,
        rating: product?.rating || "",
        images: product?.images?.map((url) => ({ url, file: null })) || [],
        productDetails: product?.productDetails || [{ key: "", value: "" }],
        sizes: product?.sizes || [],
    });


    useEffect(() => {
        if (product) {
            setFormData({
                id: product?.id || "",
                name: product?.name || "",
                brand: product?.brand || "",
                price: product?.price || "",
                mrp: product?.mrp || "",
                stock: product?.stock || "",
                category: product?.category || categories[0]?.name,
                rating: product?.rating || "",
                images: product?.images?.map((url) => ({ url, file: null })) || [],
                productDetails: product?.productDetails || [{ key: "", value: "" }],
                sizes: product?.sizes || [],
            });
        }
    }, [product, isOpen]);

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
            return { file: compressedFile, url: previewUrl }; // Store file + preview URL
        } catch (error) {
            console.error("Image compression failed:", error);
            return null;
        }
    };

    // Handle Image Upload
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        const compressedImages = await Promise.all(files.map(async (file) => await compressImage(file)));
        const validImages = compressedImages.filter((img) => img !== null); // Remove failed compressions

        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...validImages], // Store new uploaded images separately
        }));
    };

    // Remove Selected Image (Firebase or Uploaded)
    const removeImage = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((_, i) => i !== index),
        }));
    };

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...formData.productDetails];
        updatedDetails[index][field] = value;
        setFormData((prevData) => ({ ...prevData, productDetails: updatedDetails }));
    };

    const addDetailField = () => {
        setFormData((prevData) => ({
            ...prevData,
            productDetails: [...prevData.productDetails, { key: "", value: "" }]
        }));
    };

    const removeDetailField = (index) => {
        const updatedDetails = formData.productDetails.filter((_, i) => i !== index);
        setFormData((prevData) => ({ ...prevData, productDetails: updatedDetails }));
    };

    const addSizeField = () => {
        setFormData((prevData) => ({
            ...prevData,
            sizes: [...prevData.sizes, { size: "", stock: "" }]
        }));
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...formData.sizes];
        updatedSizes[index][field] = value;
        setFormData((prevData) => ({ ...prevData, sizes: updatedSizes }));
    };

    const removeSizeField = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            sizes: prevData.sizes.filter((_, i) => i !== index)
        }));
    };

    return (
        <ModalLayout isOpenModal={isOpen} closeModal={closeModal} openModal={openModal}>
            <div className="max-h-[80vh] overflow-auto pr-2 sm:p-4 w-full">
                <h1 className="text-xl font-semibold justify-between mb-4 flex items-center gap-2">{product?.id ? "Edit Product" : "Add Product"} <FaEdit /></h1>

                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputText
                        label="Product Name"
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <InputText label="Brand" type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} className="w-full" />
                    <InputText label="Price" type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="w-full" />
                    <InputText label="MRP" type="number" id="mrp" name="mrp" value={formData.mrp} onChange={handleChange} className="w-full" />
                    <InputText label="Stock" id="stock" type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full" />
                    <InputSelect
                        label="Choose category"
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        options={categories.map(category => ({
                            label: category.name,
                            options: category.name,
                        }))}
                    />
                    <InputText label="Rating" type="number" id="raring" name="rating" value={formData.rating} onChange={handleChange} className="w-full" />
                </div>

                <div className="mt-4">
                    <p className="mb-2 font-semibold">Available Sizes</p>
                    {formData.sizes.map((sizeObj, index) => (
                        <div key={index} className="flex gap-2 items-center mb-2">
                            <InputText
                                placeholder="Size"
                                value={sizeObj.size}
                                onChange={(e) => handleSizeChange(index, "size", e.target.value)}
                                className="w-1/2"
                            />
                            <InputText
                                placeholder="Stock"
                                value={sizeObj.stock}
                                onChange={(e) => handleSizeChange(index, "stock", e.target.value)}
                                className="w-1/2"
                            />
                            <button
                                className="cursor-pointer font-bold text-red-500 p-1 rounded hover:bg-red-100/20 duration-300"
                                onClick={() => removeSizeField(index)}
                            >
                                <MdDelete size={20} />
                            </button>
                        </div>
                    ))}
                    <button
                        className="bg-blue-600/50 cursor-pointer hover:bg-blue-600 duration-300 text-white px-3 py-2 rounded mt-2 flex items-center justify-center gap-2"
                        onClick={addSizeField}
                    >
                        <FaPlus /> Add Size
                    </button>
                </div>

                {/* Product detail Section */}
                <div className="mt-4">
                    <p className="mb-2">Product Details</p>
                    {formData.productDetails.map((detail, index) => (
                        <div key={index} className="flex gap-2 items-center mb-2">
                            <InputText
                                placeholder="Detail Name"
                                value={detail.key}
                                onChange={(e) => handleDetailChange(index, "key", e.target.value)}
                                className="w-1/2"
                            />
                            <InputText
                                placeholder="Detail Value"
                                value={detail.value}
                                onChange={(e) => handleDetailChange(index, "value", e.target.value)}
                                className="w-1/2"
                            />
                            <button
                                className="cursor-pointer font-bold text-red-500 p-1 rounded hover:bg-red-100/20 duration-300"
                                onClick={() => removeDetailField(index)}
                            >
                                <MdDelete size={20} />
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <button
                            className="bg-blue-600/50 cursor-pointer hover:bg-blue-600 duration-300 text-white px-3 py-2 rounded mt-2 flex items-center justify-center gap-2"
                            onClick={addDetailField}
                        >
                            <FaPlus />
                            Add Detail
                        </button>
                    </div>
                </div>

                {/* Image Upload Section */}
                <div className="mt-4">
                    <p>Product Images</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {/* Upload Image Button */}
                        <div className={`relative w-24 h-24 rounded-md overflow-hidden border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '}`}>
                            <label className={`text-xl cursor-pointer duration-300 flex items-center justify-center h-full w-full ${isDarkMode ? ' hover:bg-gray-700/20 text-gray-400 ' : ' hover:bg-gray-100 text-gray-700 '}`} htmlFor="imgs">
                                <FaPlus className="h-5 w-5" />
                            </label>
                            <input type="file" id="imgs" name="imgs" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </div>

                        {/* Display Images (Firebase + Uploaded) */}
                        {formData.images.map((image, index) => (
                            <div key={index} className={`relative w-24 h-24 rounded-md overflow-hidden border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '}`}>
                                <img src={image.url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                                <button
                                    className="absolute top-1 right-1 bg-black/50 hover:bg-black cursor-pointer duration-300 p-1 rounded-full"
                                    onClick={() => removeImage(index)}
                                >
                                    <RxCross2 className="h-5 w-5 text-white" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-3">
                    <LoaderButton
                        type="button"
                        text="Save Product"
                        onClick={() => handleSaveProduct(formData)}
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

export default ProductModal;
