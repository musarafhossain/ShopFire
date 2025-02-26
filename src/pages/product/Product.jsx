import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import ProductCatalog from '../../components/pages/product/product-catalog/ProductCatalog';
import ProductDetails from '../../components/pages/product/product-details/ProductDetails';
import { useTheme } from '../../context/ThemeContext';
import useProductsCollection from '@/hooks/useProductsCollection';

const Product = () => {
    const { products } = useProductsCollection();
    const { id } = useParams(); // Get product ID from URL
    const { isDarkMode } = useTheme();

    // Find the product by ID
    const product = products.find((item) => item.id === id);

    return (
        <Layout>
            <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                {product ? (
                    <div className='flex max-w-[1440px] flex-col md:flex-row'>
                        <ProductCatalog product={product} />
                        <ProductDetails product={product} />
                    </div>
                ) : (
                    <div className="h-[60dvh] flex items-center flex-col justify-center">
                        <h1 className="text-4xl font-bold">404</h1>
                        <p className="text-xl mt-2">Product Not Found</p>
                    </div>
                )}
            </section>
        </Layout>
    );
}

export default Product;
