import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Import a spinner component (or use a simple div)
import Loader from "@/components/Loader"; // Create this component

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};
