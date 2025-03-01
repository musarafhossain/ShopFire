import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { fireDB } from "@/firebase/FirebaseConfig";
import { useLoading } from "@/context/LoadingContext";
import useCloudinary from "@/hooks/useCloudinary";
import { useTheme } from "@/context/ThemeContext";
import toast from "react-hot-toast";

const useCategoryCollection = () => {
    const [categories, setCategories] = useState([]);
    const { setLoading } = useLoading();
    const [error, setError] = useState(null);
    const { uploadImage, deleteImage } = useCloudinary();
    const { isDarkMode } = useTheme();

    const categoriesRef = collection(fireDB, "categories");

    // Fetch Categories
    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const querySnapshot = await getDocs(categoriesRef);
            const categoryList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setCategories(categoryList);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }, [setLoading]);

    // Fetch a single category by ID
    const getCategoryFromFirestore = useCallback(async (productId) => {
        setLoading(true);
        setError(null);
        try {
            const productDoc = doc(fireDB, "categories", productId);
            const productSnap = await getDoc(productDoc);

            if (productSnap.exists()) {
                return { ...productSnap.data(), id: productSnap.id };
            } else {
                throw new Error("Category not found");
            }
        } catch (err) {
            setError(err.message);
            toast.error(`Error fetching category: ${err.message}`, {
                style: {
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
            return null;
        } finally {
            setLoading(false);
        }
    }, [setLoading]);

    // Add Category
    const addCategory = useCallback(async (category) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = await addDoc(categoriesRef, {});
            const categoryId = docRef.id;
            let imageUrl = category.image?.file ? await uploadImage(category.image.file, categoryId) : null;
            const finalCategoryData = { ...category, image: imageUrl, id: categoryId };
            await updateDoc(docRef, finalCategoryData);
            setCategories(prev => [...prev, finalCategoryData]);
            toast.success("Category added successfully!", {
                style: {
                    background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
            return finalCategoryData;
        } catch (err) {
            setError(err.message);
            toast.error(`Error adding category: ${err.message}`, {
                style: {
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
        }
        setLoading(false);
    }, [setLoading]);

    // Update Category
    const updateCategory = useCallback(async (category) => {
        setLoading(true);
        setError(null);
        try {
            const categoryRef = doc(fireDB, "categories", category.id);
            const existingCategory = await getCategoryFromFirestore(category.id);
            if (!existingCategory) throw new Error("Category not found");
    
            let imageUrl = existingCategory.image; 
    
            // If new image is uploaded, delete the old one and upload the new one
            if (category.image?.file) {
                if (existingCategory.image) {
                    await deleteImage(existingCategory.image); // Delete old image
                }
                console.log("Image Upload")
                imageUrl = await uploadImage(category.image.file, category.id); // Upload new image
            }
    
            // Prepare the updated category data
            const updatedData = { ...category, image: imageUrl };
    
            await updateDoc(categoryRef, updatedData);
    
            // Update local state
            setCategories(prev =>
                prev.map(cat => (cat.id === category.id ? updatedData : cat))
            );
    
            toast.success("Category updated successfully!", {
                style: {
                    background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
        } catch (err) {
            setError(err.message);
            toast.error(`Error updating category: ${err.message}`, {
                style: {
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
        } finally {
            setLoading(false);
        }
    }, [setLoading, uploadImage, deleteImage]);
    
    // Delete Category
    const deleteCategory = useCallback(async (categoryId) => {
        setLoading(true);
        setError(null);
        try {
            const CategoryDocRef = doc(fireDB, "categories", categoryId);
            const CategorySnap = await getDoc(CategoryDocRef);
            if (!CategorySnap.exists()) throw new Error("Product not found!");

            const categoryData = CategorySnap.data();
            const imageUrl = categoryData.image || '';
            await deleteImage(imageUrl);
            await deleteDoc(CategoryDocRef);
            setCategories(prev => prev.filter(cat => cat.id !== categoryId));
            toast.success("Category deleted successfully!", {
                style: {
                    background: isDarkMode ? "#4CAF50" : "#E6F4EA",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
        } catch (err) {
            setError(err.message);
            toast.error(`Error deleting product: ${err.message}`, {
                style: {
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
        }
        setLoading(false);
    }, [setLoading]);

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        error,
        fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory,
    };
};

export default useCategoryCollection;
