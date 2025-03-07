import React, { useState } from 'react'
import ProfileLayout from '@/components/pages/profile/ProfileLayout'
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/auth/AuthContext";
import toast from "react-hot-toast";


const Wishlist = () => {
    const { user, updateUser } = useAuth();
    const { isDarkMode } = useTheme();
    return (
        <ProfileLayout pageTitle="Wishlist">
            <div>Wishlist</div>
        </ProfileLayout>
    )
}

export default Wishlist