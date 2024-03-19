/**
 * @type {import('gatsby').GatsbyConfig}
 */

// import language related configuration
const { languages, defaultLanguage } = require('./src/common/Languages')

module.exports = {
  siteMetadata: {
    title: `gatsbyjs-blog-site-tutorial`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    // css plugin
    `gatsby-plugin-postcss`,

    // multi-languages support
    {
      // define from where to find the multi-language resources
      // use name to reference it.
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // reference the multi-language resources
        languages, // all languages that are supported
        defaultLanguage, // the default language
        siteUrl: `https://www.yourdomain.tld`,
        trailingSlash: 'always',
        i18nextOptions: {
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          defaultNS: 'common',
          interpolation: {
            escapeValue: false,
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [],
      },
    },
  ],
}
