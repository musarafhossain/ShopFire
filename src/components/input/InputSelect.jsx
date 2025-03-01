import React from 'react';
import { useTheme } from "@/context/ThemeContext";

const InputSelect = ({ 
    label = "", 
    name = "", 
    id = "", 
    value = "", 
    onChange, 
    className = "", 
    disabled = false, 
    options = [] 
}) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="text-sm" htmlFor={id}>
                {label}
            </label>
            <select
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`border p-3 cursor-pointer focus:outline-none rounded-md font-bold w-full ${
                    isDarkMode ? "border-[#2f2f2f] text-gray-300 bg-[#1e1e1e]" : "border-[#dcdada] text-gray-600 bg-white"
                }`}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default InputSelect;
