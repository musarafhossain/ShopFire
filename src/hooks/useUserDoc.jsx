import { useState, useEffect } from "react";
import { fireDB } from "@/firebase/FirebaseConfig";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/auth/AuthContext";

const useUserDoc = () => {
    const { user, setUser } = useAuth();
    const [userDoc, setUserDoc] = useState(null);

    useEffect(() => {
        if (!user?.uid) return;

        const usersRef = collection(fireDB, "users");
        const q = query(usersRef, where("uid", "==", user.uid));

        // ✅ Real-time listener for Firestore updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                const userDocData = querySnapshot.docs[0].data();

                // ✅ Merge Firestore user data with existing authUser data
                setUser(prevUser => ({
                    ...prevUser,  
                    ...userDocData 
                }));
                setUserDoc(userDocRef);
            } else {
                setUserDoc(null);
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [user?.uid]);

    return { userDoc };
};

export default useUserDoc;
