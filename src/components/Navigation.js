import React from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

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
  return (
    <ul className="nav">
      {navigationItems.map((navItem, index) => {
        return (
          <li key={navItem.id} className="nav-item">
            <Link to={navItem.path}>
              <img src={`/images/${navItem.id}.svg`} alt={t(`${navItem.id}`)} />
              {t(`${navItem.id}`)}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Navigation
