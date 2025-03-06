import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '@/features/cart/cartSlice';
import productReducer from '@/features/products/productSlice';
import categoryReducer from '@/features/categories/categorySlice'; 

export default configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
        categories: categoryReducer,
    }
});
