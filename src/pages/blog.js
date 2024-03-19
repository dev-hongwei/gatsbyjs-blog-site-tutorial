// import react
import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/Layout'

// define blog page component
const Blog = () => {
  const { t } = useTranslation()
  return (
    <Layout>
      <h1>
        {t('nav-blog')}: {t('placeholder-page-content')}
      </h1>
    </Layout>
  )
}

// export blog page component
export default Blog

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
