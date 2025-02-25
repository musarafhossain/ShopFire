import React from 'react'
import { useTheme } from "@/context/ThemeContext";

const InputText = ({ 
    label = "", 
    type = "", 
    name = "", 
    id = "", 
    value = "", 
    onChange, 
    className = "", 
    autoComplete = "", 
    placeholder = "", 
    disabled = false 
}) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="text-sm" htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                className={`border p-3 focus:outline-none rounded-md font-bold w-full ${isDarkMode ? "border-[#2f2f2f] text-gray-300 text-fill-dark" : "border-[#dcdada] text-gray-600 text-fill-light"}`}
                {...(autoComplete ? { autoComplete } : {})}
            />
        </div>
    );
}

export default InputText;
