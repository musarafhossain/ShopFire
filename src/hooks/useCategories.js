import { useEffect } from "react";
import { fetchCategories, addCategory, updateCategory, deleteCategory } from "@/features/categories/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "@/context/LoadingContext";
import toast from "react-hot-toast";

const useCategories = () => {
    const dispatch = useDispatch();
    const { categories, error } = useSelector((state) => state.categories);
    const { setLoading } = useLoading();

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [categories.length]);

    const handleAddCategory = async (categoryData) => {
        setLoading(true);
        await toast.promise(
            dispatch(addCategory(categoryData)).unwrap(),
            {
                loading: "Adding category...",
                success: "Category added successfully!",
                error: (err) => `Error: ${err.message}`,
            }
        );
        setLoading(false);
    };

    const handleUpdateCategory = async (categoryData) => {
        setLoading(true);
        await toast.promise(
            dispatch(updateCategory(categoryData)).unwrap(),
            {
                loading: "Updating category...",
                success: "Category updated successfully!",
                error: (err) => `Error: ${err.message}`,
            }
        );
        setLoading(false);
    };

    const handleDeleteCategory = async (categoryId) => {
        setLoading(true);
        await toast.promise(
            dispatch(deleteCategory(categoryId)).unwrap(),
            {
                loading: "Deleting category...",
                success: "Category deleted successfully!",
                error: (err) => `Error: ${err.message}`,
            }
        );
        setLoading(false);
    };

    return {
        categories,
        error,
        handleAddCategory,
        handleUpdateCategory,
        handleDeleteCategory,
    };
};

export default useCategories;
