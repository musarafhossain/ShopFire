import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <center>
        <div className='content max-w-[1440px] h-[100dvh]'>
          {children}
        </div>
      </center>
      <Footer />
    </>
  )
}

export default Layout