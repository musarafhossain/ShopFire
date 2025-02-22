import { createContext, useContext, useState } from "react";

// Create Loading Context
const LoadingContext = createContext();

// Custom Hook
export const useLoading = () => useContext(LoadingContext);

// Loading Provider
export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
