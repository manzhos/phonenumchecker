const express = require('express')
const app     = express()
const config  = require('config')

const port       = config.get('port') || 5000
const accountSid = config.get('TWILIO_ACCOUNT_SID')
const serviceSid = config.get('TWILIO_SERVICE_SID')
const authToken  = config.get('TWILIO_AUTH_TOKEN')
const client     = require('twilio')(accountSid, authToken)

app.get('/', (req, res)=>{
    res.status(200).send({
        message: "You are on Homepage",
        info: {
			phone: "Send verification code through /phone . It contains two params i.e. phonenumber and channel(sms/call)",
            verify: "Verify the recieved code through /verify . It contains two params i.e. phonenumber and code"
        }
    })
})

// Login Endpoint
app.get('/phone', (req,res) => {
     if (req.query.phonenumber) {
     	console.log('Sending the code to phone with entered number');
        client.verify.services(serviceSid).verifications
					 .create({
						 to: `+${req.query.phonenumber}`,
						 channel: 'sms' // req.query.channel==='call' ? 'call' : 'sms'
					 })
        .then(verification => console.log(verification.status))
     } else {
        res.status(400).send({
            message: "Wrong phone number :(",
            phonenumber: req.query.phonenumber,
        })
     }
})

// Verify Endpoint
app.get('/verify', (req, res) => {
	console.log('Sending the code to phone with entered number', req.query.phonenumber, req.query.code);
    if (req.query.phonenumber && (req.query.code).length === 6) {
		console.log('Sending the code to phone with entered number');
        client.verify.services(serviceSid).verificationChecks
            .create({
                to: `+${req.query.phonenumber}`,
                code: req.query.code
            })
            .then(data => {
                if (data.status === "approved") {
                    res.status(200).send({
                        message: "User is Verified!",
                        data
                    })
                }
            })
    } else {
        res.status(400).send({ message: "Wrong phone number or code :(", phonenumber: req.query.phonenumber, data })
    }
})


app.listen(port,() => {
	// createService();
	console.warn(`The app has been started on port: ${port}\nService: ${serviceSid}`)
});

function createService(){
	console.log('The service is started');
	client.verify.services.create({friendlyName: 'NumChecker'})
	                      .then(service => console.log(service.sid));
}

