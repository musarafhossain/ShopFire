import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='content'>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout