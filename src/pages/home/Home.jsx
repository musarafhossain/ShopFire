import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from '../../components/pages/home/hero/Hero'
import Category from '../../components/pages/home/category/Category'
import BestProducts from '../../components/pages/home/best-products/BestProducts'
import SpecialOffer from '../../components/pages/home/special-offer/SpecialOffer'

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Category />
      <BestProducts /> 
      <SpecialOffer />
    </Layout>
  )
}

export default Home