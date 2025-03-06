import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "@/firebase/firebaseConfig";
import { uploadImage, deleteImage } from "@/services/cloudinaryService";

const productsRef = collection(fireDB, "products");

const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const snapshot = await getDocs(productsRef);
            return snapshot.docs.map(docSnap => ({
                ...docSnap.data(),
                id: docSnap.id,
            }))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

const addProduct = createAsyncThunk(
    "products/add",
    async (productData, { rejectWithValue }) => {
        try {
            const docRef = await addDoc(collection(fireDB, "products"), {});
            const productId = docRef.id;

            const imageFiles = productData.images.filter((img) => img.file).map((img) => img.file);
            let imageUrls = productData.images.map((img) => img.url || img).filter((img) => !img.startsWith("blob:"));

            if (imageFiles.length > 0) {
                const uploadedUrls = await Promise.all(imageFiles.map((file) => uploadImage(file, productId)));
                imageUrls = [...uploadedUrls, ...imageUrls];
            }

            const finalProductData = { ...productData, images: imageUrls, id: productId };
            await updateDoc(docRef, finalProductData);

            return finalProductData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const updateProduct = createAsyncThunk(
    "products/update",
    async ({ productId, productData }, { rejectWithValue }) => {
        try {
            const productDoc = doc(fireDB, "products", productId);
            const productSnap = await getDoc(productDoc);

            if (!productSnap.exists()) {
                throw new Error("Product not found");
            }

            const existingProduct = productSnap.data();

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
                const uploadedUrls = await Promise.all(newImages.map(file => uploadImage(file, productId)));
                if (!uploadedUrls) throw new Error("Image upload failed");
                imageUrls = [...uploadedUrls, ...currentImages];
            }

            // Save Updated Product in Firestore
            const updatedData = { ...productData, images: imageUrls };
            await updateDoc(productDoc, updatedData);

            return { id: productId, ...updatedData };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const deleteProduct = createAsyncThunk(
    "products/delete",
    async (productId, { rejectWithValue }) => {
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

            return productId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Products Cases
            .addCase(fetchProducts.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Add Product Cases
            .addCase(addProduct.pending, (state) => {
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Update Product Cases
            .addCase(updateProduct.pending, (state) => {
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Delete Product Cases
            .addCase(deleteProduct.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export { fetchProducts, addProduct, updateProduct, deleteProduct };
export default productSlice.reducer;