const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var createError = require('http-errors');
const app = express();

// const authRouter = require('./route/auth');
const studentRouter = require('./Routs/student');
const teacherRouter = require('./Routs/teacher');
// const examRouter = require('./Routs/exam');
// const courseRouter = require('./Routs/course');
// const paymentRouter = require('./Routs/payment');


//connect mongodb
mongoose
	.connect(
		'mongodb+srv://Rifkhan:Rifkhan123@cluster0.npeeomq.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('connected to Database');
		app.listen(3000); // start Node + Express server on port 5000
	})
	.catch((error) => {
		console.log(error);
	});

app.use(bodyParser.json()); // to get body ,this should be used before routers
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname+'/'));
// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
	//middleware
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS'
	);
	next();
});

// here route should be mentioned

// app.use('/api/auth', authRouter);
app.use('/api/student', studentRouter);
app.use('/api/teacher', teacherRouter);
// app.use('/api/exam', examRouter);
// app.use('/api/course', courseRouter);
// app.use('/api/payment', paymentRouter);

// for unsupported router error handler
app.use((req, res, next) => {
	const error = new HttpError('could not find this route..');
	throw error;
});

//after using all routes
app.use((error, req, res, next) => {
	if (res.sendHeader) {
		return next(error);
	}
	res
		.status(error.status || 500)
		// .status(error.code || 500)
		.json({ message: error.message || 'An Unknown Error Occurred!' });
});


app.use('/uploads', express.static(path.join('backend/uploads')));

