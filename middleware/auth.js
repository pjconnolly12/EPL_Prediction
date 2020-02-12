const jwt = require('jsonwebtoken')
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET

function auth(req, res, next){
	const token = req.header('x-auth-token');

	if(!token) res.status(401).json({ msg: "No token, authorization denied"});

	try {
		const decoded = jwt.verify(token, jwtSecret)

		req.user = decoded;
		next();
	} catch(e) {
		res.status(400).json({ msg: 'Token is not valid'})
	}
}

module.exports = auth;