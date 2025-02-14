import React from 'react'
import Layout from '../../components/layout/Layout'
import CartItems from '../../components/cart/cart-items/CartItems'
import BillingSection from '../../components/cart/billing-section/BillingSection'
import { useTheme } from '../../context/ThemeContext'

const Cart = () => {
  const { isDarkMode } = useTheme();
  return (
    <Layout>
      <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className='flex justify-center items-center md:items-start max-w-[1440px] gap-5 p-4 lg:p-16 lg:px-20 flex-col md:flex-row'>
          <CartItems />
          <BillingSection />
        </div>
      </section>
    </Layout>
  )
}

export default Cart