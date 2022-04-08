module.exports = async (req, res, next) => {
	try {
		res.locals.errorMessage = req.flash('error');
		res.locals.successMessage = req.flash('success');
		next();
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
