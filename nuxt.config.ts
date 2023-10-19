// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-socket-io',
    // '@nuxtjs/axios'
  ],
  serverHandlers: [
    {
      route: '/ws', //websocket
      handler: '~/server/middleware/socket' //path
    }
  ],
 

  
})
