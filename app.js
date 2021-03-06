require('dotenv').config();

const express = require('express')
const app     = express()

const port = process.env.PORT
// const accountSid = process.env.TWILIO_ACCOUNT_SID
// const serviceSid = process.env.TWILIO_SERVICE_SID
// const authToken  = process.env.TWILIO_AUTH_TOKEN
// const client     = require('twilio')(accountSid, authToken)

app.get('/', (req, res)=>{
  res.status(200).send({
    message: "You are on Homepage",
    info: {
      phone: "Send verification code through /send . It contains param phonenumber",
      verify: "Verify the recieved code through /check . It contains two params i.e. phonenumber and code"
    }
  })
})

const axios = require('axios')
const qs = require('qs')

app.use('/api/utils', require('./api/utils.js'))

// Send Endpoint
app.get('/send', (req, res) => {
  // prerare url & data
  let data = qs.stringify({
    'To': '+'+req.query.phonenumber,
    'Channel': 'sms'
  })
  const config = {
    method: 'post',
    url: 'https://verify.twilio.com/v2/Services/VAdc72f78d20a46d183be362212e912770/Verifications',
    headers: {
      'Authorization': 'Basic QUNhMDhhOGNlNGFhMjI1ZjQ5NDRlMTIzZDg0OWVlNWZiZjo5MTc1Y2UxZDgxZWJiMTQ4NjY0NWI0NDk2MTU3Mjg0Yg==',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  }
  // send request
  if (req.query.phonenumber) {
    console.log(`The code to phone +${req.query.phonenumber} is sending`)
    axios(config)
    .then(function (response) {
      console.log('All is OK:', JSON.stringify(response.data));

      // res.setHeader("Access-Control-Allow-Credentials", "true")
      // res.setHeader("Access-Control-Allow-Origin", "*")
      // res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
      // res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version")

      res.send(response.data)
      res.status(200).send({message: "The code is sent", phonenumber: req.query.phonenumber})
    })
    .catch(function (error) {
      console.log('Error:', error)
    })
  } else {
    res.status(400).send({message: "Wrong phone number :(", phonenumber: req.query.phonenumber})
  }
})

// Check Endpoint
app.get('/check', (req, res) => {
  let data = qs.stringify({
    'To': '+'+req.query.phonenumber,
    'Code': req.query.code,
    'Channel': 'sms'
  })
  const config = {
    method: 'post',
    url: 'https://verify.twilio.com/v2/Services/VAdc72f78d20a46d183be362212e912770/VerificationCheck',
    headers: {
      'Authorization': 'Basic QUNhMDhhOGNlNGFhMjI1ZjQ5NDRlMTIzZDg0OWVlNWZiZjo5MTc1Y2UxZDgxZWJiMTQ4NjY0NWI0NDk2MTU3Mjg0Yg==',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  }

  if (req.query.phonenumber && req.query.code && (req.query.code).length === 6) {
    console.log(`Verifing the phone +${req.query.phonenumber} with code ${req.query.code}`)
    axios(config)
    .then(function (response) {
      console.log('All is OK:', JSON.stringify(response.data))
      res.send(response.data)
      res.status(200).send({message: "The code is approved", phonenumber: req.query.phonenumber, code: req.query.code})
    })
    .catch(function (error) {
      console.log('Error:', error)
    })
  } else {
    res.status(400).send({ message: "Wrong phone number or code :(", phonenumber: req.query.phonenumber, data })
  }
})

app.listen(port,() => {
	console.log(`The app has been started on port: ${port}`)
});
