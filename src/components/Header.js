import React from 'react'
import Navigation from './Navigation'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  return (
    <header className="layout-header">
      <div className="layout-header-container">
        <Navigation />
        <LanguageSwitcher />
      </div>
    </header>
  )
}

export default Header
