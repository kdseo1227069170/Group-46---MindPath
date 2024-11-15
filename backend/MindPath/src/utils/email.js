const nodemailer = require('nodemailer');

// Set up email transporter
const transporter = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
    //service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send 2FA code via email
const send2FAEmail = async (email, code) => {
    const mailOptions = {
		from: 'no-reply@teamcanage.slack.com',
        //from: 'asu-softdev-kevins-mi-aaaaoic7ltrbijvybrroj2wdpa@teamcanage.slack.com',
        to: email,
        subject: 'Your Two-Factor Authentication Code',
        text: `Your 2FA code is: ${code}`
    };

	try {
		await transporter.sendMail(mailOptions);
		console.log(`2FA code sent to ${email}`);
	} catch (error) {
		console.error('Error sending email:', error);
		throw error;
	}
};
	
module.exports = { send2FAEmail };
