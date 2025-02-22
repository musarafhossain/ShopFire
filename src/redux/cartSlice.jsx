import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,  // Unique item count
        totalPrice: 0,     // Total price of all items
        totalDiscount: 0,  // Total discount amount
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.totalQuantity = state.items.length;
            cartSlice.caseReducers.updateTotals(state);
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
            cartSlice.caseReducers.updateTotals(state);
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            cartSlice.caseReducers.updateTotals(state);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalQuantity = state.items.length;
            cartSlice.caseReducers.updateTotals(state);
        },
        updateTotals: (state) => {
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            state.totalDiscount = state.items.reduce((sum, item) => sum + (item.mrp - item.price) * item.quantity, 0);
        }
    },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
