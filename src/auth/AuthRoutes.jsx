import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthRoutes = ({ children }) => {
    const { user } = useAuth();
    return user ? <Navigate to="/" /> : children;
};

export default AuthRoutes;
