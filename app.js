const express = require("express");
const { ExpressError } = require("./expressError");
const { validateQuery, findMean, findMedian, findMode } = require("./helpers");

const app = express();

app.get("/mean", function (req, res, next) {
	// Get average of all values
	try {
		if (!req.query.nums)
			throw new ExpressError("No list of numbers found!", 404);

		let validArray = validateQuery(req.query.nums);
		let result = findMean(validArray);

		return res.json({
			operation: "mean",
			value: result,
		});
	} catch (err) {
		return next(err);
	}
});

app.get("/median", function (req, res, next) {
	// Get median of all values
	try {
		if (!req.query.nums)
			throw new ExpressError("No list of numbers found!", 404);

		let validArray = validateQuery(req.query.nums);
		let result = findMedian(validArray);

		return res.json({
			operation: "median",
			value: result,
		});
	} catch (err) {
		return next(err);
	}
});

app.get("/mode", function (req, res, next) {
	// Get mode of all values
	try {
		if (!req.query.nums)
			throw new ExpressError("No list of numbers found!", 404);

		let validArray = validateQuery(req.query.nums);
		let result = findMode(validArray);

		return res.json({
			operation: "mode",
			value: result,
		});
	} catch (err) {
		return next(err);
	}
});

// 404 handler.
app.use(function (req, res, next) {
	const notFoundError = new ExpressError("404 Not Found.", 404);
	return next(notFoundError);
});

// generic error handler
app.use(function (err, req, res, next) {
	// default 500
	let status = err.status || 500;
	let message = err.message;

	return res.status(status).json({ error: { message, status } });
});

// app.listen should always be at the bottom of the file
app.listen(3000, function () {
	console.log("App on port 3000");
});
