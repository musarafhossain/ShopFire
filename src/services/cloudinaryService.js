import CryptoJS from "crypto-js";
import { fireDB } from "@/firebase/FirebaseConfig"; // Only if needed for Firestore updates

// Cloudinary Credentials
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

/**
 * Upload an image to Cloudinary
 * @param {File} imageFile - The image file to upload
 * @param {string} id - Product ID for structured image storage
 * @returns {Promise<string | null>} - URL of uploaded image or null if failed
 */
export const uploadImage = async (imageFile, id) => {
    try {
        const timestamp = Date.now();
        const uniqueSuffix = Math.random().toString(36).substring(2, 7);
        const publicId = `${id}/${timestamp}-${uniqueSuffix}`;

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
    }
};

/**
 * Delete an image from Cloudinary
 * @param {string} imageUrl - The URL of the image to delete
 * @returns {Promise<boolean>} - True if deleted successfully, otherwise false
 */
export const deleteImage = async (imageUrl) => {
    const publicId = extractPublicIdFromUrl(imageUrl);
    if (!publicId) return false;

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
        return data.result === "ok";
    } catch (error) {
        console.error("Delete error:", error);
        return false;
    }
};

/**
 * Extracts public ID from a Cloudinary image URL
 * @param {string} url - The Cloudinary image URL
 * @returns {string | null} - The public ID of the image
 */
const extractPublicIdFromUrl = (url) => {
    const regex = /\/v\d+\/(.+?)\./;
    const match = url.match(regex);
    return match ? match[1] : null;
};
