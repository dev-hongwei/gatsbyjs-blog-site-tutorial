const path = require('path')
const { defaultLanguage } = require('./src/common/Languages')

const ContentCategory = {
  page: 'page',
  post: 'post',
}

const slugify = (str) => {
  return (
    str &&
    str
      .replace(/[ ]*-[ ]*/g, ' ') // replace '-', starts and ends with 0 - n blank
      .split(' ')
      .map((x) => x.toLowerCase())
      .join('-')
  )
}

const getMatchStr = (strContent, regExpression) => {
  let matchStr
  if (strContent) {
    let match
    while ((match = regExpression.exec(strContent)) !== null) {
      matchStr = match[0]
    }
  }
  return matchStr || ''
}

const getMDFileCategory = (path) => {
  // starts with 'content/', ends with '/', but the match doesn't contain 'content/' and '/'
  // design: this is because the names of the first-level directories under content represent their respective categories
  const regex = /(?<=content\/)(?!content\/).*?(?=\/)/g
  return getMatchStr(path, regex)
}

const getMDFileSlug = (category, path) => {
  let slug
  if (path) {
    switch (category) {
      case ContentCategory.page: {
        // starts with 'page, ends with 'index.', but the match doesn't contain 'page' and 'index.'
        // design: there is no directory under the page directory, the `/${fileName}` is the slug of the page files
        const regex = /(?<=page)(?!page).*?(?=\/index.)/g
        slug = getMatchStr(path, regex)
        break
      }
      case ContentCategory.post: {
        // starts with '/post', ends with 'index.', but the match doesn't contain 'index.'
        // design: a leaf directory's name is the post name, there are multiple index.{lang}.md files under the directory
        const regex = /\/post.*?(?=\/index.)/g
        slug = getMatchStr(path, regex)
        break
      }
      default: {
        slug = ''
        break
      }
    }
  }
  return slugify(slug || '')
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const category = getMDFileCategory(node.fileAbsolutePath)
    const slug = getMDFileSlug(category, node.fileAbsolutePath)
    const name = path.basename(node.fileAbsolutePath, '.md')
    const isDefault = name === `index.${defaultLanguage}`
    const lang = isDefault ? defaultLanguage : name.split('.')[1]

    createNodeField({
      node,
      name: 'category',
      value: category,
    })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
    createNodeField({
      node,
      name: 'isDefault',
      value: isDefault,
    })
    createNodeField({
      node,
      name: 'locale',
      value: lang,
    })
  }
}

exports.createPages = async (props) => {
  const { graphql, actions, reporter } = props
  const { createPage } = actions
  const pageTemplate = require.resolve('./src/templates/page.js')
  const blogTemplate = require.resolve('./src/templates/post.js')

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              category
              slug
              isDefault
              locale
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MD result', result.errors)
  }

  // create pages
  const all = result.data.allMarkdownRemark.edges
  all.forEach((page) => {
    const { category, slug, isDefault } = page.node.fields
    const pageData = {
      path: `${slug}`,
      component:
        category === ContentCategory.page ? pageTemplate : blogTemplate,
      context: {
        category,
        slug,
      },
    }
    if (isDefault) {
      createPage(pageData)
    }
  })
}
