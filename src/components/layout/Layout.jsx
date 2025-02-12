import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <center>
        <main className='content'>
          {children}
        </main>
      </center>
      <Footer />
    </>
  )
}

export default Layout