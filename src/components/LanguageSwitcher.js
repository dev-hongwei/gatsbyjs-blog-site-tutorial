import React from 'react'
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next'

const LanguageSwitcher = () => {
  const { languages, originalPath, i18n } = useI18next()
  const { t } = useTranslation()

  return (
    <ul className="nav language-switcher">
      <li className="nav-item">
        <a href="#">
          <img src="/images/globe.svg" alt={t(`nav-globe`)} />
        </a>
        <div className="sub-nav-container">
          <ul className="sub-nav">
            {languages.map((lng) => {
              return (
                <li key={lng} className="sub-nav-item">
                  <Link
                    to={originalPath}
                    language={lng}
                    style={{
                      display: i18n.resolvedLanguage === lng ? 'none' : 'block',
                    }}
                  >
                    {t(lng)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </li>
    </ul>
  )
}

export default LanguageSwitcher
