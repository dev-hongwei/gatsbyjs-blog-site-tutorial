import React, { useState, useEffect, useRef } from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import Consts from '../common/Consts'

const navigationItems = [
  {
    id: 'nav-home',
    path: '/',
  },
  {
    id: 'nav-blog',
    path: '/blog',
  },
  {
    id: 'nav-about',
    path: '/about',
  },
]

const Navigation = () => {
  const { t } = useTranslation()
  const navItemRefs = useRef([])
  const subNavContainerRef = useRef(null)

  const handleSubNavItemClick = () => {
    subNavContainerRef.current.style.display = 'none'
  }

  const handleNavMoreItemMouseOver = () => {
    subNavContainerRef.current.style.display = 'block'
  }

  // initialize the window's width
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  )
  const [visibleItems, setVisibleItems] = useState(navigationItems)

  useEffect(() => {
    // add event listener of window's resize to update the value of windowWidth
    if (typeof window === 'undefined') {
      return
    }
    const handleResize = () => {
      // update the windows' width
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    navItemRefs.current.forEach((navItemRef, index) => {
      if (navItemRef) {
        navigationItems[index].width = navItemRef.offsetWidth
      }
    })
  }, [])

  useEffect(() => {
    // calculate visible navigation items
    let itemsToShow = []

    if (windowWidth >= Consts.width_ScreenThreshold) {
      const navbarWidth =
        windowWidth * Consts.width_ScreenRatio - Consts.width_LanguageSwitcher
      let addedItemWidth = 0
      const BreakException = {}
      try {
        navigationItems.forEach((navItem, index) => {
          addedItemWidth += navItem.width
          if (
            (index + 1 < navigationItems.length &&
              addedItemWidth + Consts.width_NavMoreItem > navbarWidth) ||
            (index + 1 == navigationItems.length &&
              addedItemWidth > navbarWidth)
          ) {
            throw BreakException
          }
          itemsToShow.push(navigationItems[index])
        })
      } catch (e) {
        if (e !== BreakException) {
          throw e
        }
      }
    }
    setVisibleItems(itemsToShow)
  }, [windowWidth])

  return (
    <ul className="nav">
      {visibleItems.map((navItem, index) => {
        return (
          <li
            key={navItem.id}
            className="nav-item"
            ref={(el) => (navItemRefs.current[index] = el)}
          >
            <Link to={navItem.path}>
              <img src={`/images/${navItem.id}.svg`} alt={t(`${navItem.id}`)} />
              {t(`${navItem.id}`)}
            </Link>
          </li>
        )
      })}
      {visibleItems.length < navigationItems.length && (
        <li
          className="nav-item nav-item-more"
          onMouseOver={handleNavMoreItemMouseOver}
        >
          {visibleItems.length === 0 && (
            <a href="#">
              <img
                src="/images/nav-hamburger.svg"
                alt={t(`nav-more`)}
                className="nav-hamburger-img"
              />
            </a>
          )}
          {visibleItems.length > 0 && (
            <a href="#">
              {t(`nav-more`)}
              <img src="/images/nav-more.svg" alt={t(`nav-more`)} />
            </a>
          )}
          <div className="sub-nav-container" ref={subNavContainerRef}>
            <ul className="sub-nav">
              {navigationItems.slice(visibleItems.length).map((navItem) => {
                return (
                  <li
                    key={navItem.id}
                    className="sub-nav-item"
                    onClick={handleSubNavItemClick}
                  >
                    <Link to={navItem.path}>
                      <img
                        className="sub-nav-reverse-img"
                        src={`/images/${navItem.id}-reverse-color.svg`}
                        alt={t(`${navItem.id}`)}
                      />
                      <img
                        className="sub-nav-img"
                        src={`/images/${navItem.id}.svg`}
                        alt={t(`${navItem.id}`)}
                      />
                      {t(`${navItem.id}`)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </li>
      )}
    </ul>
  )
}

export default Navigation
