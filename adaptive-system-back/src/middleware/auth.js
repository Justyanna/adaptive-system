import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
	try {
		if (!req.headers.authorization) res.status(401).end('Not authorized');
		const SECRET = process.env.TOKEN_SECRET;
		const token = req.headers.authorization.split(' ')[1];

		jwt.verify(token, SECRET, (err) => {
			if (err) res.status(401).end('Faulty token');
			const payload = jwt.decode(token, SECRET);
			req.roles = payload.roles;
			return next();
		});
	} catch (ex) {
		next(ex);
	}
};

export default auth;
