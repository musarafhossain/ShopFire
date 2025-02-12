import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from '../../components/home/hero/Hero'
import Category from '../../components/home/category/Category'
import SpecialOffer from '../../components/home/special-offer/SpecialOffer'

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Category />
      <SpecialOffer />
    </Layout>
  )
}

export default Home