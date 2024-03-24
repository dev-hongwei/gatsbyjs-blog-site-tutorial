import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const Post = ({ data }) => {
  const post = data.markdownRemark
  const { title, date } = post.frontmatter
  const { t } = useTranslation()
  return (
    <Layout>
      <h2>{title}</h2>
      <i className="post-info">
        {t('post-published-at')} {date}
      </i>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
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
        date
      }
    }
  }
`

export default Post
