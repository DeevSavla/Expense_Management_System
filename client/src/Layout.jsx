import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

const Layout = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow p-4">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout