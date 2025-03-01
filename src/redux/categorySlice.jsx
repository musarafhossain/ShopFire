import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fireDB } from "@/firebase/FirebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

// Async Thunks for Firebase CRUD Operations

// Fetch all categories
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async (_, thunkAPI) => {
  try {
    const querySnapshot = await getDocs(collection(fireDB, "categories"));
    let categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return categories;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Add category
export const addCategory = createAsyncThunk("categories/addCategory", async (categoryData, thunkAPI) => {
  try {
    const docRef = await addDoc(collection(fireDB, "categories"), categoryData);
    return { id: docRef.id, ...categoryData };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Update category
export const updateCategory = createAsyncThunk("categories/updateCategory", async ({ id, updatedData }, thunkAPI) => {
  try {
    const categoryRef = doc(fireDB, "categories", id);
    await updateDoc(categoryRef, updatedData);
    return { id, ...updatedData };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Delete category
export const deleteCategory = createAsyncThunk("categories/deleteCategory", async (id, thunkAPI) => {
  try {
    await deleteDoc(doc(fireDB, "categories", id));
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Category Slice
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {}, // No normal reducers needed since we handle everything in asyncThunks
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Category
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      // Update Category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })

      // Delete Category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
      });
  }
});

export default categorySlice.reducer;
