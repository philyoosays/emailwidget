require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const dataRouter = require('./server/router');
const tokenService = require('./auth/TokenService');
const authRouter = require('./auth/AuthRouter');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(tokenService.receiveToken);

app.use('/api', dataRouter);
app.use('/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


// app.post('/', (req, res) => {
//   // console.log('req.bodyyy is ', req.body)
//   // res.send('Hello Good sir')
// // sgMail.setApiKey(process.env.API_KEY);
// //   const msg = {
// //     to: 'philyoo@ymail.com',
// //     from: 'philyoomail@gmail.com',
// //     subject: 'req.body.subject',
// //     text: 'req.body.textBody',
// //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// //   };
// //   sgMail.send(msg);

//   fetch('https://api.sendgrid.com/v3/mail/send', {
//     body: JSON.stringify({
//       "personalizations": [
//         {
//           "to": [
//             {
//               "email": "john.doe@example.com",
//               "name": "John Doe"
//             }
//           ],
//           "subject": "Hello, World!"
//         }
//       ],
//       "from": {
//         "email": "sam.smith@example.com",
//         "name": "Sam Smith"
//       },
//       "reply_to": {
//         "email": "sam.smith@example.com",
//         "name": "Sam Smith"
//       },
//       "content": [
//         {
//           "type": "text/plain",
//           "value": "yoyoy"
//         }
//       ]
//     }),
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, same-origin, *omit
//     headers: {
//       'authorization': 'Bearer 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',
//       'content-type': 'application/json'
//     },
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, cors, *same-origin
//     redirect: 'follow', // manual, *follow, error
//     referrer: 'no-referrer', // *client, no-referrer
//   })
//   res.end();
// })

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});

module.exports = app;
