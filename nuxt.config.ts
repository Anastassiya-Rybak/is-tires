// https://nuxt.com/docs/api/configuration/nuxt-config
import { DefineNuxtConfig } from "nuxt/config"

export default {
  head: {
    htmlAttrs: {
      lang: 'ru'
    },
    title: 'Искра Сервис',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },    ],
    // link: [
    //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    //   { rel: 'sitemap', type: 'application/xml', href: 'https://localhost/sitemap.xml' }
    // ],
    // scripts: [
    //   { src: 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver' }
    // ]
  },
  devtools: { enabled: true },
  build: {
    transpile: ['swiper'],
  },
  // ssr: true,

}
