const nodeMailer = require("nodemailer");

const sendEmail = async(options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            // from where mail is being sent. instead of HardString, set variable, as hosting address might change
            user: process.env.SMTP_MAIL, // SMPT - Simple Mail Transport Protocol
            pass: process.env.SMTP_PASSWORD, // Password might change, so do not hardcode string
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);

}

module.exports = sendEmail;