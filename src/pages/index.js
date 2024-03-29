// import react
import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/Layout'

// define index page component
const IndexPage = () => {
  const { t } = useTranslation()
  return (
    <Layout>
      <h1>
        {t('nav-home')}: {t('placeholder-page-content')}
      </h1>
    </Layout>
  )
}

// export index page component
export default IndexPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
