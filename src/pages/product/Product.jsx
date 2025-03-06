import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useTheme } from '../../context/ThemeContext';
import useProducts from "@/hooks/useProducts";
import Loader from '../../components/Loader';

// 🔹 Lazy load components
const ProductCatalog = lazy(() => import('../../components/pages/product/product-catalog/ProductCatalog'));
const ProductDetails = lazy(() => import('../../components/pages/product/product-details/ProductDetails'));

const Product = () => {
    const { products } = useProducts();
    const { id } = useParams(); // Get product ID from URL
    const { isDarkMode } = useTheme();
    
    // 🔹 Flag to track when products are loaded
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (products.length > 0) {
            setIsDataLoaded(true);
        }
    }, [products]); // 🔹 Update flag when products are fetched

    // Find the product by ID
    const product = products.find((item) => item.id === id);

    return (
        <Layout>
            <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                {!isDataLoaded ? (
                    <Loader />
                ) : product ? (
                    <Suspense fallback={<Loader />}>
                        <div className='flex max-w-[1440px] flex-col md:flex-row'>
                            <ProductCatalog product={product} />
                            <ProductDetails product={product} />
                        </div>
                    </Suspense>
                ) : (
                    <div className="h-[60dvh] flex items-center flex-col justify-center">
                        <h1 className="text-4xl font-bold">404</h1>
                        <p className="text-xl mt-2">Product Not Found</p>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default Product;
