module.exports = async (req, res, next) => {
	try {
		res.locals.errorMessage = req.flash('error');
		res.locals.successMessage = req.flash('success');
		next();
	} catch (err) {
		next(err);
	}
};
