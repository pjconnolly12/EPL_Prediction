const router = require('express').Router();
let User = require('../models/user_model');
const bcrypt = require('bcryptjs');

const BCRYPT_SALT_ROUNDS = 12;

router.route('/updatePasswordViaEmail').put((req,res, next) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	}).then(user => {
		if(user != null) {
			console.log('user exists in db');
			bcrypt
				.hash(req.body.password, BCRYPT_SALT_ROUNDS)
				.then(hashedPassword => {
					user.update({
						password: hashedPassword,
						resetPasswordToken: null,
						resetPasswordExpires: null,
					});
				})
				.then(() => {
					console.log('password updated');
					res.status(200).send({ message: 'password updated' });
				});
		} else {
			console.log('no user exists in db to update');
			res.status(404).json('no user exists in db to update');
		}
	})
})

module.exports = router;