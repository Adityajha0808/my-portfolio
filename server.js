const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

const PORT = process.env.PORT || 6060;

// Middleware
app.use(express.static('public'));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
}) 

app.post('/', (req, res) => {
    // console.log(req.body);

    const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
          });

    const mailOptions = {
        from: req.body.email,
        to: process.env.email,
        subject: "Message from " +  req.body.name,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
          // console.log(error);
          res.send('error');
        } else {
          // console.log("Email sent!");
          res.send('success');
        }
    });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});
