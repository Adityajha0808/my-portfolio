const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

const PORT = process.env.PORT || 5000;

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
                user: 'jhaaditya757@gmail.com',
                pass: 'Adityajha08081999@'
            }
          });

    const mailOptions = {
        from: req.body.email,
        to: 'jhaaditya757@gmail.com',
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