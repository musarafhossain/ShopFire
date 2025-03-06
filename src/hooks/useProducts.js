import { useEffect } from "react";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "@/features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "@/context/LoadingContext";
import toast from "react-hot-toast";

const useProducts = () => {
    const dispatch = useDispatch();
    const { products, error } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            if (products.length === 0) {
                setLoading(true);
                try {
                    await dispatch(fetchProducts()).unwrap();
                } catch (error) {
                    toast.error("Error fetching products:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [products.length]);

    const handleAddProduct = async (productData) => {
        setLoading(true);
        await toast.promise(
            dispatch(addProduct(productData)).unwrap(),
            {
                loading: "Adding product...",
                success: "Product added successfully!",
                error: (err) => `Error: ${err.message}`,
            }
        );
        setLoading(false);
    };

    const handleUpdateProduct = async (productId, productData) => {
        setLoading(true);
        await toast.promise(
            dispatch(updateProduct({ productId, productData })).unwrap(),
            {
                loading: "Updating product...",
                success: "Product updated successfully!",
                error: (err) => `Error: ${err.message}`,
            }
        );
        setLoading(false);
    };

    const handleDeleteProduct = async (productId) => {
        setLoading(true);
        await toast.promise(
            dispatch(deleteProduct(productId)).unwrap(),
            {
                loading: "Deleting product...",
                success: "Product deleted successfully!",
                error: (err) => `Error: ${err.message}`,
            }
        );
        setLoading(false);
    };

    const getCategoryNameById = (categoryId) => {
        return categories.find(category => category.id === categoryId)?.name || "";
    };

    return {
        products: products.map(product => ({
            ...product,
            category: getCategoryNameById(product.category),
        })),
        error,
        handleAddProduct,
        handleUpdateProduct,
        handleDeleteProduct,
    };
};

export default useProducts;