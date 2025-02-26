import { useState, useEffect, useCallback } from "react";
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "@/firebase/FirebaseConfig";
import { useLoading } from "@/context/LoadingContext";
import toast from "react-hot-toast";
import useCloudinary from "@/hooks/useCloudinary";
import { useTheme } from "@/context/ThemeContext";

const useProductsCollection = () => {
  const { loading, setLoading } = useLoading();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { uploadImage, deleteImage } = useCloudinary();
  const { isDarkMode } = useTheme();

  const productsRef = collection(fireDB, "products");

  // 🔹 Fetch all products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await getDocs(productsRef);
      const productList = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc?.id,
      }));
      //console.log(productList)
      setProducts(productList);
    } catch (err) {
      setError(err.message);
      toast.error(`Error fetching products: ${err.message}`, {
        style: {
          background: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#333",
        },
      });
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  // 🔹 Fetch a single product by ID
  const getProductFromFirestore = useCallback(async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const productDoc = doc(fireDB, "products", productId);
      const productSnap = await getDoc(productDoc);

      if (productSnap.exists()) {
        return { id: productSnap.id, ...productSnap.data() };
      } else {
        throw new Error("Product not found");
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Error fetching product: ${err.message}`, {
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

  // 🔹 Add a new product (Handles Firestore & Cloudinary)
  const addProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Upload Images to Cloudinary
      const imageFiles = productData.images.filter(img => img.file).map(img => img.file);
      let imageUrls = productData.images.map(img => img.url || img).filter(img => !img.startsWith("blob:"));

      if (imageFiles.length > 0) {
        const uploadedUrls = await Promise.all(imageFiles.map(file => uploadImage(file)));
        if (!uploadedUrls) throw new Error("Image upload failed");
        imageUrls = [...uploadedUrls, ...imageUrls];
      }

      // Step 2: Save Product in Firestore
      const finalProductData = { ...productData, images: imageUrls };
      const docRef = await addDoc(productsRef, finalProductData);
      const newProduct = { id: docRef.id, ...finalProductData };

      // Step 3: Update Local State
      setProducts(prev => [...prev, newProduct]);

      toast.success("Product added successfully!", {
        style: {
          background: isDarkMode ? "#4CAF50" : "#E6F4EA",
          color: isDarkMode ? "#fff" : "#333",
        },
      });

      return newProduct;
    } catch (err) {
      setError(err.message);
      console.log(err)
      toast.error(`Error adding product: ${err.message}`, {
        style: {
          background: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#333",
        },
      });
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  // 🔹 Update a product (Handles Image Management)
  const updateProduct = useCallback(async (productId, productData) => {
    setLoading(true);
    setError(null);
    try {
      const productDoc = doc(fireDB, "products", productId);
      const existingProduct = await getProductFromFirestore(productId);
      if (!existingProduct) throw new Error("Product not found");

      // Identify Removed Images
      const existingImages = existingProduct.images || [];
      const currentImages = productData.images
        .map(img => img.url || img)
        .filter(img => !img.startsWith("blob:"));
      const deletedImages = existingImages.filter(img => !currentImages.includes(img));

      // Delete Removed Images from Cloudinary
      await Promise.all(deletedImages.map(imgUrl => deleteImage(imgUrl)));

      // Upload New Images
      const newImages = productData.images.filter(img => img.file).map(img => img.file);
      let imageUrls = currentImages;

      if (newImages.length > 0) {
        const uploadedUrls = await Promise.all(newImages.map(file => uploadImage(file)));
        if (!uploadedUrls) throw new Error("Image upload failed");
        imageUrls = [...uploadedUrls, ...currentImages];
      }

      // Save Updated Product in Firestore
      const updatedData = { ...productData, images: imageUrls };
      await updateDoc(productDoc, updatedData);
      setProducts(prev => prev.map(p => (p.id === productId ? { ...p, ...updatedData } : p)));

      toast.success("Product updated successfully!", {
        style: {
          background: isDarkMode ? "#4CAF50" : "#E6F4EA",
          color: isDarkMode ? "#fff" : "#333",
        },
      });
    } catch (err) {
      setError(err.message);
      toast.error(`Error updating product: ${err.message}`, {
        style: {
          background: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#333",
        },
      });
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  // 🔹 Delete a product
  const deleteProduct = useCallback(async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const productDocRef = doc(fireDB, "products", productId);
      const productSnap = await getDoc(productDocRef);
      if (!productSnap.exists()) throw new Error("Product not found!");

      const productData = productSnap.data();
      const imageUrls = productData.images || [];

      // Delete associated images from Cloudinary
      await Promise.all(imageUrls.map(imgUrl => deleteImage(imgUrl)));

      // Delete the product from Firestore
      await deleteDoc(productDocRef);

      // Update local state
      setProducts(prev => prev.filter(p => p.id !== productId));

      toast.success("Product deleted successfully!", {
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
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  // 🔹 Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, error, addProduct, updateProduct, deleteProduct, getProductFromFirestore };
};

export default useProductsCollection;
