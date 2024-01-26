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
    '@nuxt/image',
    [
     '@nuxtjs/i18n',
      {
        lazy: true,
        langDir: "locales",
        strategy: "prefix_except_default",
        locales: [
          {
            code: "ru-RU",
            iso: "ru-RU",
            name: "Русский",
            file: "ru-RU.json"
          },
          {
            code: "kk-KZ",
            iso: "kk-KZ",
            name: "Қазақ",
            file: "kk-KZ.json"
          },
          {
            code: "en-US",
            iso: "en-US",
            name: "English",
            file: "en-US.json"
          }
        ],
        defaultLocale: "ru-RU",
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          redirectOn: 'root',  // recommended
        }
      },
    ]
  
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
