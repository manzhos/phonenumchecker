require('dotenv').config();

const express = require('express')
const app  = express()

const port       = process.env.PORT
const accountSid = process.env.TWILIO_ACCOUNT_SID
const serviceSid = process.env.TWILIO_SERVICE_SID
const authToken  = process.env.TWILIO_AUTH_TOKEN
const client     = require('twilio')(accountSid, authToken)

app.get('/', (req, res)=>{
  res.status(200).send({
    message: "You are on Homepage",
    info: {
      phone: "Send verification code through /phone . It contains param phonenumber",
      verify: "Verify the recieved code through /verify . It contains two params i.e. phonenumber and code"
    }
  })
})



// const axios = require('axios');
// const qs = require('qs');
// let data = qs.stringify({
//   'To': '+15017122661',
//   'Channel': 'sms'
// });
// const config = {
//   method: 'post',
//   url: 'https://verify.twilio.com/v2/Services/VAdc72f78d20a46d183be362212e912770/Verifications',
//   headers: {
//     'Authorization': 'Basic QUNhMDhhOGNlNGFhMjI1ZjQ5NDRlMTIzZDg0OWVlNWZiZjo5MTc1Y2UxZDgxZWJiMTQ4NjY0NWI0NDk2MTU3Mjg0Yg==',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   data : data
// };
//
// app.get()
// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });



// Phone Endpoint
app.post('/phone', (req,res) => {
  if (req.query.phonenumber) {
    console.log(`The code to phone +${req.query.phonenumber} is sending`);
    client.verify.services(serviceSid).verifications
      .create({ to: `+${req.query.phonenumber}`, channel: 'sms' })
      .then(verification => console.log(verification.status))
  } else {
    res.status(400).send({message: "Wrong phone number :(", phonenumber: req.query.phonenumber})
  }
})

// Verify Endpoint
app.post('/verify', (req, res) => {
  if (req.query.phonenumber && req.query.code && (req.query.code).length === 6) {
    console.log(`Verifing the phone +${req.query.phonenumber} with code ${req.query.code}`);
    client.verify.services(serviceSid).verificationChecks
      .create({ to: `+${req.query.phonenumber}`, code: req.query.code })
      .then(verification_check => console.log(verification_check.status));
  } else {
    res.status(400).send({ message: "Wrong phone number or code :(", phonenumber: req.query.phonenumber, data })
  }
})


app.listen(port,() => {
	// createService();
	console.log(`The app has been started on port: ${port}`)
  // console.log('\nClient:', client);
});
