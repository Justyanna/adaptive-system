import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './users.model.js';
import Role from '../roles/roles.model.js';

const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.userId);
		res.json(user);
	} catch (error) {
		next(error);
	}
};

const addUser = async (req, res, next) => {
	try {
		const role = await Role.find({ name: req.body.role });
		const tempUsr = req.body;
		tempUsr.role = role[0]._id;
		const user = new User(tempUsr);
		const salt = await bcrypt.genSalt();
		user.password = await bcrypt.hash(user.password, salt);

		const savedUser = await user.save();
		res.json(savedUser);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.params.userId);

		res.json({ message: 'User deleted' });
	} catch (error) {
		next(error);
	}
};

const authUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ login: req.body.login });
		if (!user) throw new Error('Incorrect login');

		const checkPassword = await bcrypt.compare(req.body.password, user.password);
		if (!checkPassword) throw new Error('Incorrect password');

		const SECRET = process.env.TOKEN_SECRET;
		const token = jwt.sign({}, SECRET, { expiresIn: '1d' });

		res.json({ user, token });
	} catch (ex) {
		next(ex);
	}
};

const verifyUserToken = async (req, res, next) => {
	try {
		const SECRET = process.env.TOKEN_SECRET;
		const verfied = jwt.verify(req.body.token, SECRET);

		res.json({ valid: verfied });
	} catch (ex) {
		res.json({ valid: false });
		next(ex);
	}
};

export default { getUser, addUser, deleteUser, authUser, verifyUserToken };
