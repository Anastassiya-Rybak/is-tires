// import { stringify } from "querystring";
// import { request } from "https";

// const instanceID = process.env.WA_INSTANCE_ID;
// const token = process.env.WA_TOKEN;

// var options = {
//   "method": "POST",
//   "hostname": "api.ultramsg.com",
//   "port": null,
//   "path": `/${instanceID}/messages/chat`,
//   "headers": {
//     "content-type": "application/x-www-form-urlencoded"
//   }
// };

// var req = request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });
// var postData = stringify({
//     "token": token,
//     "to": "%2B77066028183",
//     "body": "WhatsApp API на UltraMsg.com работает хорошо"
// });
// req.write(postData);
// req.end();