import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const Page = ({
  data: {
    markdownRemark: { html },
  },
}) => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const query = graphql`
  query ($category: String!, $slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    markdownRemark(
      fields: {
        category: { eq: $category }
        slug: { eq: $slug }
        locale: { eq: $language }
      }
    ) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Page
