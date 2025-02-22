import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../../../context/ThemeContext';
import CartItem from '../cart-item/CartItem';

const CartItems = () => {
    const { isDarkMode } = useTheme();
    const cartItems = useSelector(state => state.cart.items); // Get cart items from Redux
    const totalUniqueItems = useSelector(state => state.cart.totalQuantity); // Get unique item count
    const totalPrice = useSelector(state => state.cart.totalPrice); // Calculate total price

    return (
        <div className={`border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} lg:p-5 rounded-2xl w-full md:w-[60%] lg::w-[70%]`}>
            <h1 className='text-xl font-bold px-5 pt-3 flex justify-between items-center'>
                <span>My Cart ({totalUniqueItems})</span>
                <span>₹{totalPrice.toFixed(2)}</span>
            </h1>
            <div className='p-5'>
                {cartItems.length > 0 ? (
                    cartItems.map((product, index) => (
                        <CartItem 
                            key={product.id} 
                            product={product}
                            isLast={index === cartItems.length - 1} 
                        />
                    ))
                ) : (
                    <p className='text-center text-gray-500'>Your cart is empty</p>
                )}
            </div>
        </div>
    );
}

export default CartItems;
