// // mailchimpService.js

// const apiKey = 'a5572e89f15187917b2b68ea60f74cb5-us8';
// const audienceId = '866280';

// const mailchimpAPI = $fetch.create({
//   baseURL: `https://us8.api.mailchimp.com/3.0/`, // Замените <dc> на ваш дата-центр Mailchimp
//   auth: {
//     username: 'vyacheslavovna',
//     password: apiKey,
//   },
// });

// const addSubscriber = async (email) => {
//   try {
//     const response = await mailchimpAPI.post(`/lists/${audienceId}/members`, {
//       email_address: email,
//       status: 'subscribed',
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export { addSubscriber };
