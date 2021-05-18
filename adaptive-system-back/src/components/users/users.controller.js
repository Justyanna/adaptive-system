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

const getUserByRole = async(req, res, next) => {
    try {
        const role = await Role.findById(req.params.roleId);
        console.log(role);
        const users = await User.find({ role: role });
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getUsers = async(req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
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

        let keys = Object.keys(form);
        keys = keys.sort(() => Math.random() - 0.5);
        let questions = Array();
        keys.forEach((key) => questions.push({ id: key, val: form[key] }));

        user.questionnaire = { active: 0, questions: questions };
        const savedUser = await user.save();

        const SECRET = process.env.TOKEN_SECRET;

        const payload = {
            login: user.login,
            password: user.password,
            roles: user.roles
        };

        const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });

        const resultUsr = {
            _id: user._id,
            email: user.email,
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
        if (!user) res.status(401).end('Wrong login');

        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkPassword) res.status(401).end('Wrong password');

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
            _id: user._id,
            email: user.email,
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
        const updatedUser = await User.findByIdAndUpdate(user._id, user, {
            new: true
        });
        res.json({ message: 'User enrolled for course : ' + courseId.name });
    } catch (error) {
        next(error);
    }
};

const getQuestionnaire = async(req, res, next) => {
    try {
        const isStudent = await auth.checkIsStudent(req.roles);
        if (isStudent) {
            res.status(406).end('Not Acceptable');
        } else {
            const user = await User.findOne({ login: req.login });

            const active = user.questionnaire.active;
            const questions = user.questionnaire.questions;
            const current = questions[active].val;
            res.json({ question: current, id: active });
        }
    } catch (error) {
        next(error);
    }
};

const checkQuestionnaire = async(req, res, next) => {
    try {
        const isStudent = await auth.checkIsStudent(req.roles);
        if (isStudent) {
            return res.status(403).end('User already is student');
        } else {
            var user = await User.findOne({ login: req.login });
            if (user.questionnaire != null) {
                var active = user.questionnaire.active;
                if (active < 30) {
                    user.questionnaire.questions[active].val = req.body.answer;
                    user.questionnaire.active = active + 1;
                    await User.findByIdAndUpdate(user._id, user, { new: true });

                    const questions = user.questionnaire.questions;
                    const current = questions[user.questionnaire.active].val;
                    res.json({ question: current, id: user.questionnaire.active });
                } else {
                    let counterA = 0;
                    let counterB = 0;
                    let counterG = 0;
                    let counterD = 0;
                    const questions = user.questionnaire.questions;
                    for (let i = 0; i < questions.length; i++) {
                        switch (questions[i].id[0]) {
                            case 'a':
                                counterA += questions[i].val === 'true' ? 1 : 0;
                                break;
                            case 'b':
                                counterB += questions[i].val === 'true' ? 1 : 0;
                                break;
                            case 'g':
                                counterG += questions[i].val === 'true' ? 1 : 0;
                                break;
                            case 'd':
                                counterD += questions[i].val === 'true' ? 1 : 0;
                                break;
                        }
                    }

                    let valY = (counterG - counterA) / 10;
                    let valX = (counterD - counterB) / 10;

                    user.xAxis = valX;
                    user.yAxis = valY;
                    user.questionnaire = null;
                    const studentRole = await Role.findOne({ name: 'student' });
                    user.roles.push(studentRole._id);
                    await User.findByIdAndUpdate(user._id, user, { new: true });

                    return res.json({ xaxis: valX, yaxis: valY });
                }
            } else {
                return res.status(403).end('User already is student');
            }
        }
    } catch (error) {
        next(error);
    }
};

const updateToken = async(req, res, next) => {
    try {
        const user = await User.findOne({ login: req.login });
        if (!user) res.status(401).end('Wrong user login');

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
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: roles
        };
        res.json({ user: resultUsr, token });
    } catch (ex) {
        next(ex);
    }
};

const getCourses = async(req, res, next) => {
    try {
        const user = await User.findOne({ login: req.login });
        let courses = await Course.find({}, { name: 1, author: 1, category: 1, _id: 0 })
            .where('_id')
            .in(user.courses)
            .exec();
        res.json({ courses: courses });
    } catch (ex) {
        next(ex);
    }
};

const switchUserRole = async(req, res, next) => {
    try {
        const isAdmin = await auth.checkIsAdmin(req.roles);
        if (isAdmin) {
            const user = await User.findById(req.body.userId);
            const role = await Role.findOne({ name: req.body.role });

            if (user.roles.includes(role._id)) {
                user.roles = user.roles.filter((roleId) => roleId != String(role._id));
            } else {
                user.roles.push(role._id);
            }

            const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });

            const resultUsr = {
                _id: updatedUser._id,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                roles: updatedUser.roles
            };

            return res.json({ user: resultUsr });
        } else {
            res.status(403);
            res.json({ message: 'User is not admin' });
        }
    } catch (ex) {
        next(ex);
    }
};

export default {
    getUser,
    getUsers,
    getCourses,
    getUserByRole,
    addUser,
    deleteUser,
    authUser,
    verifyUserToken,
    enrollUserForCourse,
    getQuestionnaire,
    checkQuestionnaire,
    updateToken,
    switchUserRole
};