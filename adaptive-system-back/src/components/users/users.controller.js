import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './users.model.js';
import Role from '../roles/roles.model.js';
import Course from '../courses/courses.model.js';
import auth from '../../middleware/auth.js';
import form from '../../utils/form.js';

const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const addUser = async(req, res, next) => {
    try {
        const tempUsr = req.body;

        let roles = await Role.find({}, { name: 0, _id: 1 }).where('name').in(tempUsr.roles).exec();
        roles = roles.map((e) => e._id);
        tempUsr.roles = roles;

        const user = new User(tempUsr);
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        const savedUser = await user.save();

        const SECRET = process.env.TOKEN_SECRET;

        const payload = {
            login: user.login,
            password: user.password,
            roles: user.roles
        };

        const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });

        const resultUsr = {
            firstName: user.firstName,
            lastName: user.lastName,
            roles: roles
        };
        res.json({ user: resultUsr, token });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async(req, res, next) => {
    try {
        const isAdmin = await auth.checkIsAdmin(req.roles);
        if (isAdmin) {
            await User.findByIdAndDelete(req.params.userId);

            res.json({ message: 'User deleted' });
        } else {
            res.status(403);
            res.json({ message: 'Forbbiden access' });
        }
    } catch (error) {
        next(error);
    }
};

const authUser = async(req, res, next) => {
    try {
        const user = await User.findOne({ login: req.body.login });
        if (!user) throw new Error('Incorrect login');

        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkPassword) throw new Error('Incorrect password');

        const SECRET = process.env.TOKEN_SECRET;

        const payload = {
            login: user.login,
            password: user.password,
            roles: user.roles
        };

        const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });

        let roles = await Role.find({}, { name: 1, _id: 0 }).where('_id').in(user.roles).exec();
        roles = roles.map((e) => e.name);

        const resultUsr = {
            firstName: user.firstName,
            lastName: user.lastName,
            roles: roles
        };

        res.json({ user: resultUsr, token });
    } catch (ex) {
        next(ex);
    }
};

const verifyUserToken = async(req, res, next) => {
    try {
        const SECRET = process.env.TOKEN_SECRET;
        const verfied = jwt.verify(req.body.token, SECRET);

        res.json({ valid: verfied });
    } catch (ex) {
        res.json({ valid: false });
        next(ex);
    }
};

const enrollUserForCourse = async(req, res, next) => {
    try {
        const user = await User.findOne({ login: req.login });
        const courseId = await Course.findOne({ name: req.body.name });
        if (!user.courses.includes(courseId._id)) user.courses.push(courseId._id);
        const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
        res.json({ message: 'User enrolled for course : ' + courseId.name });
    } catch (error) {
        next(error);
    }
};

const getQuestionnaire = async(req, res, next) => {
    try {
        let keys = Object.keys(form);
        keys = keys.sort(() => Math.random());
        let questionnaire = Array();
        keys.forEach((key) => questionnaire.push(form[key]));
        res.json({ keys: keys, questionnaire: questionnaire });
    } catch (error) {
        next(error);
    }
};

const checkQuestionnaire = async(req, res, next) => {
    try {
        const keys = req.body.keys;
        const answers = req.body.answers;
        let counterA = 0;
        let counterB = 0;
        let counterG = 0;
        let counterD = 0;

        for (let i = 0; i < keys.length; i++) {
            switch (keys[i][0]) {
                case 'a':
                    counterA += answers[i] ? 1 : 0;
                    break;
                case 'b':
                    counterB += answers[i] ? 1 : 0;
                    break;
                case 'g':
                    counterG += answers[i] ? 1 : 0;
                    break;
                case 'd':
                    counterD += answers[i] ? 1 : 0;
                    break;
            }
        }

        let valY = (counterG - counterA) / 10;
        let valX = (counterD - counterB) / 10;

        res.json({ xaxis: valX, yaxis: valY });
    } catch (error) {
        next(error);
    }
};

export default {
    getUser,
    addUser,
    deleteUser,
    authUser,
    verifyUserToken,
    enrollUserForCourse,
    getQuestionnaire,
    checkQuestionnaire
};