const router = require('express').Router();
const crypto = require('crypto');
let User = require('../models/user_model');
require('dotenv').config();

const nodemailer = require('nodemailer');

router.route('/forgot').post((req,res) => {
	const email = req.body.email
	if (email === '') {
		return res.status(400).json({msg: "email required"})
	}
	User.findOne({ email })
		.then(user => {
			if(!user) return res.status(400).json({ msg: "Email does not exist"});
			const token = crypto.randomBytes(20).toString('hex');
			user.update({
				resetPasswordToken: token,
				resetPasswordExpires: Date.now() + 360000,
			}) 			


		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: `${process.env.EMAIL_ADDRESS}`,
				pass: `${process.env.EMAIL_PASSWORD}`
			},
		});
		// console.log()
		const mailOptions = {
			from: 'epl.predictions12@gmail.com',
			to: `${user.email}`,
			subject: 'Password Reset Link',
			text:
				'You are receiving this because you requested the rest of the password for your account. \n\n'
				+ 'Please click on the following link, or paste this into your browser to complete the process within one hour of this email. \n\n'
				+ `http://localhost:3000/reset/${token}\n\n`
				+ 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
		}
		console.log('sending email');

		transporter.sendMail(mailOptions, (err, response) => {
			if (err) {
				console.error('there was an error: ', err);
			} else {
				console.log('here is the res: ', response);
				res.status(200).json('recovery email sent')
			}
		})
	})
})

module.exports = router;


