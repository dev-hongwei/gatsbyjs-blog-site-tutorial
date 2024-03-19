// import react
import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/Layout'

// define about page component
const About = () => {
  const { t } = useTranslation()
  return (
    <Layout>
      <h1>
        {t('nav-about')}: {t('placeholder-page-content')}
      </h1>
    </Layout>
  )
}

// export about page component
export default About

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
