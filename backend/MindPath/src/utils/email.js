const nodemailer = require('nodemailer');

// Set up email transporter
const transporter = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
    //service: 'Gmail', 
    auth: {
		user: 'todorov.g@abv.bg',
        pass: 'MindPath2024'
        //user: 'your_email@gmail.com',
        //pass: 'your_email_password'
    }
});

// Function to send 2FA code via email
const send2FAEmail = async (email, code) => {
    const mailOptions = {
        from: 'your_email@gmail.com',
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
