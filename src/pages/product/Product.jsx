import React from 'react'
import Layout from '../../components/layout/Layout'
import ProductImages from '../../components/product/product-catalog/ProductCatalog'
import ProductDetails from '../../components/product/product-details/ProductDetails'
import { useTheme } from '../../context/ThemeContext'

const Product = () => {
    const { isDarkMode } = useTheme();
    return (
        <Layout>
            <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className='flex max-w-[1440px] flex-col md:flex-row'>
                    <ProductImages />
                    <ProductDetails />
                </div>
            </section>
        </Layout>
    )
}

export default Product