import jwt from 'jsonwebtoken';

const auth = (req, next) => {
	try {
		if (!req.headers.authorization) throw new Error('Not authorized');
		const secret = process.env.TOKEN_SECRET;
		const token = req.headers.authorization.split(' ')[1];

		jwt.verify(token, secret, (err) => {
			if (err) throw new Error('Not authorized');
			return next();
		});
	} catch (ex) {
		next(ex);
	}
};

export default { auth };
