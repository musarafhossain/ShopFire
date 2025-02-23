import React from 'react';
import LoadingSpinner from "@/components/loader/LoadingSpinner";
import { useLoading } from "@/context/LoadingContext";

const LoaderButton = ({ text, type, onClick, className }) => {
    const { loading } = useLoading();
    
    return (
        <button
            type={type}
            className={`px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-indigo-600/40 bg-indigo-600 rounded-lg transition transform hover:scale-105 disabled:hover:scale-100 font-bold flex items-center cursor-pointer justify-center gap-2 ${className}`}
            disabled={loading}
            {...(type !== 'submit' ? { onClick } : {})}
        >
            {loading ? <LoadingSpinner /> : text}
        </button>
    );
}

export default LoaderButton;
