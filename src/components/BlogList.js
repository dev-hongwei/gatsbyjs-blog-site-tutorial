import React, { useMemo } from 'react'
import Post from './Post'

const BlogList = ({ data = [] }) => {
  // get posts by year
  const postsByYear = useMemo(() => {
    const collection = {}

    data.forEach((post) => {
      const year = post.date?.split('-')[0]
      collection[year] = [...(collection[year] || []), post]
    })
    return collection
  }, [data])

  const years = useMemo(() => Object.keys(postsByYear).reverse(), [postsByYear])
  return years.map((year) => (
    <section key={year} className="segment">
      <h2 className="year">{year}</h2>
      <div className="posts">
        {postsByYear[year].map((node) => (
          <Post key={node.id} node={node} />
        ))}
      </div>
    </section>
  ))
}

export default BlogList
