import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Layout = ({ children, className }) => {
  return (
    <>
      <Navbar />
      <center>
        <main className={`content ${className}`}>
          {children}
        </main>
      </center>
      <Footer />
    </>
  )
}

export default Layout