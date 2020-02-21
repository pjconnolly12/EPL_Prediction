const router = require('express').Router();
let User = require('../models/user_model');

router.route('/reset/:resetPasswordToken?').get((req,res, next) => {
	User.find({resetPasswordToken: req.query.resetPasswordToken})
		.then(user => {
			if(user === null) {
				console.log('password reset link is invalid or has expired');
				res.json('password reset link is invalid or has expired');
			} else {
				const email = user[0].email
				res.status(200).send({
					email: email,
					message: 'password reset link a-ok',
				});
			}
		})
		.catch(err => res.status(400).json(err.response))
})

module.exports = router;