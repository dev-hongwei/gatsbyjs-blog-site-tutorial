import React from 'react'
import { Link } from 'gatsby-plugin-react-i18next'

const Post = ({ node }) => {
  return (
    <Link to={node.slug} key={node.id} className="post">
      <h3>{node.title}</h3>
      <time>{node.date}</time>
    </Link>
  )
}

export default Post
