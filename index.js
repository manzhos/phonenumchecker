const express = require('express')
const app  = express()

const port       = process.env.PORT || 5000
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

// Phone Endpoint
app.get('/phone', (req,res) => {
  if (req.query.phonenumber) {
      // res.status(400).send({message: "I have your phone number :)", phonenumber: req.query.phonenumber})
      client.verify.services(serviceSid).verifications
        .create({ to: `${req.query.phonenumber}`, channel: 'sms' })
        .then(verification => console.log(verification.status))
  } else {
    res.status(400).send({message: "Wrong phone number :(", phonenumber: req.query.phonenumber})
  }
})

// Verify Endpoint
app.get('/verify', (req, res) => {
    if (req.query.phonenumber && req.query.code && (req.query.code).length === 6) {
        client.verify.services(serviceSid).verificationChecks
          .create({ to: `${req.query.phonenumber}`, code: req.query.code })
          .then(verification_check => console.log(verification_check.status));
    } else {
        res.status(400).send({ message: "Wrong phone number or code :(", phonenumber: req.query.phonenumber, data })
    }
})


app.listen(port,() => {
	// createService();
	console.log(`The app has been started on port: ${port}`)
});
