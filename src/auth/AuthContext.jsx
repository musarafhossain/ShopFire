import { createContext, useContext, useEffect, useState } from "react";
import { auth, fireDB } from "@/firebase/FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Loader from "@/components/Loader";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                //console.log("Auth User:", authUser);
    
                // 🔍 Query Firestore where uid field matches authUser.uid
                const usersRef = collection(fireDB, "users");
                const q = query(usersRef, where("uid", "==", authUser.uid));
                const querySnapshot = await getDocs(q);
    
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0].data();
                    //console.log("Firestore User Data:", userDoc); // Debugging
                    setUser({ ...authUser, ...userDoc }); // ✅ Merge Firestore and Auth data
                } else {
                    console.warn("User document not found in Firestore");
                    setUser({
                        uid: authUser.uid,
                        email: authUser.email,
                        name: authUser.displayName || "User",
                    });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
    
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};