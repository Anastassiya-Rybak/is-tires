// https://nuxt.com/docs/api/configuration/nuxt-config
// import { DefineNuxtConfig } from "nuxt/config"

export default {
  target: 'static',
  router: {
    base: '/is-tires/'
  },
  head: {
    title: 'Искра Сервис',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],
  components: true,
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],
  modules: [],
  build: {
    transpile: ['swiper'],
  },
}
