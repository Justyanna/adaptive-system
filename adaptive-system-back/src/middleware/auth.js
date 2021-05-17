import jwt from 'jsonwebtoken';
import Role from '../components/roles/roles.model.js';

const authenticate = (req, res, next) => {
    try {
        if (!req.headers.authorization) res.status(401).end('Not authorized');
        const SECRET = process.env.TOKEN_SECRET;
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, SECRET, (err) => {
            if (err) res.status(401).end('Faulty token');
            const payload = jwt.decode(token, SECRET);
            req.roles = payload.roles;
            req.login = payload.login;
            return next();
        });
    } catch (ex) {
        next(ex);
    }
};

const checkIsAdmin = async(rolesIds) => {
    let roles = await Role.find({}, { name: 1, _id: 0 }).where('_id').in(rolesIds).exec();
    roles = roles.map((e) => e.name);
    return roles.includes('admin');
};

const checkIsStudent = async(rolesIds) => {
    let roles = await Role.find({}, { name: 1, _id: 0 }).where('_id').in(rolesIds).exec();
    roles = roles.map((e) => e.name);
    return roles.includes('student');
};

export default { authenticate, checkIsAdmin, checkIsStudent };