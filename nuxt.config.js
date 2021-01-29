
const config = require('./.contentful.json')
const contentful = require('contentful')
const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN
}) 

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN
  },
  
  
  head: {
    title: 'this_is_portofolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

    '@fortawesome/fontawesome-svg-core/styles.css' // ここを追加

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

    { src: '~plugins/font-awesome', ssr: false } // ここを追加

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [

    '@nuxtjs/markdownit',
    'nuxt-fontawesome'
  ],

  // ここから追加
  markdownit: { 
    html: true,
    injected: true,
    linkify: true,
    breaks: false
  },
  // ここまで追加

  // ここから追加
  fontawesome: {
    component: 'fa'
  },
  // ここまで追加

  generate: {
    routes () {
      return Promise.all([
        client.getEntries({
          'content_type': 'work'
        }),
        client.getEntries({
          'content_type': 'category'
        }),
        client.getEntries({
          'content_type': 'tag'
        })
      ]).then(([works,categories,tags]) => {
        return [
          ...works.items.map(work => `work/${work.fields.slug}`),
          ...categories.items.map(category => `category/${category.fields.slug}`),
          ...tags.items.map(tag => `tag/${tag.sys.id}`)
        ]
      })
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
