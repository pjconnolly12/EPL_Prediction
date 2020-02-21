const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB databse connection established");
})

const userRouter = require('./routes/user');
const picksRouter = require('./routes/picks');
const authRouter = require('./routes/auth');
const teamsRouter = require('./routes/teams');
const forgotRouter = require('./routes/forgotpassword');
const resetRouter = require('./routes/resetpassword');
const updatepasswordRouter = require('./routes/updatepasswordviaemail');

app.use('/user', userRouter);
app.use('/picks', picksRouter);
app.use('/auth', authRouter);
app.use('/teams', teamsRouter);
app.use('/forgotpassword', forgotRouter);
app.use('/reset', resetRouter);
app.use('/updatepassword', updatepasswordRouter)

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});