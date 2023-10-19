// https://nuxt.com/docs/api/configuration/nuxt-config
// import { DefineNuxtConfig } from "nuxt/config"

// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();

// app.use(express.json());
// app.use(cors()); // Разрешить CORS для всех маршрутов

// app.post('/addSubscriber', async (req, res) => {
//   try {
//     // Ваш код для добавления подписчика в Mailchimp

//     const response = await axios.post('https://us8.api.mailchimp.com/3.0/lists/866280/members', req.body, {
//       auth: {
//         username: 'vyacheslavovna',
//         password: 'a5572e89f15187917b2b68ea60f74cb5-us8',
//       },
//     });

//     res.json(response.data);
//   } catch (error) {
//     // Здесь вы можете логировать ошибку
//     console.error('Ошибка при добавлении подписчика:', error);
//     res.status(500).json({ error: 'Ошибка при добавлении подписчика' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });


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
  plugins: [
    { src: '~/plugins/vee-validate', ssr: false }
  ],
  components: true,
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],
  modules: [
    // '@nuxtjs/proxy',
  ],
  // nitro: {
  //   devProxy: { '/api': `http://localhost:${ process.env.SERVER_PORT || 3000 }` },
  // },
  // axios: {
  //   proxy: true,
  // },
  // proxy: {
  //   '/api': {
  //     target: 'https://us8.api.mailchimp.com/',
  //     pathRewrite: {
  //       '^/api': '/3.0' // Может потребоваться изменить в зависимости от структуры Mailchimp API
  //     },
  //   },
  // },
  build: {
    transpile: ['swiper'],
  },
}
