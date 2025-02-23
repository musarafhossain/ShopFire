import { useState, useEffect } from "react";
import { fireDB } from "@/firebase/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/auth/AuthContext";

const useUserDoc = () => {
    const { user } = useAuth();
    const [userDoc, setUserDoc] = useState(null);

    useEffect(() => {
        if (user) {
            fetchUserDoc();
        }
    }, [user]);

    const fetchUserDoc = async () => {
        if (!user) return;
        try {
            const usersRef = collection(fireDB, "users");
            const q = query(usersRef, where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                setUserDoc(userDocRef);
            } else {
                setUserDoc(null);
            }
        } catch (error) {
            console.error("Error fetching user document:", error);
        }
    };

    return { userDoc };
};

export default useUserDoc;
