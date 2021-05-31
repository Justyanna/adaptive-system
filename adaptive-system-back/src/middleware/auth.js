import jwt from 'jsonwebtoken'
import Role from '../components/roles/roles.model.js'

const authenticate = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).end('MissingHeaders')
    const SECRET = process.env.TOKEN_SECRET
    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, SECRET, err => {
      if (err) return res.status(401).end('FaultyToken')
      const payload = jwt.decode(token, SECRET)
      req.roles = payload.roles
      req.login = payload.login
      return next()
    })
  } catch (ex) {
    next(ex)
  }
}

const checkUserRole = async (rolesIds, roleName) => {
  let roles = await Role.find({}, { name: 1, _id: 0 })
    .where('_id')
    .in(rolesIds)
    .exec()
  roles = roles.map(e => e.name)
  return roles.includes(roleName)
}

export default { authenticate, checkUserRole }
