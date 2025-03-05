import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        totalDiscount: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
            state.totalItems = state.items.length;
            cartSlice.caseReducers.updatePrice(state);
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
            cartSlice.caseReducers.updatePrice(state);
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            cartSlice.caseReducers.updatePrice(state);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id!== action.payload);
            state.totalItems = state.items.length;
            cartSlice.caseReducers.updatePrice(state);
        },
        updatePrice: (state) => {
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            state.totalDiscount = state.items.reduce((sum, item) => sum + (item.mrp - item.price) * item.quantity, 0);
        }
    }
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;