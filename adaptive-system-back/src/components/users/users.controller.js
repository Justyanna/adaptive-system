import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from './users.model.js'
import Role from '../roles/roles.model.js'
import Course from '../courses/courses.model.js'
import auth from '../../middleware/auth.js'
import form from '../../utils/form.js'

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    return res.send(user)
  } catch (e) {
    res.status(500).end()
  }
}

const getUserByRole = async (req, res, next) => {
  try {
    const role = await Role.findById(req.params.roleId)
    const users = await User.find({ role: role })
    return res.send(users)
  } catch (e) {
    res.status(500).end()
  }
}

const getUsers = async (req, res, next) => {
  try {
    const isAdmin = await auth.checkUserRole(req.roles, 'admin')
    if (!isAdmin) return res.status(403).end('admin')

    let users = await User.find(
      {},
      { _id: 1, courses: 1, roles: 1, email: 1, firstName: 1, lastName: 1 }
    )
    for (let user of users) {
      for (let i = 0; i < user.roles.length; i++) {
        const role = await Role.find({}, { _id: 1, name: 1 })
          .where('_id')
          .in(user.roles[i])
          .exec()
        user.roles[i] = role[0]
      }

      for (let i = 0; i < user.courses.length; i++) {
        const course = await Course.find(
          {},
          { _id: 1, name: 1, author: 1, category: 1 }
        )
          .where('_id')
          .in(user.courses[i])
          .exec()
        user.courses[i] = course[0]
      }
    }

    return res.send(users)
  } catch (e) {
    res.status(500).end()
  }
}

const addUser = async (req, res, next) => {
  try {
    const tempUsr = req.body

    let roles = await Role.find({}, { name: 0, _id: 1 })
      .where('name')
      .in(tempUsr.roles)
      .exec()
    roles = roles.map(e => e._id)
    tempUsr.roles = roles

    const user = new User(tempUsr)
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)

    let keys = Object.keys(form)
    keys = keys.sort(() => Math.random() - 0.5)
    let questions = Array()
    keys.forEach(key => questions.push({ id: key, val: form[key] }))

    user.questionnaire = { active: 0, questions: questions }
    const savedUser = await user.save()

    const SECRET = process.env.TOKEN_SECRET

    const payload = {
      login: user.login,
      password: user.password,
      roles: user.roles
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: '1d' })

    const resultUsr = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: roles
    }
    return res.send({ user: resultUsr, token })
  } catch (e) {
    res.status(500).end()
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const isAdmin = await auth.checkUserRole(req.roles, 'admin')
    if (!isAdmin) return res.status(403).end('admin')
    await User.findByIdAndDelete(req.params.userId)
    res.json({ message: 'User deleted' })
  } catch (e) {
    res.status(500).end()
  }
}

const authUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ login: req.body.login })
    if (!user) return res.status(401).end('login')

    const checkPassword = await bcrypt.compare(req.body.password, user.password)
    if (!checkPassword) return res.status(401).end('password')

    const SECRET = process.env.TOKEN_SECRET

    const payload = {
      login: user.login,
      password: user.password,
      roles: user.roles
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: '1d' })

    let roles = await Role.find({}, { name: 1, _id: 0 })
      .where('_id')
      .in(user.roles)
      .exec()
    roles = roles.map(e => e.name)

    const resultUsr = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: roles
    }

    return res.send({ user: resultUsr, token })
  } catch (e) {
    res.status(500).end()
  }
}

const verifyUserToken = async (req, res, next) => {
  try {
    const SECRET = process.env.TOKEN_SECRET
    const verified = jwt.verify(req.body.token, SECRET)
    return res.send({ valid: verified })
  } catch (e) {
    return res.send({ valid: false })
  }
}

const enrollUserForCourse = async (req, res, next) => {
  try {
    const user = await User.findOne({ login: req.login })
    const courseId = await Course.findOne({ name: req.body.name })
    if (!user.courses.includes(courseId._id)) user.courses.push(courseId._id)
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true
    })
    return res.json({ message: 'User enrolled for course : ' + courseId.name })
  } catch (e) {
    res.status(500).end()
  }
}

const getQuestionnaire = async (req, res, next) => {
  try {
    const isStudent = await auth.checkUserRole(req.roles, 'student')
    if (!isStudent) res.status(403).end('student')

    const user = await User.findOne({ login: req.login })
    const active = user.questionnaire.active
    const questions = user.questionnaire.questions
    const current = questions[active].val
    res.json({ question: current, id: active })
  } catch (e) {
    res.status(500).end()
  }
}

const checkQuestionnaire = async (req, res, next) => {
  try {
    const isStudent = await auth.checkUserRole(req.roles, 'student')
    if (isStudent) return res.status(400).end('User already is student')

    var user = await User.findOne({ login: req.login })
    if (user.questionnaire === null)
      return res.status(400).end('Questionnaire not available')

    var active = user.questionnaire.active
    if (active < 30) {
      user.questionnaire.questions[active].val = req.body.answer
      user.questionnaire.active = active + 1
      await User.findByIdAndUpdate(user._id, user, { new: true })

      const questions = user.questionnaire.questions
      const current = questions[user.questionnaire.active].val
      return res.send({ question: current, id: user.questionnaire.active })
    }

    let counterA = 0
    let counterB = 0
    let counterG = 0
    let counterD = 0
    const questions = user.questionnaire.questions
    for (let i = 0; i < questions.length; i++) {
      switch (questions[i].id[0]) {
        case 'a':
          counterA += questions[i].val === 'true' ? 1 : 0
          break
        case 'b':
          counterB += questions[i].val === 'true' ? 1 : 0
          break
        case 'g':
          counterG += questions[i].val === 'true' ? 1 : 0
          break
        case 'd':
          counterD += questions[i].val === 'true' ? 1 : 0
          break
      }
    }

    let valY = (counterG - counterA) / 10
    let valX = (counterD - counterB) / 10

    user.xAxis = valX
    user.yAxis = valY
    user.questionnaire = null
    const studentRole = await Role.findOne({ name: 'student' })
    user.roles.push(studentRole._id)
    await User.findByIdAndUpdate(user._id, user, { new: true })

    return res.send({ xaxis: valX, yaxis: valY })
  } catch (e) {
    res.status(500).end()
  }
}

const updateToken = async (req, res, next) => {
  try {
    const user = await User.findOne({ login: req.login })
    if (!user) res.status(401).end('login')

    const SECRET = process.env.TOKEN_SECRET

    const payload = {
      login: user.login,
      password: user.password,
      roles: user.roles
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: '1d' })

    let roles = await Role.find({}, { name: 1, _id: 0 })
      .where('_id')
      .in(user.roles)
      .exec()
    roles = roles.map(e => e.name)

    const resultUsr = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: roles
    }
    return res.send({ user: resultUsr, token })
  } catch (e) {
    res.status(500).end()
  }
}

const getCourses = async (req, res, next) => {
  try {
    const user = await User.findOne({ login: req.login })
    let courses = await Course.find({})
      .select({
        name: 1,
        _id: 1,
        category: 1,
        author: 1,
        date: 1
      })
      .where('_id')
      .in(user.courses)
      .exec()

    for (let course of courses) {
      const author = await User.findOne(
        { _id: course.author },
        { _id: 1, firstName: 1, lastName: 1 }
      )
      course.author = author
    }
    return res.send({ courses: courses })
  } catch (e) {
    res.status(500).end()
  }
}

const switchUserRole = async (req, res, next) => {
  try {
    const isAdmin = await auth.checkUserRole(req.roles, 'admin')
    if (!isAdmin) res.status(403).end('admin')

    const user = await User.findById(req.body.userId)
    const role = await Role.findOne({ name: req.body.role })

    if (user.roles.includes(role._id)) {
      user.roles = user.roles.filter(roleId => roleId != String(role._id))
    } else {
      user.roles.push(role._id)
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true
    })

    const resultUsr = {
      _id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      roles: updatedUser.roles
    }

    return res.send({ user: resultUsr })
  } catch (e) {
    res.status(500).end()
  }
}

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ login: req.login })
    console.log(user)
    const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
      new: false
    })
    const resultUsr = {
      _id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      roles: updatedUser.roles
    }
    return res.send(resultUsr)
  } catch (e) {
    res.status(500).end()
  }
}

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
  switchUserRole,
  updateUser
}
