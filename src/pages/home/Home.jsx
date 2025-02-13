import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from '../../components/home/hero/Hero'
import Category from '../../components/home/category/Category'
import BestProducts from '../../components/home/best-products/BestProducts'
import SpecialOffer from '../../components/home/special-offer/SpecialOffer'

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