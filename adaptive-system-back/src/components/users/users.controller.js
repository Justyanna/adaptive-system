import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './users.model.js';

const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.userId);
		res.json(user);
	} catch (error) {
		next(ex);
	}
};

const addUser = async (req, res, next) => {
	try {
		const user = new User(req.body);

		const salt = await bcrypt.getSalt();
		user.password = await bcrypt.hash(user.password, salt);

		const savedUser = await user.save();
		res.json(savedUser);
	} catch (error) {
		next(ex);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.params.userId);

		res.json({ message: 'User deleted' });
	} catch (error) {
		next(ex);
	}
};

const authUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ login: req.body.login });
		if (!user) throw new Error('Incorrect login');

		const checkPassword = await bcrypt.compare(req.body.password, user.password);
		if (!checkPassword) throw new Error('Incorrect password');

		const secret = process.env.TOKEN_SECRET;
		const token = jwt.sign(user.login, secret, { expiresIn: '7 days' });

		res.json({ user, token });
	} catch (ex) {
		next(ex);
	}
};

const verifyUserToken = async (req, res, next) => {
	try {
		const secret = process.env.TOKEN_SECRET;
		const verfied = jwt.verify(req.body.token, secret);

		res.json({ valid: verfied });
	} catch (ex) {
		res.json({ valid: false });
		next(ex);
	}
};

export default { getUser, addUser, deleteUser, authUser, verifyUserToken };
