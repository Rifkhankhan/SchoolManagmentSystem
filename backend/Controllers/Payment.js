const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Payment = require("../Models/Payments");


const createPayment = async (req, res, next) => {

    const {userId,rolename,role,money}  = req.body;

	const newPayment = new Payment({
		date:Date.now().toString(),
        from:userId,
        money:money,
        role:role,
        rolename:rolename
	});
	console.log(newPayment);

	try {
		await newPayment.save();
	} catch (err) {
		const error = new HttpError('Creating newPayment failed,try again', 500);
		return next(error);
	}
	res.json({ newPayment: newPayment.toObject({ getters: true }) });
};


const getPayment = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const {id} = req.params;

	let payment;

	try {
		payment = await createPayment.findById(id);
	} catch (err) {
		const error = new HttpError('finding payment failed bt id,try again', 500);
		return next(error);
	}

	if (!payment) {
		res.status(201).json({ message: 'There is no payment ' });
	} else {
		return res.status(201).json(payment.toObject({ getters: true }));
	}
};


exports.createPayment = createPayment;
exports.getPayment = getPayment;


