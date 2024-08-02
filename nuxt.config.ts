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
      apiKey: process.env.NUXT_PUBLIC_MAILCHIMP_API_KEY,
      listId: process.env.NUXT_PUBLIC_MAILCHIMP_LIST_ID,
      server: process.env.NUXT_PUBLIC_MAILCHIMP_SERVER,
      component: true // optional
    }
  },

  imports: {
    dirs: ['stores'],
  },

  css: ["@/assets/scss/global.scss"],

  runtimeConfig: {
    public: {
      submit: {
        apiKey: process.env.NUXT_PUBLIC_SUBMIT_API_KEY,
        email: process.env.NUXT_PUBLIC_SUBMIT_EMAIL
      },
      mailchimp: {
        apiKey: process.env.NUXT_PUBLIC_MAILCHIMP_API_KEY,
        server: process.env.NUXT_PUBLIC_MAILCHIMP_SERVER,
        listId: process.env.NUXT_PUBLIC_MAILCHIMP_LIST_ID
      },
      whatsapp: {
        apiUrl: process.env.NUXT_PUBLIC_WAHATSAPP_API_URL,
        instanceId: process.env.NUXT_PUBLIC_WAHATSAPP_INSTANCE_ID,
        token: process.env.NUXT_PUBLIC_WAHATSAPP_TOKEN
      },
      infobip: {
        apiKey: process.env.NUXT_PUBLIC_INFOBIP_API_KEY,
        recipient: process.env.NUXT_PUBLIC_INFOBIP_RECIPIENT
      }
    }
  },

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

  compatibilityDate: "2024-08-02",
})