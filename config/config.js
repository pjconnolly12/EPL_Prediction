require('dotenv').config();

const config = { 
	jwtSecret: process.env.JWT_SECRET
}

modules.export = config