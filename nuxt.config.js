// Import the express session.
const session = require('express-session')
// Import the database.
const database = require('./model/sqldb');
const sequelize = database.sequelize;
// Import the plugin of sequelize with connect session.
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Initialize the store.
const myStore = new SequelizeStore({
  db: sequelize
})

// Auto create session table
myStore.sync();

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Modules of axios
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  serverMiddleware: [
    // Session middleware
    session({
      secret: '128 bytes random string',
      store: myStore,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 600 * 1000 }
    }),
    // API middleware
    '~/api/index.js'
  ]
}
