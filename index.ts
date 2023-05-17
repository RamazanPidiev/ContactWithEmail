import express from "express";
const nodemailer = require("nodemailer");
const app = express();

app.set('port', 3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
    /* Your main page */
    res.render('index.ejs');
});

app.post('/send', async (req, res) => {
    /* Prepare the email that you wil send yourself. */
    /* Receive the contents of the contact form (req.body) and but it into a string: */
    let text = `<b>Contact form</b>
    <p>From: ${req.body.name}</p>
    <p>Email: ${req.body.email}</p>
    <p>Message: ${req.body.message}</p>`;
    try {
        /* Prepare the SMTP server to send out the emails to you and your user. (ELASTICMAIL) */
        let transporter = nodemailer.createTransport({
            host: "_smptmail_",
            port: "_port_",
            secure: false,
            auth: {
                user: '_your username_',
                pass: '_your password_',
            },
        });

        /* Now the actually sending happens here: */
        /* First, we'll send the contents of the contact form to ourself: */
        await transporter.sendMail({
            from: "_sender adress_", // sender address
            to: "_receiver_", // list of receivers
            subject: "_subject_", // Subject line
            html: text, // The text you prepared above
        });
        /* Now, let's send an comfirmation email to our user: */
        await transporter.sendMail({
            from: "_sender adress (create it on your SMTP server)_", // sender address
            to: req.body.email, // The user put in their own email so that's the receiver.
            subject: "_subject_", // Subject line
            html: `<p>Dear ${req.body.name},</p><p>Thank you for taking the time to contact me.</p><p>I'll get back to you as soon as possible!</p><p>- The Dev</p>`, // the email
        });
    }
    catch (e) {
        /* Log if any errors. */
        console.log(e);
    }
    /* We'll redirect him to he can't refresh this page and keep spamming our mailbox.  */
    res.redirect('/send');
});

app.get('/send', (req, res) => {
    let message: string = "Message has been send succesfully!";
    res.render('index.ejs', { message });
});


app.listen(app.get("port"), () =>
    console.log("http://localhost:" + app.get("port"))
);