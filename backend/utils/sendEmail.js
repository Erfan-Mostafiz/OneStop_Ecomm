const nodeMailer = require("nodemailer");

const sendEmail = async(options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            // from where mail is being sent. instead of HardString, set variable, as hosting address might change
            user: process.env.SMPT_MAIL, // SMPT - Simple Mail Transport Protocol
            pass: process.env.SMPT_PASSWORD, // Password might change, so do not hardcode string
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);

}

module.exports = sendEmail;