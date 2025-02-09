import React from 'react'
import Layout from '../../components/layout/Layout'
import { useTheme } from '../../context/ThemeContext'

const Home = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <Layout>Home
      {isDarkMode ? <h1>Dark Mode Enables</h1> : <h1>Dark Mode Off</h1>}
    </Layout>
  )
}

export default Home