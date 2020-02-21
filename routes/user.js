const router = require('express').Router();
let User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('config');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET
const auth = require('../middleware/auth');

router.route('/').get((req,res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const teamName = req.body.teamName;
	const resetPasswordToken = "";
	const resetPasswordExpires = "";

	if (!email || !password || !teamName){
		return res.status(400).json({msg: 'Please complete all fields'})
	}

	User.findOne({ email })
		.then(user => {
			if(user) {
				return res.status(400).json({ msg: 'User already exists'});			
			}
		})
		const newUser = new User({
			email,
			password,
			teamName,
			resetPasswordToken,
			resetPasswordExpires,
		});

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (error, hash) => {
				if(err) throw err;
				newUser.password = hash;		
				newUser.save()
					.then(user => {
						jwt.sign(
							{ id: user.id },
							jwtSecret,
							{ expiresIn: 3600 },
							(err, token) => {
								if(err) throw err;
								res.json({
									token,
									user: {
										id: user.id,
										email: user.email,
										teamName: user.teamName
									}
								})
							}
						)
					})
			})
		})
});

router.route('/:id').delete((req, res) => {
	User.findById(req.params.id)
		.then(() => res.json('User Deleted'))
		.catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;