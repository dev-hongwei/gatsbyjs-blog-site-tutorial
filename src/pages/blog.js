// import react
import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'

const Blog = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const simplifiedPosts = useMemo(() => {
    return edges.map((post) => ({
      id: post.node.id,
      slug: post.node.fields.slug,
      date: post.node.frontmatter.date,
      title: post.node.frontmatter.title,
    }))
  }, [edges])

  return (
    <Layout>
      <BlogList data={simplifiedPosts} />
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
    allMarkdownRemark(
      filter: {
        fields: { category: { eq: "post" }, locale: { eq: $language } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`
