const nodemailer = require('nodemailer');

// Set up email transporter
const transporter = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,    
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send 2FA code via email
const send2FAEmail = async (email, code) => {
    const mailOptions = {
		from: 'no-reply@teamcanage.slack.com',        
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

// Function to send an admin notification on new user registration
const sendAdminNotification = async (userEmail, username) => {
	const mailOptions = {
		from: 'admin@mindpath.com',
		to: 'admin@mindpath.com', // Admin's email address
		subject: 'New User Registration',
		text: `A new user has been registered: ${username} (Email: ${userEmail})`
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log(`Admin has been notified about new user: ${username}`);
	} catch (error) {
		console.error('Could not send the admin notification:', error);
	}
};

module.exports = { send2FAEmail, sendAdminNotification };