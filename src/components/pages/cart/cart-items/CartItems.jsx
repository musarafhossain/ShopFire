import React from 'react'
import { useTheme } from '../../../context/ThemeContext'
import CartItem from '../cart-item/CartItem'

const CartItems = () => {
    const products = [
        {
            name: "Wireless Bluetooth Headphones",
            image: "https://picsum.photos/id/100/200/300",
            price: 79.99,
            mrp: 129.99,
            brand: "Sony"
        },
        {
            name: "Running Shoes",
            image: "https://picsum.photos/id/102/200/300",
            price: 59.95,
            mrp: 89.99,
            brand: "Nike"
        },
        {
            name: "Smartwatch Series 5",
            image: "https://picsum.photos/id/103/200/300",
            price: 199.00,
            mrp: 249.99,
            brand: "Samsung"
        },
        {
            name: "Electric Toothbrush",
            image: "https://picsum.photos/id/104/200/300",
            price: 39.50,
            mrp: 59.99,
            brand: "Oral-B"
        },
        {
            name: "4K Ultra HD Smart TV",
            image: "https://picsum.photos/id/106/200/300",
            price: 699.99,
            mrp: 899.99,
            brand: "LG"
        }
    ];
    const { isDarkMode } = useTheme();

    return (
        <div className={`border ${isDarkMode ? ' border-[#2f2f2f] ' : ' border-[#dcdada] '} lg:p-5 rounded-2xl w-full md:w-[60%] lg::w-[70%]`}>
            <h1 className='text-xl font-bold px-5 pt-3 flex justify-between items-center'>
                <span>My Cart (1)</span>
                <span>₹299.00</span>
            </h1>
            <div className='p-5'>
                {products.map((product, index) =>
                    <CartItem 
                        key={product.name} 
                        product={product}
                        isLast={index === products.length - 1} 
                    />
                )}
            </div>
        </div>
    )
}

export default CartItems