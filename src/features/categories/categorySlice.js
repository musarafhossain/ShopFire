import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "@/firebase/firebaseConfig";
import { uploadImage, deleteImage } from "@/services/cloudinaryService";

const categoriesRef = collection(fireDB, "categories");

const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const querySnapshot = await getDocs(categoriesRef);
            return querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const addCategory = createAsyncThunk(
    "categories/addCategory",
    async (category, { rejectWithValue }) => {
        try {
            const docRef = await addDoc(categoriesRef, {});
            const categoryId = docRef.id;
            let imageUrl = category.image?.file ? await uploadImage(category.image.file, categoryId) : null;
            const finalCategoryData = { ...category, image: imageUrl, id: categoryId };
            await updateDoc(docRef, finalCategoryData);
            return finalCategoryData;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async (category, { rejectWithValue }) => {
        try {
            const categoryRef = doc(fireDB, "categories", category.id);
            const categorySnap = await getDoc(categoryRef);

            if (!categorySnap.exists()) {
                throw new Error("Category not found");
            }

            const existingCategory = categorySnap.data();

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

            return updatedData;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (categoryId, { rejectWithValue }) => {
        try {
            const CategoryDocRef = doc(fireDB, "categories", categoryId);
            const CategorySnap = await getDoc(CategoryDocRef);
            if (!CategorySnap.exists()) throw new Error("Product not found!");

            const categoryData = CategorySnap.data();
            const imageUrl = categoryData.image || '';
            await deleteImage(imageUrl);
            await deleteDoc(CategoryDocRef);
            return categoryId;
        } catch (err) {
            return rejectWithValue(err.message);
        };
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Categories
            .addCase(fetchCategories.pending, (state, action) => {
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Add Category
            .addCase(addCategory.pending, (state, action) => {
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Update Category
            .addCase(updateCategory.pending, (state, action) => {
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const updatedCategories = state.categories.map(category =>
                    category.id === action.payload.id ? action.payload : category
                );
                state.categories = updatedCategories;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Delete Category
            .addCase(deleteCategory.pending, (state, action) => {
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(category => category.id!== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export { fetchCategories, addCategory, updateCategory, deleteCategory };
export default categorySlice.reducer;