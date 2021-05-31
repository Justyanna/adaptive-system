import Course from './courses.model.js'
import auth from '../../middleware/auth.js'
import User from '../users/users.model.js'

const getCourses = async (req, res, next) => {
  try {
    let courses = await Course.find({}).select({
      name: 1,
      _id: 1,
      category: 1,
      author: 1,
      date: 1
    })

    for (let course of courses) {
      const user = await User.findOne(
        { _id: course.author },
        { _id: 1, firstName: 1, lastName: 1 }
      )
      course.author = user
    }

    return res.send(courses)
  } catch (ex) {
    next(ex)
  }
}

const getCatgories = async (req, res, next) => {
  try {
    const isTeacher = await auth.checkUserRole(req.roles, 'teacher')
    if (isTeacher) {
      let courses = await Course.find().select({
        category: 1,
        _id: 0
      })

      let unique = Array.from(new Set(courses.map(course => course.category)))

      return res.send(unique)
    } else {
      return res.status(403).end('teacher')
    }
  } catch (ex) {
    next(ex)
  }
}

const getTeacherCourses = async (req, res, next) => {
  try {
    const isTeacher = await auth.checkUserRole(req.roles, 'teacher')
    if (isTeacher) {
      const user = await User.findOne({ login: req.login })
      let courses = await Course.find({ author: user._id }).select({
        name: 1,
        _id: 1,
        category: 1,
        author: 1,
        date: 1
      })

      for (let course of courses) {
        const user = await User.findOne(
          { _id: course.author },
          { _id: 1, firstName: 1, lastName: 1 }
        )
        course.author = user
      }
      return res.send(courses)
    } else {
      return res.status(403).end('teacher')
    }
  } catch (ex) {
    next(ex)
  }
}

const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId)
    return res.send(course)
  } catch (ex) {
    next(ex)
  }
}

const addCourse = async (req, res, next) => {
  try {
    const isTeacher = await auth.checkUserRole(req.roles, 'teacher')
    if (isTeacher) {
      const user = await User.findOne({ login: req.login })
      req.body.date = Date.now()
      req.body.author = user._id
      const newCourse = new Course(req.body)
      const newSavedCourse = await newCourse.save()
      return res.send({ _id: newSavedCourse._id })
    } else {
      return res.status(403).end('teacher')
    }
  } catch (ex) {
    next(ex)
  }
}

const deleteCourse = async (req, res, next) => {
  try {
    const isTeacher = await auth.checkUserRole(req.roles, 'teacher')
    if (isTeacher) {
      await Course.findByIdAndDelete(req.params.courseId)
      return res.send({ message: 'Course deleted successfully' })
    } else {
      res.status(403).end('teacher')
    }
  } catch (ex) {
    next(ex)
  }
}

const updateCourse = async (req, res, next) => {
  try {
    const isAdmin = await auth.checkUserRole(req.roles, 'admin')
    if (isAdmin) {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.courseId,
        req.body,
        { new: true }
      )
      return res.send(updatedCourse)
    } else {
      return res.status(403).end('admin')
    }
  } catch (ex) {
    next(ex)
  }
}

export default {
  getCourses,
  getCourse,
  addCourse,
  deleteCourse,
  updateCourse,
  getTeacherCourses,
  getCatgories
}
