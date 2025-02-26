import CryptoJS from "crypto-js";
import { useLoading } from "@/context/LoadingContext";

const useCloudinary = () => {
    const { loading, setLoading } = useLoading();

    // Cloudinary Credentials
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

    /**
     * Upload Image to Cloudinary
     * @param {File} imageFile - Image file to upload
     * @param {string} id - Unique identifier for the image
     * @returns {Promise<string|null>} - URL of the uploaded image or null on failure
     */
    const uploadImage = async (imageFile, id) => {
        setLoading(true);
        try {
            const timestamp = Math.floor(Date.now() / 1000);
            const publicId = `${id}/${timestamp}`;
            const stringToSign = `public_id=${publicId}&timestamp=${timestamp}&upload_preset=${uploadPreset}${apiSecret}`;
            const signature = CryptoJS.SHA1(stringToSign).toString();

            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("upload_preset", uploadPreset);
            formData.append("timestamp", timestamp);
            formData.append("api_key", apiKey);
            formData.append("signature", signature);
            formData.append("public_id", publicId);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                { method: "POST", body: formData }
            );

            const data = await res.json();
            if (data.secure_url) {
                return data.secure_url;
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Delete Image from Cloudinary
     * @param {string} publicId - The public ID of the image in Cloudinary
     * @returns {Promise<boolean>} - True if deletion was successful, false otherwise
     */
    const deleteImage = async (imageUrl) => {
        const publicId = extractPublicIdFromUrl(imageUrl);
        setLoading(true);
        try {
            const timestamp = Math.floor(Date.now() / 1000);
            const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
            const signature = CryptoJS.SHA1(stringToSign).toString();

            const formData = new URLSearchParams();
            formData.append("timestamp", timestamp);
            formData.append("api_key", apiKey);
            formData.append("signature", signature);
            formData.append("public_id", publicId);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: formData,
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Delete error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const extractPublicIdFromUrl = (url) => {
        const regex = /\/v\d+\/(.+?)\./;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return { uploadImage, deleteImage };
};

export default useCloudinary;
