import { useState, useEffect, useCallback } from "react";
import { fireDB } from "@/firebase/FirebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useLoading } from "@/context/LoadingContext";
import toast from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";


const useUsersCollection = () => {
  const [users, setUsers] = useState([]);
  const { loading, setLoading } = useLoading();
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  const usersCollectionRef = collection(fireDB, "users");

  // Fetch all users from Firestore
  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(usersCollectionRef);
      const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(usersList);
      setUsers(usersList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  // Add a new user
  const addUser = async (userData) => {
    setLoading(true);
    try {
      const docRef = await addDoc(usersCollectionRef, userData);
      setUsers(prev => [...prev, { id: docRef.id, ...userData }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing user
  const updateUser = async (userId, updatedData) => {
    setLoading(true);
    try {
      const userDocRef = doc(fireDB, "users", userId);
      await updateDoc(userDocRef, updatedData);
      setUsers(prev => prev.map(user => (user.id === userId ? { ...user, ...updatedData } : user)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      const userDocRef = doc(fireDB, "users", userId);
      await deleteDoc(userDocRef);
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on mount
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return { users, error, getUsers, addUser, updateUser, deleteUser };
};

export default useUsersCollection;
