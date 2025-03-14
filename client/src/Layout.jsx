import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

const Layout = ({children}) =>{
    return(
        <>
        <Header/>
        <div className='p-4'>{children}</div>
        <Footer/>
        </>
    )
}

export default Layout