import { createContext, useContext, useEffect, useState } from "react";
import { auth, fireDB } from "@/firebase/FirebaseConfig";
import {
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateEmail,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    Timestamp,
} from "firebase/firestore";
import Loader from "@/components/Loader";
import { useLoading } from "@/context/LoadingContext";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const { setLoading } = useLoading();

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            setAuthLoading(true);
            if (authUser) {
                const usersRef = collection(fireDB, "users");
                const q = query(usersRef, where("uid", "==", authUser.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0].data();
                    setUser({ ...authUser, ...userDoc });
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
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Login Function
    const login = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const authUser = result.user;
            const usersRef = collection(fireDB, "users");
            const q = query(usersRef, where("uid", "==", authUser.uid));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0].data();
                setUser({ ...authUser, ...userDoc });
            } else {
                setUser({
                    uid: authUser.uid,
                    email: authUser.email,
                    name: authUser.displayName || "User",
                });
            }
            return { success: true };
        } catch (error) {
            let errorMessage = "Something went wrong. Please try again.";
            switch (error.code) {
                case "auth/user-not-found":
                    errorMessage = "No user found with this email.";
                    break;
                case "auth/wrong-password":
                    errorMessage = "Incorrect password. Please try again.";
                    break;
                case "auth/invalid-email":
                    errorMessage = "Invalid email address.";
                    break;
                case "auth/too-many-requests":
                    errorMessage = "Too many failed attempts. Please try again later.";
                    break;
                case "auth/invalid-credential":
                    errorMessage = "Invalid username or password.";
                    break;
                default:
                    errorMessage = error.message;
            }
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Logout Function
    const logout = async () => {
        await signOut(auth);
        window.location.href = "/login";
    };

    // Signup Function
    const signup = async (email, password, name) => {
        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = {
                uid: users.user.uid,
                name,
                email,
                role: "user",
                gender: "Male",
                addresses: [],
                wishlist: [],
                coupons: [],
                phoneNumber: "",
                createdAt: Timestamp.now(),
            };
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, newUser);
            setUser(newUser);
            return { success: true };
        } catch (error) {
            let errorMessage = "Something went wrong. Please try again.";
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "User already exists";
                    break;
                case "auth/invalid-email":
                    errorMessage = "Invalid email address";
                    break;
                case "auth/weak-password":
                    errorMessage = "Password should be at least 6 characters";
                    break;
                default:
                    errorMessage = error.message;
            }
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Reset Password Function
    const resetPassword = async (email) => {
        setLoading(true);
        try {
            const usersRef = collection(fireDB, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return { success: false, message: "No user found with this email." };
            }
            await sendPasswordResetEmail(auth, email);
            return { success: true, message: "Password reset email sent!" };
        } catch (error) {
            let errorMessage = "Something went wrong. Please try again.";
            switch (error.code) {
                case "auth/invalid-email":
                    errorMessage = "Invalid email address.";
                    break;
                default:
                    errorMessage = error.message;
            }
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    //Update User Function
    const updateUser = async (updatedData) => {
        setLoading(true);
        try {
            if (!user || !user.uid) {
                return { success: false, message: "User not found." };
            }
            const usersRef = collection(fireDB, "users");
            const q = query(usersRef, where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return { success: false, message: "User document not found." };
            }
            const userDocRef = doc(fireDB, "users", querySnapshot.docs[0].id);
            await updateDoc(userDocRef, updatedData);
            setUser((prevUser) => ({
                ...prevUser,
                ...updatedData,
            }));
            return { success: true, message: "Profile updated successfully." };
        } catch (error) {
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, signup, resetPassword, updateUser }}>
            {authLoading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};
