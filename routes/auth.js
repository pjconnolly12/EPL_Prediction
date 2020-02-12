const router = require('express').Router();
let User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('config');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET
const auth = require('../middleware/auth');



// POST to auth
router.route('/').post((req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password){
		return res.status(400).json({msg: 'Please complete all fields'})
	}

	User.findOne({ email })
		.then(user => {
			if(!user) return res.status(400).json({ msg: 'User does not exist'});			
		
		bcrypt.compare(password, user.password)
			.then(isMatch => {
				if(!isMatch) return res.status(400).json({ msg: 'Invalid Credentials'})
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
		});
})

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then(user => res.json(user));
})


module.exports = router;