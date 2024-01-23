// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'test',
      mode: 'out-in'
    }
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  modules: [[
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      }
    ],
    [
      "nuxt-newsletter",
      {
        // Options
      },
    ],
    'nuxt-swiper',
    '@nuxt/image'
  ],
  newsletter: {
    mailchimp: {
      apiKey: process.env.MAILAPI,
      audienceId: process.env.MAILLISTID,
      serverPrefix: process.env.MAILSERVER,
      component: true // optional
    }
  },
  imports: {
    dirs: ['stores'],
  },
  css: ["@/assets/scss/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_vars.scss" as *;',
        },
      },
    },
  },
  build: {
    transpile: ['swiper'],
  },

})
