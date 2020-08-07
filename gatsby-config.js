const lessToJson = require('less-to-json');

module.exports = {
  siteMetadata: {
    title: 'Media Player',
    description:
      'A serverless AMP-to-PWA media streaming browser single-page application.',
    author: 'Majid Mallis',
    siteUrl: 'https://radioplayer.vercel.app/',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: lessToJson('src/style/theme.less'),
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-html2amp',
      options: {
        files: ['index.html'],
        dist: 'public/amp',
        serviceWorker: {
          src: 'https://radioplayer.sh/sw.js',
          'data-iframe-src':
            'https://radioplayer/amp-install-serviceworker.html',
          layout: 'nodisplay',
        },
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
  ],
};
