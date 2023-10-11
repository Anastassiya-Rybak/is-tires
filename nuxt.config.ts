// https://nuxt.com/docs/api/configuration/nuxt-config
import { DefineNuxtConfig } from "nuxt/config"

export default {
  target: 'server',
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
  // router: {
  //   extendRoutes(routes: { name: string; path: string; component: any }[], resolve: (arg0: string, arg1: string) => any) {
  //     routes.push({
  //       name: 'about',
  //       path: '/about',
  //       component: resolve(__dirname, 'pages/about.vue')
  //     })
  //   }
  // }
  // ssr: true,

}
