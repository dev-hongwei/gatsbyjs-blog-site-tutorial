// import react
import React from 'react'
import Header from './Header'
import Footer from './Footer'

import '../styles/style.css'

// define layout component
const Layout = ({ children }) => {
  return (
    <div className="layout-whole">
      <Header />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  )
}

// export layout component
export default Layout
