export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  server: {
    port: 4000,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Groupomania",
    htmlAttrs: {
      lang: "fr",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Le réseau social de l'entreprise Groupomania",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap",
      },
    ],
    script: [
      {
        src: "https://kit.fontawesome.com/e5c44848d0.js",
        crossorigin: "anonymous",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  styleResources: {
    scss: ["~assets/scss/mixins.scss", "~assets/scss/variables.scss"],
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: "user",
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: "http://localhost:3000/api/auth/login",
            method: "post",
          },
          user: { url: "http://localhost:3000/api/auth/user", method: "get" },
        },
      },
    },
  },

  router: {
    middleware: ["auth"],
  },

  env: {
    apiUrl: process.env.API_URL || "http://localhost:3000/api",
  },
};
