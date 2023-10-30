// import { setConfig } from "@mailchimp/mailchimp_marketing";

// setConfig({
//   apiKey: process.env.MAILAPI,
//   server: process.env.MAILSERVER,
// });

// const listId = process.env.MAILLISTID;
// const subscribingUser = {
//   firstName: "Prudence",
//   lastName: "McVankab",
//   email: "prudence.mcvankab@example.com"
// };
  
// async function run() {
//   const response = await lists.addListMember(listId, {
//     email_address: subscribingUser.email,
//     status: "subscribed",
//     merge_fields: {
//       FNAME: subscribingUser.firstName,
//       LNAME: subscribingUser.lastName
//     }
//   });

//   console.log(
//     `Successfully added contact as an audience member. The contact's id is ${
//       response.id
//     }.`
//   );
// }
  
//   run();

// async function run() {
//   const response = await mailchimp.ping.get();
//   console.log(response);
// }

// run();