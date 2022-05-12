const express = require('express')
const index   = express()

const port       = process.env.PORT || 5000

index.get('/', (req, res)=>{
    res.status(200).send({
        message: "You are on Homepage",
        info: {
			phone: "Send verification code through /phone . It contains two params i.e. phonenumber and channel(sms/call)",
            verify: "Verify the recieved code through /verify . It contains two params i.e. phonenumber and code"
        }
    })
})

index.listen(port,() => {
	// createService();
	console.warn(`The app has been started on port: ${port}`)
});
