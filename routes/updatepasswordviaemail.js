const router = require('express').Router();
let User = require('../models/user_model');
const bcrypt = require('bcryptjs');
let objectID = require('mongodb').ObjectID;

router.route('/updatePasswordViaEmail/:email?').post((req,res, next) => {
	const email = req.query.email
	User.findOne({ email })
	.then(user => {
		if(user != null) {
			const saltRounds = 10
			bcrypt.genSalt(saltRounds, function(err, salt) {
				if (err) {
					throw err
				} else {
					bcrypt.hash(req.body.password, salt, function(err, hash) {
						if (err) {
							throw err
						} else {
					console.log(hash)
					const id = user._id
					console.log(id)
					const item = {
						password: hash,
						// resetPasswordToken: null,
						// resetPasswordExpires: null,						
					}
					User.updateOne({ "_id": objectID(id)}, {$set: item })
						.then(updates => res.json(updates))
						.catch(err => res.status(400).json('Error: ' + err)) 
					}
				})
			}})
			console.log('password updated');
			res.status(200).send({ message: 'password updated' });		
		} else {
			console.log('no user exists in db to update');
			res.status(404).json('no user exists in db to update');
		}
	})
})

module.exports = router;