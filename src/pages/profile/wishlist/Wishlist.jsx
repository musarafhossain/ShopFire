import React from 'react';
import ProfileLayout from '@/components/pages/profile/ProfileLayout';
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/auth/AuthContext";
import useProducts from '@/hooks/useProducts';
import AspectProductCard from '../../../components/cards/AspectProductCard';

const Wishlist = () => {
    const { user } = useAuth();
    const { products } = useProducts();
    const { isDarkMode } = useTheme();

    // Filter products that are in the user's wishlist
    const wishlistProducts = products?.filter(product => user?.wishlist?.includes(product.id)) || [];

    return (
        <ProfileLayout pageTitle="Wishlist">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {wishlistProducts.length > 0 ? (
                    wishlistProducts.map(product => (
                        <AspectProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Your wishlist is empty.</p>
                )}
            </div>
        </ProfileLayout>
    );
};

export default Wishlist;
