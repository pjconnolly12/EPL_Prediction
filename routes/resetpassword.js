const router = require('express').Router();
let User = require('../models/user_model');

router.route('/reset').get((req,res, next) => {
	User.findOne({
		where: {
			resetPasswordToken: req.query.resetPasswordToken,
			resetPasswordExpires: {
				$gt: Date.now(),
			},
		},
	}).then(user => {
		if(user === null) {
			console.log('password reset link is invalid or has expired');
			res.json('password reset link is invalid or has expired');
		} else {
			res.status(200).send({
				email: user.email,
				message: 'password reset link a-ok',
			});
		}
	})
})

module.exports = router;