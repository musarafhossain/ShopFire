import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from '../../components/home/hero/Hero'
import Category from '../../components/home/category/Category'

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Category />
    </Layout>
  )
}

export default Home